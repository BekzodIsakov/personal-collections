import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchTopFiveCollections } from "@/store/slices/topCollectionsSlice";
import { fetchLatestItems } from "@/store/slices/latestItemsSlice";
import { Link, TagsCloud, CustomList } from "@/components";
import TopCollections from "../components/TopCollections";

const MainPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const {
    latestItems,
    status: itemsStatus,
    error,
  } = useSelector((state) => state.latestItemsReducer);

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
          <TopCollections />
        </Box>

        <TagsCloud />
      </VStack>
    </>
  );
};

export default MainPage;
