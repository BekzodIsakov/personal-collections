import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Heading,
  Spinner as ChakraSpinner,
  UnorderedList,
  VStack,
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Spinner from "../components/Spinner";
import { fetchTopFiveCollections } from "@/store/slices/topCollectionsSlice";
// import { fetchLatestItems } from "@/store/slices/latestItemsSlice";
import { TagsCloud, CustomList } from "@/components";
import TopCollections from "../components/TopCollections";

import { fetchCollections, fetchLatestItems } from "../utils/data";

import { useQuery } from "@tanstack/react-query";
import CollectionsCards from "../components/CollectionsCards";

const MainPage = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  // const { status, data, error, isFetching }
  const latestItems = useQuery({
    queryKey: ["fetchLatestItems"],
    queryFn: () => fetchLatestItems(10),
    refetchOnWindowFocus: false,
    refetchInterval: 2000 * 60,
  });

  // const {
  //   latestItems,
  //   status: itemsStatus,
  //   // error,
  // } = useSelector((state) => state.latestItemsReducer);
  // console.log({ data });

  React.useEffect(() => {
    // dispatch(fetchLatestItems({ sortBy: "updatedAt_desc", limit: 10 }));
    // dispatch(fetchTopFiveCollections());
  }, [dispatch]);

  return (
    // <VStack spacing='8' align='stretch'>
    //   <Box>
    //     <Heading as='h2' fontSize='2xl' mb='4'>
    //       {t("main.latestItems")}
    //       {latestItems.isFetching && <Spinner marginLeft='20px' />}
    //     </Heading>
    //     <UnorderedList>
    //       <CustomList
    //         loading={latestItems.status === "pending"}
    //         list={latestItems.data?.data}
    //         errorMessage={latestItems.error}
    //       />
    //     </UnorderedList>
    //   </Box>

    //   <Box>
    //     <Heading as='h2' fontSize='2xl' mb='4'>
    //       {t("main.topFiveCollections")}
    //     </Heading>

    //     <TopCollections />
    //   </Box>

    //   <TagsCloud />
    // </VStack>
    <div>
      <CollectionsCards />
    </div>
  );
};

export default MainPage;
