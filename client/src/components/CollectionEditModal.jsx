import React from "react";
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
import { useParams } from "react-router-dom";
import { useFetchTopics } from "../hooks/topics";
import { CloseIcon } from "@chakra-ui/icons";
import { useCollectionEdit } from "../hooks/collections";
import translations from "../utils/translations";
import { useI18n } from "../providers/i18nProvider";

const EditCollectionModal = ({
  isOpen,
  onClose,
  collection,
  setCollection,
}) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const fileInputRef = React.useRef(null);

  const { selectedLanguage } = useI18n();

  const { topics, fetchTopics } = useFetchTopics();

  const params = useParams();

  const {
    updatedCollection,
    updateCollection,
    loading: updatingCollection,
  } = useCollectionEdit();

  const dragNDropBg = useColorModeValue("white", "gray.800");
  const dragNDropBorderColor = useColorModeValue("gray.300", "gray.500");

  function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("topic", selectedTopic);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    updateCollection(params.collectionId, formData);
  }

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
    if (collection) {
      setTitle(collection.title);
      setDescription(collection.description);
      setSelectedTopic(collection.topic._id);
    }
  }, [collection]);

  React.useEffect(() => {
    if (updatedCollection) {
      setCollection(updatedCollection);
      onClose();
      setPreview("");
    }
  }, [updatedCollection]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent mx='3' pb='3'>
        <ModalHeader>
          {translations[selectedLanguage]?.general.editCollection}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleOnSubmit}>
            <Stack spacing='3' mb='7'>
              <FormControl>
                <FormLabel>
                  {translations[selectedLanguage]?.general.name}
                </FormLabel>
                <Input
                  name={"title"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>
                  {translations[selectedLanguage]?.general.description}
                </FormLabel>
                <Textarea
                  name={"description"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Textarea>
              </FormControl>

              <FormControl>
                <FormLabel>
                  {translations[selectedLanguage]?.general.topic}
                </FormLabel>
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
              </FormControl>

              <FormControl mt={4}>
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
                              {
                                translations[selectedLanguage]?.general
                                  .dropImageHere
                              }
                            </Heading>
                            <Text fontWeight='light'>
                              {translations[selectedLanguage]?.general.orClick}
                            </Text>
                          </Stack>
                        </Stack>
                        <Input
                          name='image'
                          onChange={handleImageSelect}
                          ref={fileInputRef}
                          type='file'
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
                  <Box flex={{ base: preview ? "1" : "0", md: "1" }}>
                    <Image
                      src={preview}
                      width={preview ? "100%" : 0}
                      height={"100%"}
                      objectFit={"cover"}
                      rounded={"md"}
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
            </Stack>
            <Button
              type='submit'
              colorScheme='blue'
              isLoading={updatingCollection}
            >
              {translations[selectedLanguage]?.general.done}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCollectionModal;
