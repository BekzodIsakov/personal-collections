import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Badge,
  Box,
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

import { CustomList } from "@/components";
import { fetchCollection } from "../../utils/data";

const Collection = () => {
  const { t } = useTranslation();
  const { collectionId } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: [collectionId],
    queryFn: () => fetchCollection(collectionId),
  });

  if (isPending) {
    return (
      <Flex h='165' border='solid' borderColor='gray.200' rounded='md'>
        <Skeleton w={{ base: "100%", sm: "200px" }} h='100%' />
        <Box h={"100%"} flex='1' px='20px' py='15'>
          <SkeletonText mt='4' noOfLines='4' spacing='4' skeletonHeight='4' />
        </Box>
      </Flex>
    );
  }

  if (isError) {
    return <Text color='orange'>{error}</Text>;
  }

  if (data) {
    const collection = data.data;

    return (
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
              <Box mb='2'>
                <Text fontWeight={"semibold"} as={"b"}>
                  {t("global.author")}:
                </Text>
                {collection.author?.name}
              </Box>
              <Box mb={2}>
                <Text fontWeight='semibold' as='b'>
                  {t("global.topic")}:
                </Text>
                <Badge rounded='sm' fontWeight='semibold' colorScheme='blue'>
                  {collection.topic.title}
                </Badge>
              </Box>
            </CardBody>
          </Stack>
        </Card>

        <Box mt='8'>
          <Heading as='h2' fontSize='md' fontWeight='semibold' mb='3'>
            {t("global.collectionItems")}
          </Heading>
          <CustomList list={collection.items} showDetails={false} />
        </Box>
      </Box>
    );
  }
};

export default Collection;
