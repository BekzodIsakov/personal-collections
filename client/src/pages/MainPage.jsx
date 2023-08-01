import React from "react";
import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  Skeleton,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import CustomLink from "../components/CustomLink";
import { fetchLatestItems } from "../store/slices/latestItemsSlice";
import { fetchTopFiveCollections } from "../store/slices/topCollectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import TagsCloud from "../components/TagsCloud";
import CustomList from "../components/CustomList";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const {
    latestItems,
    status: itemsStatus,
    error,
  } = useSelector((state) => state.latestItemsReducer);

  const { topCollections, status: collectionsStatus } = useSelector(
    (state) => state.topCollectionsReducer
  );


  let collectionsList = null;
  switch (collectionsStatus) {
    case "pending":
      {
        Array.from(new Array(5)).map((n, index) => (
          <Skeleton
            key={index}
            height='30px'
            startColor='gray.300'
            endColor='gray.100'
          />
        ));
      }

      break;
    case "succeeded":
      collectionsList = topCollections.map((collection) => (
        <ListItem key={collection._id} mb='2'>
          <Box>
            <CustomLink to={`/collections/${collection._id}`}>
              {collection.title}
            </CustomLink>{" "}
            - {collection.itemsLength} {t("main.items").toLowerCase()}
          </Box>
        </ListItem>
      ));
      break;
    case "failed":
      collectionsList = (
        <Text fontSize='md' color='red'>
          {t("global.somethingWentWrong")}
        </Text>
      );
  }

  React.useEffect(() => {
    dispatch(fetchLatestItems({ sortBy: "updatedAt_desc", limit: 10 }));
    dispatch(fetchTopFiveCollections());
  }, [dispatch]);

  return (
    <>
      <VStack spacing='8' align='stretch'>
        <Box>
          <Heading as='h2' fontSize='2xl' mb='4'>
            {t("main.latestItems")}
          </Heading>
          <UnorderedList>
            <CustomList
              loading={itemsStatus === "pending"}
              list={latestItems}
              errorMessage={error}
            />
          </UnorderedList>
        </Box>

        <Box>
          <Heading as='h2' fontSize='2xl' mb='4'>
            {t("main.topFiveCollections")}
          </Heading>
          <OrderedList>{collectionsList}</OrderedList>
        </Box>

        <TagsCloud />
      </VStack>
    </>
  );
};

export default MainPage;
