import React from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  ListItem,
  OrderedList,
  Skeleton,
  Stack,
  Tag,
  Text,
  UnorderedList,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CustomLink from "../components/CustomLink";
import { fetchLatestItems } from "../store/slices/latestItemsSlice";
import { fetchTopFiveCollections } from "../store/slices/topCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemModal from "./ItemModal";

const MainPage = () => {
  const dispatch = useDispatch();

  const { latestItems, status: itemsStatus } = useSelector(
    (state) => state.latestItemsReducer
  );
  const { topCollections, status: collectionsStatus } = useSelector(
    (state) => state.topCollectionsReducer
  );

  const [currentItemId, setCurrentItemId] = React.useState("");
  const [currentItemName, setCurrentItemName] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const tagColorMode = useColorModeValue("blackAlpha", "gray");

  const openItemModal = (itemId, itemName) => {
    setCurrentItemId(itemId);
    setCurrentItemName(itemName);
    onOpen();
  };

  React.useEffect(() => {
    dispatch(fetchLatestItems(5));
    dispatch(fetchTopFiveCollections());
  }, [dispatch]);

  let itemsList = null;
  switch (itemsStatus) {
    case "pending":
      itemsList = (
        <Stack>
          {Array.from(new Array(5)).map((_, index) => (
            <Skeleton
              key={index}
              height='30px'
              startColor='gray.300'
              endColor='gray.100'
            />
          ))}
        </Stack>
      );

      break;
    case "succeeded":
      itemsList = latestItems.map((item) => (
        <ListItem key={item._id} mb='4'>
          <Box>
            <Text>{item.name}</Text>
            <HStack>
              <Tag colorScheme={tagColorMode} fontSize={"sm"} py='1'>
                {item.parentCollection.title}
              </Tag>
              <Divider h='5' orientation='vertical' borderColor={"gray.400"} />
              <Text fontWeight={"medium"}>{item.author.name}</Text>
              <Divider h='5' orientation='vertical' borderColor={"gray.400"} />
              <Button
                size={"xs"}
                variant={"outline"}
                colorScheme='blue.400'
                onClick={() => openItemModal(item._id, item.name)}
              >
                View
              </Button>
            </HStack>
          </Box>
        </ListItem>
      ));
      break;
    case "failed":
      itemsList = (
        <Text fontSize='md' color='red'>
          Something went wrong!
        </Text>
      );
  }

  let collectionsList = null;
  switch (collectionsStatus) {
    case "pending":
      {
        Array.from(new Array(5)).map((n) => (
          <Skeleton
            key={n}
            height='30px'
            startColor='gray.300'
            endColor='gray.100'
          />
        ));
      }

      break;
    case "succeeded":
      collectionsList = topCollections.map((collection) => (
        <ListItem key={collection._id} mb='4'>
          <Box>
            <CustomLink to={`/collections/${collection._id}`}>
              {collection.title}
            </CustomLink>{" "}
            - {collection.itemsLength} items
          </Box>
        </ListItem>
      ));
      break;
    case "failed":
      collectionsList = (
        <Text fontSize='md' color='red'>
          Something went wrong!
        </Text>
      );
  }

  return (
    <>
      <VStack spacing={"8"} align='stretch'>
        <Box>
          <Heading as='h2' fontSize='2xl' mb='4'>
            Latest items
          </Heading>
          <UnorderedList>{itemsList}</UnorderedList>
        </Box>

        <Box>
          <Heading as='h2' fontSize='2xl' mb='4'>
            Top 5 collections
          </Heading>
          <OrderedList>{collectionsList}</OrderedList>
        </Box>

        <Box>
          <Heading as='h2' fontSize='2xl' mb='4'>
            Tags cloud
          </Heading>
        </Box>
      </VStack>
      {isOpen && (
        <ItemModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          itemId={currentItemId}
          setItemId={setCurrentItemId}
          itemName={currentItemName}
        />
      )}
    </>
  );
};

export default MainPage;
