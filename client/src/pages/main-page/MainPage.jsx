import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  Link,
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
import React from "react";
import { fetchLatestItems } from "../../store/slices/latestItemsSlice";
import { fetchTopFiveCollections } from "../../store/slices/topCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";

const itemsArray = [
  {
    _id: "649a8318a8a1528106de78c4",
    name: "Orange's collection #1 - item #5",
    tags: ["64900a8476ec36e6e2d2a65e"],
    collectionId: "649a7d58d6e117593b9727ab",
    author: {
      _id: "6495371a63d3f631aa9a7c1d",
      name: "Orange",
      email: "orange@mail.com",
      isAdmin: false,
      isBlocked: false,
      lastSeenAt: "2023-06-23T06:09:30.404Z",
      createdAt: "2023-06-23T06:09:30.410Z",
      updatedAt: "2023-06-27T06:11:38.314Z",
      __v: 2,
    },
    likes: [],
    optionalFields: [],
    createdAt: "2023-06-27T06:35:04.822Z",
    updatedAt: "2023-06-27T07:53:33.576Z",
    __v: 0,
  },
  {
    _id: "649a7d74d6e117593b9727af",
    name: "Bob's collection #1 - item #1",
    tags: ["64900a8476ec36e6e2d2a65e"],
    collectionId: "649a7d58d6e117593b9727ab",
    author: {
      _id: "649a7d30d6e117593b9727a5",
      name: "Bob",
      email: "bob@mail.com",
      isAdmin: false,
      isBlocked: false,
      lastSeenAt: "2023-06-27T06:09:52.799Z",
      createdAt: "2023-06-27T06:09:52.811Z",
      updatedAt: "2023-06-27T06:09:53.026Z",
      __v: 1,
    },
    likes: [],
    optionalFields: [],
    createdAt: "2023-06-27T06:11:00.112Z",
    updatedAt: "2023-06-27T06:11:00.112Z",
    __v: 0,
  },
  {
    _id: "649987958f5a3d340fdb518c",
    name: "Orange's collection #1 - item #4 (edited)",
    collectionId: "64982268c81aa2715fd19947",
    tags: [],
    likes: ["6495371a63d3f631aa9a7c1d"],
    optionalFields: [
      {
        key: "author",
        value: "Leo Tolstoy",
        _id: "649a684d75a2aea2c54109ee",
      },
      {
        key: "Published Year",
        value: "1922",
        _id: "649a684d75a2aea2c54109ef",
      },
    ],
    createdAt: "2023-06-26T12:41:57.064Z",
    updatedAt: "2023-06-27T04:40:45.242Z",
    __v: 5,
  },
  {
    _id: "64998658ab249b177c434338",
    name: "Orange's collection #1 - item #4",
    collectionId: "64982268c81aa2715fd19947",
    tags: ["64900a8476ec36e6e2d2a65e"],
    likes: [],
    optionalFields: [],
    createdAt: "2023-06-26T12:36:40.432Z",
    updatedAt: "2023-06-26T12:36:40.432Z",
    __v: 0,
  },
  {
    _id: "64998632ab249b177c434330",
    name: "Orange's to be deleted collection #1 - item #3",
    collectionId: "64982268c81aa2715fd19947",
    tags: ["64900a8476ec36e6e2d2a65e"],
    likes: [],
    optionalFields: [],
    createdAt: "2023-06-26T12:36:02.717Z",
    updatedAt: "2023-06-26T12:36:02.717Z",
    __v: 0,
  },
];

const MainPage = () => {
  const dispatch = useDispatch();

  const reducers = useSelector((state) => state);
  const { latestItems, status: itemsStatus } = reducers.latestItemsReducer;
  const { topCollections, status: collectionsStatus } =
    reducers.topCollectionsReducer;

  React.useEffect(() => {
    dispatch(fetchLatestItems(5));
    dispatch(fetchTopFiveCollections());
  }, []);

  // Here's the signature
  const tagColorMode = useColorModeValue("blackAlpha", "gray");

  let itemsList = null;
  switch (itemsStatus) {
    case "pending":
      itemsList = (
        <Stack>
          {Array.from(new Array(5)).map((n) => (
            <Skeleton
              key={n}
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
