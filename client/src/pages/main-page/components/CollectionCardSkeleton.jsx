import {
  Card,
  CardBody,
  Skeleton,
  Stack,
  Text,
  Heading,
  Divider,
  CardFooter,
} from "@chakra-ui/react";

const CollectionCardSkeleton = () => {
  return (
    <Card boxShadow={"xl"} border={"1px solid lightgray"}>
      <CardBody>
        <Skeleton height='180px' borderRadius='lg' />
        <Stack mt={6} spacing={3}>
          <Skeleton>
            <Heading as='h3' size='md'>
              Hidden
            </Heading>
          </Skeleton>

          <Skeleton height='3em'>
            <Text>Hidden</Text>
          </Skeleton>

          <Stack spacing={1}>
            <Skeleton height='20px' width='150px'>
              <Text>Hidden</Text>
            </Skeleton>
            <Skeleton height='20px' width='100px'>
              <Text>Hidden</Text>
            </Skeleton>
          </Stack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Skeleton height='40px' width='70px' borderRadius='md' />
      </CardFooter>
    </Card>
  );
};

export default CollectionCardSkeleton;
