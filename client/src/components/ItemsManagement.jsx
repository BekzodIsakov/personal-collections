import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  HStack,
  Heading,
  Stack,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import ReactTable from "./ReactTable";
import { useFetchCollectionItems } from "../hooks/collections";
import { useParams } from "react-router-dom";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteModal from "./DeleteModal";
import { useItemDelete } from "../hooks/items";
import ItemEditModal from "./ItemEditModal";
import NewItemModal from "./NewItemModal";

const ItemsManagePage = () => {
  const [selectedRow, setSelectedRow] = React.useState({});
  const [columns, setColumns] = React.useState([]);
  console.log({ columns });

  const selectedItemId = Object.keys(selectedRow)[0];

  const { loading, errorMessage, collection, setCollection, fetchCollection } =
    useFetchCollectionItems();

  console.log({ collection });

  const { loading: deleting, itemDeleted, deleteItem } = useItemDelete();

  const [data, setData] = React.useState([]);

  const sampleData = [
    {
      id: 123,
      fromUnit: "inches",
      toUnit: "millimetres (mm)",
      factor: 25.4,
    },
    {
      id: 456,
      fromUnit: "feet",
      toUnit: "centimetres (cm)",
      factor: 30.48,
    },
    {
      id: 789,
      fromUnit: "yards",
      toUnit: "metres (m)",
      factor: 0.91444,
    },
  ];

  const columnHelper = createColumnHelper();

  // const columns = [
  //   columnHelper.display({
  //     id: "select",
  //     cell: ({ row }) => (
  //       <Checkbox
  //         isChecked={row.getIsSelected()}
  //         // isDisabled={selectedRow}
  //         onChange={row.getToggleSelectedHandler()}
  //       />
  //     ),
  //   }),
  //   columnHelper.accessor("fromUnit", {
  //     cell: (info) => info.getValue(),
  //     header: "To convert",
  //   }),
  //   columnHelper.accessor("toUnit", {
  //     cell: (info) => info.getValue(),
  //     header: "Into",
  //   }),
  //   columnHelper.accessor("factor", {
  //     cell: (info) => info.getValue(),
  //     header: "Multiply by",
  //     meta: {
  //       isNumeric: true,
  //     },
  //   }),
  // ];

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

  // React.useEffect(() => {
  //   if (dynamicColumns.length) {
  //     columns.push(...dynamicColumns);
  //   }
  // }, [dynamicColumns]);

  React.useEffect(() => {
    fetchCollection(params.id);
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
        console.log({ parsedOptionalFields });
        parsedOptionalFields.forEach((field) => {
          optionalFields[field.name] = String(field.value);
        });
        console.log({ optionalFields });

        const tags = item.tags.map((tag) => tag.title);

        return {
          id: item._id,
          name: item.name,
          ...optionalFields,
          tags,
        };
      });

      setData(data);

      // columnHelper.accessor("name", {
      //   cell: (info) => info.getValue(),
      //   header: "Name",
      // }),
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
          header: "Name",
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
          header: "Tags",
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
                // title={info.getValue()}
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

      // const columns = [
      //   columnHelper.display({
      //     id: "select",
      //     cell: ({ row }) => (
      //       <Checkbox
      //         isChecked={row.getIsSelected()}
      //         onChange={row.getToggleSelectedHandler()}
      //       />
      //     ),
      //   }),
      //   columnHelper.accessor("name", {
      //     cell: (info) => info.getValue(),
      //     header: "Name",
      //   }),
      //   ..._dynamicColumns,
      //   columnHelper.accessor("tags", {
      //     //   cell: (info) => {
      //     //     console.log({ info });
      //     //     return info.getValue();
      //     //   },
      //     // }),
      //     cell: ({ row }) =>
      //       row.original.tags.map((tag) => (
      //         <Badge key={tag} ml='2' colorScheme='blue'>
      //           {tag}
      //         </Badge>
      //       )),
      //     header: "Tags",
      //   }),
      //   // columnHelper.accessor("factor", {
      //   //   cell: (info) => info.getValue(),
      //   //   header: "Multiply by",
      //   //   meta: {
      //   //     isNumeric: true,
      //   //   },
      //   // }),
      // ];
    }
  }, [collection]);

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
          Collection items
        </Heading>
        <HStack>
          <Button
            leftIcon={<AddIcon />}
            size='xs'
            colorScheme='blue'
            onClick={onNewItemModalOpen}
          >
            New item
          </Button>
          <Button
            leftIcon={<EditIcon />}
            size='xs'
            isDisabled={!selectedItemId}
            colorScheme='blue'
            onClick={onEditModalOpen}
          >
            Edit
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            size='xs'
            isDisabled={!selectedItemId}
            colorScheme='red'
            onClick={onDeleteModalOpen}
          >
            Delete
          </Button>
        </HStack>
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
        <ItemEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onDelete={() => deleteItem(selectedItemId)}
          deleting={deleting}
        />
      )}
    </Box>
  );
};

export default ItemsManagePage;
