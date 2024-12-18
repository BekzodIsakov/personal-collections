// import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, ListItem, OrderedList, Skeleton, Text } from "@chakra-ui/react";
import { Link } from "@/components";
// import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchTopCollections } from "../utils/data";

const TopCollections = () => {
  // const { topCollections, status } = useSelector(
  //   (state) => state.topCollectionsReducer
  // );

  const topCollections = useQuery({
    queryKey: ["topCollections"],
    queryFn: fetchTopCollections,
  });
  const { t } = useTranslation();

  if (topCollections.status === "pending") {
    return Array.from(new Array(5)).map((n, index) => (
      <Skeleton
        key={index}
        height='30px'
        startColor='gray.300'
        endColor='gray.100'
      />
    ));
  }

  if (topCollections.isError) {
    console.error(topCollections.error);

    return (
      <Text fontSize='md' color='red'>
        {t("global.somethingWentWrong")}
      </Text>
    );
  }

  if (topCollections.data) {
    const collections = topCollections.data.data;
    console.log({ collections });

    return (
      <OrderedList>
        {collections.map((collection) => (
          <ListItem key={collection._id} mb='2'>
            <Box>
              <Link to={`/collections/${collection._id}`}>
                {collection.title}
              </Link>{" "}
              - {collection.items.length}{" "}
              {collection.items.length === 1
                ? t("main.item").toLowerCase()
                : t("main.items").toLowerCase()}
            </Box>
          </ListItem>
        ))}
      </OrderedList>
    );
  }

  // const view = {
  //   pending: Array.from(new Array(5)).map((n, index) => (
  //     <Skeleton
  //       key={index}
  //       height='30px'
  //       startColor='gray.300'
  //       endColor='gray.100'
  //     />
  //   )),
  //   succeeded: (
  //     <OrderedList>
  //       {topCollections.map((collection) => (
  //         <ListItem key={collection._id} mb='2'>
  //           <Box>
  //             <Link to={`/collections/${collection._id}`}>
  //               {collection.title}
  //             </Link>{" "}
  //             - {collection.items.length}{" "}
  //             {collection.items.length === 1
  //               ? t("main.item").toLowerCase()
  //               : t("main.items").toLowerCase()}
  //           </Box>
  //         </ListItem>
  //       ))}
  //     </OrderedList>
  //   ),
  //   failed: (
  //     <Text fontSize='md' color='red'>
  //       {t("global.somethingWentWrong")}
  //     </Text>
  //   ),
  // };

  // return <div>{view[status]}</div>;
};

export default TopCollections;
