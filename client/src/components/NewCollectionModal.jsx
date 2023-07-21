import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useFetchTopics } from "../hooks/topics";
import { CloseIcon } from "@chakra-ui/icons";
import OptionalFieldGenerator from "./OptionalFieldGenerator";
import { useCreateCollection } from "../hooks/collections";
import { useCurrentUser } from "../providers/currentUserProvider";

const NewCollectionModal = ({
  isOpen,
  onClose,
  onEdit,
  fetchUserCollections,
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState("");
  const [optionalItemFields, setOptionalItemFields] = React.useState([]);
  const [preview, setPreview] = React.useState("");

  const fileInputRef = React.useRef(null);

  const { currentUser } = useCurrentUser();

  const { topics, fetchTopics } = useFetchTopics();

  const { createCollection, loading, collection } = useCreateCollection();

  const dragNDropBg = useColorModeValue("white", "gray.800");
  const dragNDropBorderColor = useColorModeValue("gray.300", "gray.500");

  function handleImageSelect(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(e.target.files[0]);
  }

  function resetSelectedFile() {
    fileInputRef.current.value = "";
    setSelectedImage("");
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("topic", selectedTopic);
    formData.append("author", currentUser._id);
    formData.append("optionalItemFields", JSON.stringify(optionalItemFields));
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    createCollection(formData);
  }

  React.useEffect(() => {
    fetchTopics();
  }, []);

  React.useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  React.useEffect(() => {
    if (topics.length) {
      setSelectedTopic(topics[0]._id);
    }
  }, [topics]);

  React.useEffect(() => {
    if (collection) {
      fetchUserCollections(currentUser._id);
      onClose();
    }
  }, [collection]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent mx='3' pb='3'>
        <ModalHeader>Create new collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleOnSubmit}>
            <Stack spacing='3' mb='7'>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name={"title"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name={"description"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></Textarea>
              </FormControl>

              <FormControl>
                <FormLabel>Topic</FormLabel>
                <Select
                  name='selectedTopic'
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  required
                >
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.title}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl my='4'>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  h={{ base: preview ? "400" : "200", md: "200" }}
                  spacing={3}
                >
                  <Box
                    flex='1'
                    borderColor={dragNDropBorderColor}
                    borderStyle='dashed'
                    borderWidth='2px'
                    rounded='md'
                    shadow='sm'
                    role='group'
                    transition='all 150ms ease-in-out'
                    _hover={{
                      shadow: "lg",
                    }}
                  >
                    <Box position='relative' height='100%' width='100%'>
                      <Box
                        position='absolute'
                        top='0'
                        left='0'
                        height='100%'
                        width='100%'
                        display='flex'
                        flexDirection='column'
                      >
                        <Stack
                          height='100%'
                          width='100%'
                          display='flex'
                          alignItems='center'
                          justify='center'
                          spacing='4'
                          bgColor={dragNDropBg}
                        >
                          <Stack p='4' textAlign='center' spacing='1'>
                            <Heading
                              fontSize='lg'
                              color='gray.700'
                              fontWeight='semibold'
                            >
                              Drop image here
                            </Heading>
                            <Text fontWeight='light'>or click to upload</Text>
                          </Stack>
                        </Stack>
                        <Input
                          name='image'
                          onChange={handleImageSelect}
                          type='file'
                          ref={fileInputRef}
                          height='100%'
                          width='100%'
                          position='absolute'
                          top='0'
                          left='0'
                          opacity='0'
                          aria-hidden='true'
                          accept='image/*'
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    flex={{ base: preview ? "1" : "0", md: "1" }}
                    pos='relative'
                  >
                    <Image
                      src={preview}
                      width={preview ? "100%" : 0}
                      height='100%'
                      objectFit='cover'
                      rounded='md'
                    />
                    {preview && (
                      <IconButton
                        onClick={resetSelectedFile}
                        icon={<CloseIcon />}
                        size='xs'
                        pos='absolute'
                        top='1'
                        right='1'
                      />
                    )}
                  </Box>
                </Stack>
              </FormControl>

              <OptionalFieldGenerator
                optionalItemFields={optionalItemFields}
                setOptionalItemFields={setOptionalItemFields}
              />
            </Stack>
            <Button type='submit' colorScheme='blue' isLoading={loading}>
              Done
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewCollectionModal;
