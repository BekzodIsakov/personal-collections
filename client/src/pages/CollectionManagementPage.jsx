import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spacer,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/GoBackButton";
import { useCollectionEdit, useCollectionFetch } from "../hooks/collections";
import { useFetchTopics } from "../hooks/topics";

const CollectionManagementPage = () => {
  const formRef = useRef(null);

  const params = useParams();

  const { loading, errorMessage, collection, setCollection, fetchCollection } =
    useCollectionFetch();

  const {
    updatedCollection,
    updateCollection,
    loading: updatingCollection,
  } = useCollectionEdit();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { topics, fetchTopics } = useFetchTopics();

  const dragNDropBg = useColorModeValue("white", "gray.800");
  const dragNDropBorderColor = useColorModeValue("gray.300", "gray.500");

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState("");
  const [preview, setPreview] = React.useState("");

  function handleImageSelect(e) {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedImage(e.target.files[0]);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("topic", selectedTopic);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    updateCollection(params.id, formData);
  }

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  useEffect(() => {
    fetchCollection(params.id);
    fetchTopics();
  }, []);

  useEffect(() => {
    if (collection) {
      setTitle(collection.title);
      setDescription(collection.description);
      setSelectedTopic(collection.topic._id);
    }
  }, [collection]);

  useEffect(() => {
    if (updatedCollection) {
      setCollection(updatedCollection);
      onClose();
    }
  }, [updatedCollection]);

  let collectionManagementPage = null;

  if (loading) {
    collectionManagementPage = (
      <Box>
        <Spinner color='blue.400' />
      </Box>
    );
  } else if (collection) {
    collectionManagementPage = (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: "100%", sm: "200px" }}
          src={collection?.image?.location}
          alt={collection?.image?.originalname.split(".")[0]}
        />

        <Stack flexGrow={1}>
          <CardBody>
            <Flex justifyContent={"space-between"}>
              <Heading size='md' as='h1' wordBreak={"break-all"}>
                {collection.title}
              </Heading>
              <Button onClick={onOpen} ml={2} size='sm'>
                Edit
              </Button>
            </Flex>

            <Text py='2'>{collection.description}</Text>

            <Box mb={2}>
              <Text fontWeight={"semibold"} as={"b"}>
                Author:
              </Text>{" "}
              {collection.author.name}
            </Box>

            <Box mb={2}>
              <Text fontWeight={"semibold"} as={"b"}>
                Topic:
              </Text>{" "}
              <Badge rounded={"sm"} fontWeight={"semibold"} colorScheme='blue'>
                {collection.topic.title}
              </Badge>
            </Box>
          </CardBody>
        </Stack>
      </Card>
    );
  } else if (errorMessage) {
    collectionManagementPage = <Text color='orange'>{errorMessage}</Text>;
  }

  return (
    <Box>
      <GoBackButton />
      {collectionManagementPage}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
          <ModalOverlay />
          <ModalContent mx={3} pb={3}>
            <ModalHeader>Edit collection</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleOnSubmit} ref={formRef}>
                <Stack spacing={3} mb={7}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name={"title"}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      name={"description"}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Topic</FormLabel>
                    <Select
                      name='selectedTopic'
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                    >
                      {topics.map((topic) => (
                        <option key={topic._id} value={topic._id}>
                          {topic.title}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage></FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4}>
                    <Stack
                      direction={{ base: "column", md: "row" }}
                      // align={"stretch"}
                      // justifyContent={"stretch"}
                      h={{ base: preview ? "400" : "200", md: "200" }}
                      spacing={3}
                    >
                      <Box
                        flex={"1"}
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
                                <Text fontWeight='light'>
                                  or click to upload
                                </Text>
                              </Stack>
                            </Stack>
                            <Input
                              name='image'
                              onChange={handleImageSelect}
                              type='file'
                              height='100%'
                              width='100%'
                              position='absolute'
                              top='0'
                              left='0'
                              opacity='0'
                              aria-hidden='true'
                              accept='image/*'
                              // onDragEnter={}
                              // onDragLeave={}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Box flex={{ base: preview ? "1" : "0", md: "1" }}>
                        <Image
                          src={preview}
                          width={preview ? "100%" : 0}
                          height={"100%"}
                          objectFit={"cover"}
                          rounded={"md"}
                        />
                      </Box>
                    </Stack>
                  </FormControl>
                </Stack>
                <Button
                  type='submit'
                  colorScheme='blue'
                  isLoading={updatingCollection}
                >
                  Done
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default CollectionManagementPage;
