import { Box, Heading, ListItem, UnorderedList, Link } from "@chakra-ui/react";
import React from "react";
import { useFetchUsers } from "../hooks/user";
import { Link as RouterLink } from "react-router-dom";
import CustomLink from "../components/CustomLink";

const UsersPage = () => {
  const { loading, errorMessage, fetchUsers, users } = useFetchUsers();
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
        {users.map((user) => (
          <ListItem key={user._id}>
            {/* <Link as={<RouterLink />} to={`/${user._id}`}>
              {user.name}
            </Link> */}
            <CustomLink to={`${user._id}`}>{user.name}</CustomLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default UsersPage;
