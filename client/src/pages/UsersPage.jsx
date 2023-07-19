import {
  Box,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { useFetchUsers } from "../hooks/user";
import CustomLink from "../components/CustomLink";

const UsersPage = () => {
  const { loading, fetchUsers, users } = useFetchUsers();
  console.log({ users });

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box>
      <Heading as={"h1"} mb='5' size={"lg"}>
        Users
      </Heading>
      <UnorderedList>
        {loading ? (
          <Spinner />
        ) : (
          users.map((user) => (
            <ListItem key={user._id}>
              <CustomLink to={`${user._id}`}>{user.name}</CustomLink>
            </ListItem>
          ))
        )}
      </UnorderedList>
    </Box>
  );
};

export default UsersPage;
