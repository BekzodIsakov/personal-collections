import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Heading,
  Stack,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import ReactTable from "./ReactTable";
import { useParams } from "react-router-dom";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useFetchCollectionItems } from "../hooks/collections";
import DeleteModal from "./DeleteModal";
import { useItemDelete } from "../hooks/items";
import ItemEditModal from "./ItemEditModal";
import NewItemModal from "./NewItemModal";
import { useI18n } from "../providers/i18nProvider";
import translations from "../utils/translations";

const ItemsManagePage = () => {
  const [selectedRow, setSelectedRow] = React.useState({});
  const [columns, setColumns] = React.useState([]);

  const selectedItemId = Object.keys(selectedRow)[0];

  const { selectedLanguage } = useI18n();

  const { collection, setCollection, fetchCollection } =
    useFetchCollectionItems();

  const { loading: deleting, itemDeleted, deleteItem } = useItemDelete();

  const [data, setData] = React.useState([]);

  const columnHelper = createColumnHelper();

  const params = useParams();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isNewItemModalOpen,
    onOpen: onNewItemModalOpen,
    onClose: onNewItemModalClose,
  } = useDisclosure();

  function getRowId(row) {
    return row.id;
  }

  React.useEffect(() => {
    fetchCollection(params.collectionId);
  }, []);

  React.useEffect(() => {
    if (itemDeleted) {
      onDeleteModalClose();
      const updatedCollection = {
        ...collection,
      };
      updatedCollection.items = collection.items.filter(
        (item) => item._id !== selectedItemId
      );
      setCollection(updatedCollection);
      setSelectedRow({});
    }
  }, [itemDeleted]);

  React.useEffect(() => {
    if (collection) {
      const data = collection.items.map((item) => {
        const optionalFields = {};
        const parsedOptionalFields = JSON.parse(item.optionalFields);
        parsedOptionalFields.forEach((field) => {
          optionalFields[field.name] = String(field.value);
        });

        const tags = item.tags.map((tag) => tag.title);

        return {
          id: item._id,
          name: item.name,
          ...optionalFields,
          tags,
        };
      });

      setData(data);

      const _columns = [
        columnHelper.display({
          id: "select",
          cell: ({ row }) => (
            <Checkbox
              isChecked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          ),
        }),
        columnHelper.accessor("name", {
          cell: (info) => info.getValue(),
          header: translations[selectedLanguage]?.general.name,
        }),
        columnHelper.accessor("tags", {
          cell: ({ row }) => (
            <Wrap w='200px'>
              {row.original.tags.map((tag) => (
                <WrapItem key={tag}>
                  <Badge colorScheme='blue'>{tag}</Badge>
                </WrapItem>
              ))}
            </Wrap>
          ),
          header: translations[selectedLanguage]?.general.tags,
        }),
      ];

      if (
        collection?.optionalItemFields &&
        collection.optionalItemFields.length
      ) {
        const parsedOptionalItemFields = JSON.parse(
          collection.optionalItemFields
        );

        const dynamicColumns = parsedOptionalItemFields.map((field) =>
          columnHelper.accessor(field.name, {
            cell: (info) => (
              <div
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {info.getValue()}
              </div>
            ),
            header: field.name,
          })
        );

        _columns.splice(2, 0, ...dynamicColumns);
      }
      setColumns(_columns);
    }
  }, [collection, selectedLanguage]);

  return (
    <Box mt='5'>
      <Stack
        spacing='1'
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={{ base: "flex-start", md: "center" }}
        mb={3}
      >
        <Heading fontSize={"lg"} my='3'>
          {translations[selectedLanguage]?.general.collectionItems}
        </Heading>
        <Wrap>
          <Button
            leftIcon={<AddIcon />}
            size='xs'
            colorScheme='blue'
            onClick={onNewItemModalOpen}
          >
            {translations[selectedLanguage]?.general.newItem}
          </Button>
          <Button
            leftIcon={<EditIcon />}
            size='xs'
            isDisabled={!selectedItemId}
            colorScheme='blue'
            onClick={onEditModalOpen}
          >
            {translations[selectedLanguage]?.general.edit}
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            size='xs'
            isDisabled={!selectedItemId}
            colorScheme='red'
            onClick={onDeleteModalOpen}
          >
            {translations[selectedLanguage]?.general.delete}
          </Button>
        </Wrap>
      </Stack>
      <ReactTable
        columns={columns}
        data={data}
        onRowSelect={setSelectedRow}
        selectedRow={selectedRow}
        getRowId={getRowId}
      />

      {isNewItemModalOpen && (
        <NewItemModal
          isOpen={isNewItemModalOpen}
          onClose={onNewItemModalClose}
          optionalItemFields={
            collection?.optionalItemFields &&
            JSON.parse(collection.optionalItemFields)
          }
          collection={collection}
          setCollection={setCollection}
        />
      )}
      {isEditModalOpen && (
        <ItemEditModal
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          optionalItemFields={
            collection?.optionalItemFields &&
            JSON.parse(collection.optionalItemFields)
          }
          collection={collection}
          setCollection={setCollection}
          selectedItemId={selectedItemId}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onDelete={() => deleteItem(selectedItemId)}
          deleting={deleting}
          modalTitle={translations[selectedLanguage]?.general.deleteItem}
        />
      )}
    </Box>
  );
};

export default ItemsManagePage;
