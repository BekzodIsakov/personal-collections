import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useFetchAllTags } from "../hooks/tags";
import { useParams } from "react-router-dom";
import { Select as ReactSelect } from "chakra-react-select";
import { useCreateItem } from "../hooks/items";

const NewItemModal = ({
  isOpen,
  onClose,
  onEdit,
  optionalItemFields,
  collection,
  setCollection,
}) => {
  const [name, setName] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [optionalFields, setOptionalFields] = React.useState(null);
  console.log(optionalFields);
  // console.log(optionalItemFields);

  const [options, setOptions] = React.useState([]);

  const { tags, fetchTags } = useFetchAllTags();

  const { loading, errorMessage, createdItem, setCreatedItem, createItem } =
    useCreateItem();

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log({
      name,
      tags: selectedTags.map((tag) => tag.value),
      optionalFields: Object.values(optionalFields),
      parentCollection: params.id,
    });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("parentCollection", params.id);
    formData.append(
      "tags",
      selectedTags.map((tag) => tag.value)
    );
    formData.append(
      "optionalFields",
      JSON.stringify(Object.values(optionalFields))
    );

    // createItem(formData);

    createItem({
      name,
      parentCollection: params.id,
      tags: selectedTags.map((tag) => tag.value),
      optionalFields: JSON.stringify(Object.values(optionalFields)),
    });
  }

  const params = useParams();

  function handleOptionalFields(field) {
    console.log({ field });
    setOptionalFields((prev) => ({
      ...prev,
      [field.name]: { name: field.name, type: field.type, value: field.value },
    }));
  }

  const optionalFieldsElements = [];
  if (optionalFields) {
    optionalItemFields.forEach((field) => {
      switch (field.type) {
        case "textarea":
          optionalFieldsElements.push(
            <FormControl key={field.name}>
              <FormLabel textTransform={"capitalize"}>{field.name}</FormLabel>
              <Textarea
                value={optionalFields?.[field.name].value}
                onChange={(e) => {
                  handleOptionalFields({
                    name: field.name,
                    type: field.type,
                    value: e.target.value,
                  });
                }}
              ></Textarea>
            </FormControl>
          );
          break;
        case "checkbox":
          optionalFieldsElements.push(
            <FormControl key={field.name}>
              <FormLabel textTransform={"capitalize"}>{field.name}</FormLabel>
              <Checkbox
                value={optionalFields?.[field.name].value}
                onChange={(e) => {
                  handleOptionalFields({
                    name: field.name,
                    type: field.type,
                    value: e.target.checked,
                  });
                }}
              ></Checkbox>
            </FormControl>
          );
          break;
        default:
          optionalFieldsElements.push(
            <FormControl key={field.name}>
              <FormLabel textTransform={"capitalize"}>{field.name}</FormLabel>
              <Input
                type={field.type}
                value={optionalFields?.[field.name].value}
                onChange={(e) => {
                  handleOptionalFields({
                    name: field.name,
                    type: field.type,
                    value: e.target.value,
                  });
                }}
              />
            </FormControl>
          );
      }
    });
  }

  React.useEffect(() => {
    // if (tags.length) setSelectedTags(tags[0]._id);
    const _options = tags.map((tag) => ({
      label: tag.title,
      value: tag._id,
    }));
    setOptions(_options);
  }, [tags]);

  React.useEffect(() => {
    fetchTags();
  }, []);

  React.useEffect(() => {
    if (optionalItemFields) {
      const _optionalFields = {};
      optionalItemFields.forEach((field) => {
        switch (field.type) {
          case "checkbox":
            _optionalFields[field.name] = {
              name: field.name,
              type: field.type,
              value: false,
            };
            break;
          default:
            _optionalFields[field.name] = {
              name: field.name,
              type: field.type,
              value: "",
            };
        }
      });
      setOptionalFields(_optionalFields);
    }

    // optionalItemFields.forEach((field) => {
    //   switch (field.type) {
    //     case "textarea":
    //       optionalFieldsElements.push(
    //         <FormControl key={field.name}>
    //           <FormLabel>{field.name}</FormLabel>
    //           <Textarea
    //             onChange={(e) => {
    //               handleOptionalFields({
    //                 name: field.name,
    //                 value: e.target.value,
    //               });
    //             }}
    //           >
    //             {optionalFields?.[field.name]}
    //           </Textarea>
    //         </FormControl>
    //       );
    //       break;
    //     case "checkbox":
    //       optionalFieldsElements.push(
    //         <>
    //           {/* <FormControl key={field.name}> */}
    //           {/* <FormLabel>{field.name}</FormLabel> */}
    //           <Checkbox
    //             key={Math.random}
    //             isChecked={optionalFields?.[field.name]}
    //             onChange={(e) => {
    //               handleOptionalFields({
    //                 name: field.name,
    //                 value: !e.target.checked,
    //               });
    //             }}
    //           >
    //             Checkbox
    //           </Checkbox>
    //           {/* </FormControl> */}
    //         </>
    //       );
    //       break;
    //     default:
    //       optionalFieldsElements.push(
    //         <FormControl key={field.name}>
    //           <FormLabel>{field.name}</FormLabel>
    //           <Input
    //             type={field.type}
    //             value={optionalFields?.[field.name]}
    //             onChange={(e) => {
    //               handleOptionalFields({
    //                 name: field.name,
    //                 value: e.target.value,
    //               });
    //             }}
    //           />
    //         </FormControl>
    //       );
    //   }
    // });
  }, [optionalItemFields]);

  React.useEffect(() => {
    if (createdItem) {
      const _collection = { ...collection };
      _collection.items.push(createdItem);
      console.log({ collection: { ..._collection } });
      setCollection(_collection);
      onClose();
    }
  }, [createdItem]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent mx='3' pb='3'>
        <ModalHeader>Create item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleOnSubmit}>
            <VStack spacing='3' mb='7'>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              {optionalFieldsElements}
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <ReactSelect
                  isMulti
                  value={selectedTags}
                  onChange={setSelectedTags}
                  name='tags'
                  options={options}
                  closeMenuOnSelect={false}
                  // onChange={(e) => console.log(e.target.value)}
                />
              </FormControl>
            </VStack>
            <Button type='submit' colorScheme='blue' isLoading={loading}>
              Create
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewItemModal;
