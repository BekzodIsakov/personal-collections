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
  useDisclosure,
} from "@chakra-ui/react";
import ReactTable from "./ReactTable";
import { useFetchCollectionItems } from "../hooks/collections";
import { useParams } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DeleteModal from "./DeleteModal";
import { useItemDelete } from "../hooks/items";
import ItemEditModal from "./ItemEditModal";

const ItemsTable = () => {
  const [selectedRow, setSelectedRow] = React.useState({});

  const selectedItemId = Object.keys(selectedRow)[0];

  const { loading, errorMessage, collection, setCollection, fetchCollection } =
    useFetchCollectionItems();

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

  const columns = [
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
      //   cell: (info) => {
      //     console.log({ info });
      //     return info.getValue();
      //   },
      // }),
      cell: ({ row }) =>
        row.original.tags.map((tag) => (
          <Badge key={tag} ml='2' colorScheme='blue'>
            {tag}
          </Badge>
        )),
      header: "Tags",
    }),
    // columnHelper.accessor("factor", {
    //   cell: (info) => info.getValue(),
    //   header: "Multiply by",
    //   meta: {
    //     isNumeric: true,
    //   },
    // }),
  ];

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

  function getRowId(row) {
    return row.id;
  }

  React.useEffect(() => {
    fetchCollection(params.id);
  }, []);

  React.useEffect(() => {
    if (itemDeleted) {
      onClose();
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
        item.optionalFields.forEach((field) => {
          optionalFields[field.key] = field.value;
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
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onDelete={() => deleteItem(selectedItemId)}
          deleting={deleting}
        />
      )}

      {isEditModalOpen && (
        <ItemEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} />
      )}
    </Box>
  );
};

export default ItemsTable;
