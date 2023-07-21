import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCollectionFetch } from "../hooks/collections";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import CustomList from "../components/CustomList";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import GoBackButton from "../components/GoBackButton";

const CollectionPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { loading, errorMessage, collection, fetchCollection } =
    useCollectionFetch();

  React.useEffect(() => {
    fetchCollection(params.id);
  }, []);

  let collectionResult = null;
  if (loading) {
    collectionResult = (
      <Flex h={165} border='solid' borderColor='gray.200' rounded='md'>
        <Skeleton w={{ base: "100%", sm: "200px" }} h={"100%"} />
        <Box h={"100%"} flex='1' px='20px' py='15'>
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />
        </Box>
      </Flex>
    );
  } else if (collection) {
    collectionResult = (
      <Box>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow='hidden'
          variant='outline'
        >
          <Image
            objectFit='cover'
            maxW={{ base: "100%", sm: "200px" }}
            src={collection?.image?.location}
            alt={collection?.image?.originalname.split(".")[0]}
          />

          <Stack>
            <CardBody>
              <Heading size='md' as='h1'>
                {collection.title}
              </Heading>

              <Text py='2'>{collection.description}</Text>

              <Box mb={2}>
                <Text fontWeight={"semibold"} as={"b"}>
                  Author:
                </Text>{" "}
                {collection.author?.name}
              </Box>

              <Box mb={2}>
                <Text fontWeight={"semibold"} as={"b"}>
                  Topic:
                </Text>{" "}
                <Badge
                  rounded={"sm"}
                  fontWeight={"semibold"}
                  colorScheme='blue'
                >
                  {collection.topic.title}
                </Badge>
              </Box>
            </CardBody>
          </Stack>
        </Card>

        <Box mt={8}>
          <Heading as='h2' fontSize={"md"} fontWeight={"semibold"} mb={3}>
            Collection items
          </Heading>
          <CustomList
            loading={loading}
            list={collection.items}
            errorMessage={errorMessage}
            showDetails={false}
          />
        </Box>
      </Box>
    );
  } else if (errorMessage) {
    collectionResult = <Text color='orange'>{errorMessage}</Text>;
  }

  return (
    <Box>
      <GoBackButton />
      {collectionResult}
    </Box>
  );
};

export default CollectionPage;
