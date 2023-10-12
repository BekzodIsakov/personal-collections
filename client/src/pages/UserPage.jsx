import React from "react";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link, CreateCollectionModal, Spinner } from "@/components";
import { useFetchUser } from "@/hooks/user";
import { useFetchUserCollections } from "@/hooks/collections";
import { useCurrentUser } from "@/providers/currentUserProvider";

const UserPage = () => {
  const { t } = useTranslation();

  const { currentUser, setCurrentUser } = useCurrentUser();

  const { loading, errorMessage, user, fetchUser } = useFetchUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    loading: userCollectionsLoading,
    collections: userCollections,
    fetchUserCollections,
  } = useFetchUserCollections();

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

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <Text color={"orange"}>{errorMessage}</Text>;
  }

  if (user) {
    return (
      <>
        <Box>
          <HStack mb={7}>
            <Avatar name={user.name} alt={user.name} mr={2} />
            <Box>
              <HStack>
                <Heading as='h1' size='md' mr={1}>
                  {user.name}
                </Heading>
                {user.isAdmin && <Badge colorScheme={"orange"}>Admin</Badge>}
              </HStack>
              <Text color='gray'>{user.email}</Text>
            </Box>
          </HStack>

          <Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Wrap spacing={"3"} mb='4' align='center'>
                <WrapItem>
                  <Heading size='md'>{t("userPage.myCollections")}</Heading>
                </WrapItem>
                <WrapItem>
                  {userCollectionsLoading && <Spinner size='sm' />}
                </WrapItem>
              </Wrap>
              <Button
                size='sm'
                onClick={onOpen}
                colorScheme='telegram'
                leftIcon={<AddIcon />}
              >
                {t("global.newCollection")}
              </Button>
            </Stack>

            <UnorderedList>
              {userCollections.map((collection) => (
                <ListItem key={collection._id} mb={2}>
                  <Link to={`collections/${collection._id}`}>
                    {collection.title}
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>
        {isOpen && (
          <CreateCollectionModal
            isOpen={isOpen}
            onClose={onClose}
            fetchUserCollections={fetchUserCollections}
          />
        )}
      </>
    );
  }
};

export default UserPage;
