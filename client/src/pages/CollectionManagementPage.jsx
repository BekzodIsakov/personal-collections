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
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/GoBackButton";
import {
  useCollectionFetch,
  useDeleteCollectionImage,
} from "../hooks/collections";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CollectionEditModal from "../components/CollectionEditModal";
import ItemsTable from "../components/ItemsTable";
import DeleteModal from "../components/DeleteModal";

const CollectionManagementPage = () => {
  const params = useParams();

  const { loading, errorMessage, collection, setCollection, fetchCollection } =
    useCollectionFetch();

  const {
    loading: deletingCollectionImage,
    updatedCollection: collectionWithoutImage,
    deleteCollectionImage,
  } = useDeleteCollectionImage();

  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    fetchCollection(params.id);
  }, []);

  React.useEffect(() => {
    if (collectionWithoutImage) {
      setCollection(collectionWithoutImage);
    }
  }, [collectionWithoutImage]);

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
            <Flex justifyContent={"space-between"}>
              <Heading size='md' as='h1' wordBreak={"break-all"}>
                {collection.title}
              </Heading>
              <Button
                onClick={onOpen}
                ml={2}
                size='sm'
                leftIcon={<EditIcon />}
                colorScheme='blue'
              >
                Edit
              </Button>
            </Flex>

            <Text py='2'>{collection.description}</Text>

            <Box mb={2}>
              Owner:&nbsp;
              <Text fontWeight={"semibold"} as={"b"}>
                {collection.author.name}
              </Text>{" "}
            </Box>

            <Box mb={2}>
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
      {collectionManagementPage}
      <ItemsTable />
      {isOpen && (
        <CollectionEditModal
          isOpen={isOpen}
          onClose={onClose}
          collection={collection}
          setCollection={setCollection}
        />
      )}
    </Box>
  );
};

export default CollectionManagementPage;
