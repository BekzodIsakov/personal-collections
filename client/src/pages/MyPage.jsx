import React from "react";
import {
  Avatar,
  Badge,
  Box,
  HStack,
  Heading,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useGetMe } from "../hooks/user";
import { useFetchMyCollections } from "../hooks/collections";
import CustomLink from "../components/CustomLink";
import GoBackButton from "../components/GoBackButton";

const MyPage = () => {
  const { loading, errorMessage, me, getMe } = useGetMe();

  const {
    loading: collectionsLoading,
    errorMessage: collectionsFetchErrorMessage,
    collections,
    fetchMyCollections,
  } = useFetchMyCollections();

  let myPage = null;

  if (loading) {
    myPage = (
      <Box>
        <Spinner />
      </Box>
    );
  } else if (me) {
    myPage = (
      <Box>
        <HStack mb={7}>
          <Avatar name={me.name} alt={me.name} mr={2} />
          <Box>
            <HStack>
              <Heading as='h1' size='md' mr={1}>
                {me.name}
              </Heading>
              <Badge colorScheme={"orange"}>{me.isAdmin && "Admin"}</Badge>
            </HStack>
            <Text color='gray'>{me.email}</Text>
          </Box>
        </HStack>

        <Box>
          <Heading size='md' mb={4}>
            My collections
          </Heading>
          {collectionsLoading && <Spinner />}
          <UnorderedList>
            {collections &&
              collections.map((collection) => (
                <ListItem key={collection._id} mb={2}>
                  <CustomLink to={`collections/${collection._id}`}>
                    {collection.title}
                  </CustomLink>
                </ListItem>
              ))}
          </UnorderedList>
        </Box>
      </Box>
    );
  } else if (errorMessage) {
    myPage = <Text color={"orange"}>{errorMessage}</Text>;
  }

  React.useEffect(() => {
    getMe();
  }, []);

  React.useEffect(() => {
    if (me) {
      fetchMyCollections();
    }
  }, [me]);

  return (
    <Box>
      <GoBackButton />
      {myPage}
    </Box>
  );
};

export default MyPage;
