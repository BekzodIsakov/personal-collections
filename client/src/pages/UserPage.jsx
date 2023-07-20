import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  ListItem,
  Spinner,
  Stack,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useFetchUser } from "../hooks/user";
import { useFetchUserCollections } from "../hooks/collections";
import CustomLink from "../components/CustomLink";
import NewCollectionModal from "../components/NewCollectionModal";
import { AddIcon } from "@chakra-ui/icons";
import { useCurrentUser } from "../providers/currentUserProvider";

const UserPage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  console.log({ currentUser });

  const { loading, errorMessage, user, fetchUser } = useFetchUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    loading: userCollectionsLoading,
    collections: userCollections,
    fetchUserCollections,
  } = useFetchUserCollections();

  let userPage = null;
  if (loading) {
    userPage = (
      <Box>
        <Spinner />
      </Box>
    );
  } else if (user) {
    userPage = (
      <Box>
        <HStack mb={7}>
          <Avatar name={user.name} alt={user.name} mr={2} />
          <Box>
            <HStack>
              <Heading as='h1' size='md' mr={1}>
                {user.name}
              </Heading>
              <Badge colorScheme={"orange"}>{user.isAdmin && "Admin"}</Badge>
            </HStack>
            <Text color='gray'>{user.email}</Text>
          </Box>
        </HStack>

        <Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Wrap spacing={"3"} mb='4' align='center'>
              <WrapItem>
                <Heading size='md'>My collections</Heading>
              </WrapItem>
              <WrapItem>
                {userCollectionsLoading && <Spinner size='sm' />}
              </WrapItem>
            </Wrap>
            <Button
              size='sm'
              onClick={onOpen}
              colorScheme='blue'
              leftIcon={<AddIcon />}
            >
              New collection
            </Button>
          </Stack>

          <UnorderedList>
            {userCollections.map((collection) => (
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
    userPage = <Text color={"orange"}>{errorMessage}</Text>;
  }

  React.useEffect(() => {
    fetchUser();
  }, [location]);

  React.useEffect(() => {
    if (currentUser) fetchUserCollections(currentUser._id);
  }, [currentUser]);

  React.useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  return (
    <Box>
      {userPage}
      {isOpen && (
        <NewCollectionModal
          isOpen={isOpen}
          onClose={onClose}
          fetchUserCollections={fetchUserCollections}
        />
      )}
    </Box>
  );
};

export default UserPage;
