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
import { useCurrentUser } from "@/providers/currentUserProvider";

import { useQuery } from "@tanstack/react-query";
import { fetchUserCollections } from "../utils/data";

const UserPage = () => {
  const { t } = useTranslation();

  const { currentUser, setCurrentUser } = useCurrentUser();

  const { user, fetchUser } = useFetchUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const {
  //   loading: userCollectionsLoading,
  //   collections: userCollections,
  //   fetchUserCollections,
  // } = useFetchUserCollections();

  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ["use_collections", currentUser?._id],
    queryFn: () => fetchUserCollections(currentUser?._id),
    enabled: !!currentUser?._id,
  });

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

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Text color={"orange"}>{error}</Text>;
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
                <WrapItem>{isPending && <Spinner size='sm' />}</WrapItem>
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
              {data?.data.map((collection) => (
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
            fetchUserCollections={refetch}
          />
        )}
      </>
    );
  }
};

export default UserPage;
