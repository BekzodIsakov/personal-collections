import React from "react";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
} from "@chakra-ui/react";

const FIELD_TYPES = ["number", "text", "textarea", "checkbox", "date"];

const OptionalFieldGenerator = ({
  optionalItemFields,
  setOptionalItemFields,
}) => {
  const [createdFields, setCreatedFields] = React.useState({});
  const [currentFieldName, setCurrentFieldName] = React.useState("");
  const [selectedFieldType, setSelectedFieldType] = React.useState(
    FIELD_TYPES[0]
  );

  function handleOnSelect(e) {
    setSelectedFieldType(e.target.value);
  }

  function createOptionalField() {
    if (createdFields[selectedFieldType] === 3) return;

    const field = {
      name: currentFieldName,
      type: selectedFieldType,
    };

    const _optionalItemFields = [...optionalItemFields, field];
    setOptionalItemFields(_optionalItemFields);
    setCurrentFieldName("");
  }

  function removeField(idx) {
    const _optionalItemFields = [...optionalItemFields];
    _optionalItemFields.splice(idx, 1);
    setOptionalItemFields(_optionalItemFields);
  }

  let optionalFields = null;

  if (optionalItemFields.length) {
    optionalFields = optionalItemFields.map((field, idx) => (
      <Tag key={idx}>
        <TagLabel>
          {field.name} - {field.type}
        </TagLabel>
        <TagCloseButton onClick={() => removeField(idx)} />
      </Tag>
    ));
  }

  React.useEffect(() => {
    const _createdFields = {};
    FIELD_TYPES.map((type) => {
      _createdFields[type] = 0;
    });

    optionalItemFields.forEach((field) => _createdFields[field.type]++);
    setCreatedFields(_createdFields);
  }, [optionalItemFields]);

  return (
    <Box>
      <Heading as='h3' size='md' mb='4'>
        Optional fields
      </Heading>

      <FormControl mb='3'>
        <Select onChange={handleOnSelect} value={selectedFieldType}>
          {FIELD_TYPES.map((type) => (
            <option key={type} disabled={createdFields[type] === 3}>
              {type}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb='3'>
        <Input
          value={currentFieldName}
          onChange={(e) => setCurrentFieldName(e.target.value)}
        />
      </FormControl>

      <Button size={"sm"} onClick={createOptionalField}>
        Add
      </Button>

      <Wrap mt='3'>{optionalFields}</Wrap>
    </Box>
  );
};

export default OptionalFieldGenerator;
