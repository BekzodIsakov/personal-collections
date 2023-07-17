import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import GoBackButton from "../components/GoBackButton";
import {
  useCollectionFetch,
  useDeleteCollection,
  useDeleteCollectionImage,
} from "../hooks/collections";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CollectionEditModal from "../components/CollectionEditModal";
import ItemsManagement from "../components/ItemsManagement";
import DeleteModal from "../components/DeleteModal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CollectionManagementPage = () => {
  const params = useParams();

  const navigate = useNavigate();

  const { loading, errorMessage, collection, setCollection, fetchCollection } =
    useCollectionFetch();

  const {
    loading: isDeleting,
    deleteCollection,
    isDeleted,
  } = useDeleteCollection();

  const {
    loading: deletingCollectionImage,
    updatedCollection: collectionWithoutImage,
    deleteCollectionImage,
  } = useDeleteCollectionImage();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  React.useEffect(() => {
    fetchCollection(params.id);
  }, []);

  React.useEffect(() => {
    if (collectionWithoutImage) {
      setCollection(collectionWithoutImage);
    }
  }, [collectionWithoutImage]);

  React.useEffect(() => {
    if (isDeleted) {
      onDeleteModalClose();
      navigate(-1);
    }
  }, [isDeleted]);

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
        <Box pos={"relative"}>
          {collection?.image && (
            <>
              <Image
                objectFit='cover'
                maxW={{ base: "100%", sm: "200px" }}
                width={"100%"}
                height={"100%"}
                src={collection?.image?.location}
                alt={collection?.image?.originalname.split(".")[0]}
              />
              <Box pos='absolute' top={1} right={1}>
                <Popover>
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <IconButton
                          size={"xs"}
                          aria-label='Search database'
                          bgColor={"rgba(0, 0, 0, 0.4)"}
                          icon={<DeleteIcon color={"red.400"} />}
                          _hover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                          title='Delete image'
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Delete collection image</PopoverHeader>
                        <PopoverBody>
                          <Text mb={"2"}>Are you sure?</Text>
                          <HStack>
                            <Button
                              size='xs'
                              colorScheme={"red"}
                              isLoading={deletingCollectionImage}
                              onClick={() => deleteCollectionImage(params.id)}
                            >
                              Yes
                            </Button>
                            <Button size='xs' onClick={onClose}>
                              Cancel
                            </Button>
                          </HStack>
                        </PopoverBody>
                      </PopoverContent>
                    </>
                  )}
                </Popover>
              </Box>
            </>
          )}
        </Box>

        <Stack flexGrow={1}>
          <CardBody>
            <Box mb={2}>
              Name:&nbsp;
              <Text fontWeight={"semibold"} display='inline-block'>
                {collection.title}
              </Text>{" "}
            </Box>
            <Flex mb={2}>
              Description:&nbsp;
              <Text fontWeight={"semibold"} display='inline-block' ml='3'>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {collection.description}
                </ReactMarkdown>
              </Text>
            </Flex>
            <Box mb={2}>
              Owner:&nbsp;
              <Text fontWeight={"semibold"} as={"b"}>
                {collection.author.name}
              </Text>{" "}
            </Box>
            <Box mb='2'>
              Topic:&nbsp;
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
      {collection && (
        <Stack
          justifyContent='space-between'
          mb='2'
          direction={{ base: "column", sm: "row" }}
        >
          <Heading as='h1' size='lg' wordBreak='break-all'>
            {collection.title}
          </Heading>
          <Wrap spacing='2'>
            <Button
              onClick={onEditModalOpen}
              size='xs'
              leftIcon={<EditIcon />}
              colorScheme='blue'
            >
              Edit
            </Button>
            <Button
              onClick={onDeleteModalOpen}
              size='xs'
              leftIcon={<DeleteIcon />}
              colorScheme='red'
            >
              Delete
            </Button>
          </Wrap>
        </Stack>
      )}
      <Box mb='10'>{collectionManagementPage}</Box>
      <ItemsManagement />
      {isEditModalOpen && (
        <CollectionEditModal
          isOpen={isEditModalOpen}
          onClose={onEditModalClose}
          collection={collection}
          setCollection={setCollection}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onDelete={() => deleteCollection(params.id)}
          deletedItemName={"collection"}
          loading={isDeleting}
        />
      )}
    </Box>
  );
};

export default CollectionManagementPage;
