import React from "react";
import {
  Box,
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
} from "@chakra-ui/react";
import CustomLink from "../../components/CustomLink";
import { fetchLatestItems } from "../../store/slices/latestItemsSlice";
import { fetchTopFiveCollections } from "../../store/slices/topCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch();

  const { latestItems, status: itemsStatus } = useSelector(
    (state) => state.latestItemsReducer
  );
  const { topCollections, status: collectionsStatus } = useSelector(
    (state) => state.topCollectionsReducer
  );

  const tagColorMode = useColorModeValue("blackAlpha", "gray");

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
            <CustomLink to={`/items/${item._id}`}>{item.name}</CustomLink>
            <HStack>
              <Tag colorScheme={tagColorMode} fontSize={"sm"} py='1'>
                {item.parentCollection.title}
              </Tag>
              <Divider h='5' orientation='vertical' borderColor={"gray.400"} />
              <Text fontWeight={"medium"}>{item.author.name}</Text>
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
  );
};

export default MainPage;
