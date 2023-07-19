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
  useDisclosure,
} from "@chakra-ui/react";
import { useFetchUser } from "../hooks/user";
import { useFetchUserCollections } from "../hooks/collections";
import CustomLink from "../components/CustomLink";
import GoBackButton from "../components/GoBackButton";
import NewCollectionModal from "../components/NewCollectionModal";
import { AddIcon } from "@chakra-ui/icons";
import { useLocation, useParams } from "react-router-dom";
import { useCurrentUser } from "../providers/currentUserProvider";

const UserPage = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  console.log({ currentUser });

  const { loading, errorMessage, user, fetchUser } = useFetchUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const location = useLocation();
  const userPath = location.pathname.split("/")[1];
  const params = useParams();

  // const {
  //   loading: myCollectionsLoading,
  //   collections: myCollections,
  //   fetchMyCollections,
  // } = useFetchMyCollections();

  const {
    loading: userCollectionsLoading,
    collections: userCollections,
    fetchUserCollections,
  } = useFetchUserCollections();

  // const collections = React.useMemo(
  //   () => myCollections || userCollections,
  //   [myCollections, userCollections]
  // );

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
            <Heading size='md' mb={4}>
              My collections
            </Heading>
            <Button
              size='sm'
              onClick={onOpen}
              colorScheme='blue'
              leftIcon={<AddIcon />}
            >
              New collection
            </Button>
          </Stack>
          {userCollectionsLoading && <Spinner />}
          {!userCollectionsLoading && (
            <UnorderedList>
              {userCollections.map((collection) => (
                <ListItem key={collection._id} mb={2}>
                  <CustomLink to={`collections/${collection._id}`}>
                    {collection.title}
                  </CustomLink>
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </Box>
      </Box>
    );
  } else if (errorMessage) {
    userPage = <Text color={"orange"}>{errorMessage}</Text>;
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  React.useEffect(() => {
    // if (user && userPath === "me") {
    //   fetchMyCollections();
    // } else {
    //   fetchUserCollections(params.userId);
    // }
    if (currentUser) fetchUserCollections(currentUser._id);
  }, [currentUser]);

  React.useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  React.useEffect(() => {
    fetchUser();
  }, [location]);

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
