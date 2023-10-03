import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select as ReactSelect } from "chakra-react-select";
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

import { useFetchAllTags } from "@/hooks/tags";
import { useEditItem, useFetchItem } from "@/hooks/items";

const ItemEditModal = ({
  isOpen,
  onClose,
  optionalItemFields,
  collection,
  setCollection,
  selectedItemId,
}) => {
  const [name, setName] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [optionalFields, setOptionalFields] = React.useState(null);
  const [options, setOptions] = React.useState([]);

  const { t } = useTranslation();

  const { tags, fetchTags } = useFetchAllTags();

  const { loading, item: editedItem, editItem } = useEditItem();

  const { item, fetchItem } = useFetchItem();

  const params = useParams();

  function handleOnSubmit(e) {
    e.preventDefault();

    editItem(selectedItemId, {
      name,
      parentCollection: params.id,
      tags: selectedTags.map((tag) => tag.value),
      optionalFields: JSON.stringify(Object.values(optionalFields)),
    });
  }

  function handleOptionalFields(field) {
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
    if (item) {
      setName(item.name);
      const _selectedTags = item.tags.map((tag) => {
        for (let i = 0; i < tags.length; i++) {
          if (tags[i]._id == tag) {
            return {
              label: tags[i].title,
              value: tags[i]._id,
            };
          }
        }
      });
      setSelectedTags(_selectedTags);

      const parsedOptionalFields = item.optionalFields
        ? JSON.parse(item.optionalFields)
        : [];
      const _optionalFields = {};
      parsedOptionalFields.forEach(({ name, type, value }) => {
        _optionalFields[name] = {
          name,
          type,
          value,
        };
      });
      setOptionalFields(_optionalFields);
    }
  }, [item]);

  React.useEffect(() => {
    const _options = tags.map((tag) => ({
      label: tag.title,
      value: tag._id,
    }));
    setOptions(_options);
  }, [tags]);

  React.useEffect(() => {
    fetchItem(selectedItemId);
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
  }, [optionalItemFields]);

  React.useEffect(() => {
    if (editedItem) {
      const _collection = { ...collection };
      _collection.items = collection.items.map((item) => {
        if (editedItem._id === item._id) {
          return editedItem;
        }
        return item;
      });
      setCollection(_collection);
      onClose();
    }
  }, [editedItem]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent mx='3' pb='3'>
        <ModalHeader>{t("global.editItem")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleOnSubmit}>
            <VStack spacing='3' mb='7'>
              <FormControl>
                <FormLabel>{t("global.name")}</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              {optionalFieldsElements}
              <FormControl>
                <FormLabel>{t("global.tags")}</FormLabel>
                <ReactSelect
                  isMulti
                  value={selectedTags}
                  onChange={setSelectedTags}
                  name='tags'
                  options={options}
                  closeMenuOnSelect={false}
                />
              </FormControl>
            </VStack>
            <Button type='submit' colorScheme='blue' isLoading={loading}>
              {t("global.edit")}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemEditModal;
