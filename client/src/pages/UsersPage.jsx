import React from "react";
import { useTranslation } from "react-i18next";
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
import { useDeleteUser, useFetchUsers } from "@/hooks/user";
import { Link, DeleteModal, UserEditModal } from "@/components";

const UsersPage = () => {
  const { loading, fetchUsers, users, setUsers } = useFetchUsers();

  const { t } = useTranslation();

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
            {t("global.users")}
          </Heading>
        </WrapItem>
        <WrapItem>{loading && <Spinner size='sm' />}</WrapItem>
      </Wrap>
      <UnorderedList>
        {users.map((user) => (
          <ListItem key={user._id} mb='4' backgroundColor={"transparent"}>
            <Wrap spacingX='10'>
              <WrapItem>
                <Link to={`${user._id}`}>{user.name}</Link>
              </WrapItem>
              <WrapItem>
                <Button
                  size='xs'
                  variant='outline'
                  colorScheme='telegram'
                  mr='2'
                  onClick={() => handleModalOpen("edit", user._id)}
                >
                  {t("global.edit")}
                </Button>

                <Button
                  size='xs'
                  variant='outline'
                  colorScheme='red'
                  onClick={() => handleModalOpen("delete", user._id)}
                >
                  {t("global.delete")}
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
          modalTitle={t("global.deleteUser")}
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
