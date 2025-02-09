import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Heading,
  Grid,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";

import { fetchCollections } from "../../../utils/data";
import CollectionCardSkeleton from "./CollectionCardSkeleton";
import CollectionCard from "./CollectionCard";

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

  console.log(collections?.data[0]);

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
          <CollectionCard
            key={collection._id}
            id={collection._id}
            imageUrl={collection.image?.location}
            title={collection.title}
            description={collection.description}
            authorName={collection.author.name}
            items={collection.items.length}
          />
        ))}
      </Grid>
    </section>
  );
};

export default CollectionsCards;
