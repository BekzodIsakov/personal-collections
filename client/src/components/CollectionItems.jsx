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
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useFetchCollectionItems } from "../hooks/collections";
import DeleteModal from "./DeleteModal";
import { useItemDelete } from "../hooks/items";
import ItemEditModal from "./ItemEditModal";
import NewItemModal from "./NewItemModal";

import { useTranslation } from "react-i18next";

const CollectionItems = ({ collectionId }) => {
  const [selectedRow, setSelectedRow] = React.useState({});
  const [columns, setColumns] = React.useState([]);

  const selectedItemId = Object.keys(selectedRow)[0];

  const { t, i18n } = useTranslation();

  const { collection, setCollection, fetchCollection } =
    useFetchCollectionItems();

  const { loading: deleting, itemDeleted, deleteItem } = useItemDelete();

  const [data, setData] = React.useState([]);

  const columnHelper = createColumnHelper();

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
    if (collectionId) {
      fetchCollection(collectionId);
    }
  }, [collectionId]);

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
          header: t("global.name"),
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
          header: t("global.tags"),
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
  }, [collection, i18n.resolvedLanguage]);

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
          {t("global.collectionItems")}
        </Heading>
        <Wrap>
          <Button
            leftIcon={<AddIcon />}
            size='xs'
            colorScheme='blue'
            onClick={onNewItemModalOpen}
          >
            {t("global.newItem")}
          </Button>
          <Button
            leftIcon={<EditIcon />}
            size='xs'
            isDisabled={!selectedItemId}
            colorScheme='blue'
            onClick={onEditModalOpen}
          >
            {t("global.edit")}
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            size='xs'
            isDisabled={!selectedItemId}
            colorScheme='red'
            onClick={onDeleteModalOpen}
          >
            {t("global.delete")}
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
          modalTitle={t("global.deleteItem")}
        />
      )}
    </Box>
  );
};

export default CollectionItems;
