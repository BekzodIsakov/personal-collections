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
import { useDeleteUser, useFetchUsers } from "../hooks/user";
import CustomLink from "../components/CustomLink";
import DeleteModal from "../components/DeleteModal";
import UserEditModal from "../components/UserEditModal";

const UsersPage = () => {
  const { loading, fetchUsers, users, setUsers } = useFetchUsers();

  const [selectedUserId, setSelectedUserId] = React.useState("");

  const {
    loading: deletingUser,
    deleteUser,
    deletedUserId,
    userDeleted,
  } = useDeleteUser();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  function handleModalOpen(modalName, userId) {
    setSelectedUserId(userId);
    if (modalName === "delete") {
      onDeleteModalOpen();
    } else {
      onEditModalOpen();
    }
  }

  React.useEffect(() => {
    fetchUsers();
  }, []);

  React.useEffect(() => {
    if (userDeleted) {
      const _users = users.filter((user) => user._id !== deletedUserId);
      setUsers(_users);
      setSelectedUserId("");
      onDeleteModalClose();
    }
  }, [deletedUserId]);

  return (
    <Box>
      <Wrap spacing='3' align='center' mb='5'>
        <WrapItem>
          <Heading as='h1' size='lg'>
            Users
          </Heading>
        </WrapItem>
        <WrapItem>{loading && <Spinner size='sm' />}</WrapItem>
      </Wrap>
      <UnorderedList>
        {users.map((user) => (
          <ListItem key={user._id} mb='4' backgroundColor={"transparent"}>
            <Wrap spacingX='10'>
              <WrapItem>
                <CustomLink to={`${user._id}`}>{user.name}</CustomLink>
              </WrapItem>
              <WrapItem>
                <Button
                  size='xs'
                  variant='outline'
                  colorScheme='black'
                  mr='2'
                  onClick={() => handleModalOpen("edit", user._id)}
                >
                  Edit
                </Button>

                <Button
                  size='xs'
                  variant='outline'
                  colorScheme='red'
                  onClick={() => handleModalOpen("delete", user._id)}
                >
                  Delete
                </Button>
              </WrapItem>
            </Wrap>
          </ListItem>
        ))}
      </UnorderedList>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onOpen={onDeleteModalOpen}
          onClose={onDeleteModalClose}
          onDelete={() => deleteUser(selectedUserId)}
          deletedItemName={"user"}
          loading={deletingUser}
        />
      )}
      <UserEditModal
        isOpen={isEditModalOpen}
        onOpen={onEditModalOpen}
        onClose={onEditModalClose}
        userId={selectedUserId}
        users={users}
        setUsers={setUsers}
      />
    </Box>
  );
};

export default UsersPage;
