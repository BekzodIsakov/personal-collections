import React from "react";
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
  Spinner,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCollections } from "../utils/data";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CollectionCardSkeleton from "./CollectionCardSkeleton";

const CollectionsCards = () => {
  const {
    data: collections,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () => fetchCollections(),
    refetchOnWindowFocus: false, // remove this line for deployment
    refetchInterval: 2000 * 60,
  });

  const placeholderImageLink =
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  const { t } = useTranslation();

  return (
    <section>
      <Heading as='h1' fontSize='4xl' marginBottom={8}>
        {t("main.collections")}
        {isFetching && <Spinner marginLeft='20px' />}
      </Heading>

      {isLoading && (
        <SimpleGrid
          templateColumns='repeat(auto-fill, minmax(240px, 1fr))'
          spacing={6}
        >
          {[1, 2, 3, 4].map((i) => (
            <CollectionCardSkeleton key={i} />
          ))}
        </SimpleGrid>
      )}

      <Grid
        templateColumns='repeat(auto-fill, minmax(240px, 1fr))'
        rowGap={8}
        columnGap={6}
      >
        {collections?.data.map((collection) => (
          <Card
            boxShadow={"xl"}
            border={"1px solid lightgray"}
            key={collection._id}
          >
            <CardBody>
              <Image
                src={
                  collection.image?.location ??
                  "https://picsum.photos/seed/picsum/200?blur"
                }
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                height={"180px"}
                width={"100%"}
              />
              <Stack mt={6} spacing={3}>
                <Heading as={"h3"} size='md'>
                  {collection.title}
                </Heading>
                <Text noOfLines={2}>
                  {collection.description}. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Enim, doloribus.
                </Text>
                <Stack spacing={1}>
                  <Text>
                    Author: <b>{collection.author.name}</b>
                  </Text>
                  <Text>
                    Items: <b>{collection.items.length}</b>
                  </Text>
                </Stack>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button
                  variant={"outline"}
                  as={Link}
                  to={`collections/${collection._id}`}
                >
                  View
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </section>
  );
};

export default CollectionsCards;
