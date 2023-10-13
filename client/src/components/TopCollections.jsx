import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, ListItem, OrderedList, Skeleton, Text } from "@chakra-ui/react";
import { Link } from "@/components";

const TopCollections = () => {
  const { topCollections, status } = useSelector(
    (state) => state.topCollectionsReducer
  );
  const { t } = useTranslation();

  const view = {
    pending: Array.from(new Array(5)).map((n, index) => (
      <Skeleton
        key={index}
        height='30px'
        startColor='gray.300'
        endColor='gray.100'
      />
    )),
    succeeded: (
      <OrderedList>
        {topCollections.map((collection) => (
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
    ),
    failed: (
      <Text fontSize='md' color='red'>
        {t("global.somethingWentWrong")}
      </Text>
    ),
  };

  return <div>{view[status]}</div>;
};

export default TopCollections;
