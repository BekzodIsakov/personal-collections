import {
  Box,
  Button,
  Heading,
  ListItem,
  Spinner,
  UnorderedList,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useFetchUsers } from "../hooks/user";
import CustomLink from "../components/CustomLink";
import DeleteModal from "../components/DeleteModal";
import UserEditModal from "../components/UserEditModal";

const UsersPage = () => {
  const { loading, fetchUsers, users } = useFetchUsers();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

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
            <ListItem key={user._id} mb='4'>
              <Wrap spacingX={"10"}>
                <WrapItem>
                  <CustomLink to={`${user._id}`}>{user.name}</CustomLink>
                </WrapItem>
                <WrapItem>
                  <Button
                    size={"xs"}
                    variant={"outline"}
                    colorScheme='black'
                    mr='2'
                    onClick={onEditModalOpen}
                  >
                    Edit
                  </Button>

                  <Button
                    size={"xs"}
                    variant={"outline"}
                    colorScheme='red'
                    onClick={onDeleteModalOpen}
                  >
                    Delete
                  </Button>
                </WrapItem>
              </Wrap>
            </ListItem>
          ))
        )}
      </UnorderedList>

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onOpen={onDeleteModalOpen}
          onClose={onDeleteModalClose}
          onDelete={() => console.log("Deleting user")}
          deletedItemName={"user"}
        />
      )}

      {isEditModalOpen && (
        <UserEditModal
          isOpen={isEditModalOpen}
          onOpen={onEditModalOpen}
          onClose={onEditModalClose}
        />
      )}
    </Box>
  );
};

export default UsersPage;
