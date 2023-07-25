import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
} from "@chakra-ui/react";
import { useFetchUser, useUpdateUser } from "../hooks/user";
import { useAuth } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";
import translations from "../utils/translations";
import { useI18n } from "../providers/i18nProvider";

const UserEditModal = ({ isOpen, onClose, userId, users, setUsers }) => {
  const [name, setName] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isBlocked, setIsBlocked] = React.useState(false);

  const { setUser, user } = useAuth();

  const { selectedLanguage } = useI18n();

  const { loading, user: currentUser, fetchUser } = useFetchUser();

  const navigate = useNavigate();

  const {
    loading: updatingUser,
    user: updatedUser,
    updateUser,
  } = useUpdateUser();

  function handleOnSubmit(e) {
    e.preventDefault();
    updateUser(userId, { name, isAdmin, isBlocked });
  }

  React.useEffect(() => {
    if (userId) fetchUser(userId);
  }, [userId]);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setIsAdmin(currentUser.isAdmin);
      setIsBlocked(currentUser.isBlocked);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (updatedUser) {
      const _users = users.map((user) => {
        return user._id === updatedUser._id ? { ...updatedUser } : user;
      });

      if (user.id === updatedUser._id) {
        setUser({
          name: updatedUser.name,
          isAdmin: updatedUser.isAdmin,
          id: updatedUser._id,
        });
        navigate("/");
      }

      setUsers(_users);
      onClose();
    }
  }, [updatedUser]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx='3' pb='3'>
        <ModalHeader>
          {translations[selectedLanguage]?.general.editUser}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : (
            <form onSubmit={handleOnSubmit}>
              <FormControl mb='5'>
                <FormLabel>
                  {translations[selectedLanguage]?.general.userName}
                </FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormControl>
              <HStack width='100%' mb='8'>
                <FormControl width='max-content' mr='8'>
                  <FormLabel>Admin</FormLabel>
                  <Switch
                    isChecked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    id='adminId'
                  />
                </FormControl>
                <FormControl width='max-content'>
                  <FormLabel>
                    {translations[selectedLanguage]?.general.blocked}
                  </FormLabel>
                  <Switch
                    isChecked={isBlocked}
                    onChange={(e) => setIsBlocked(e.target.checked)}
                    id='blockId'
                  />
                </FormControl>
              </HStack>

              <Button type='submit' colorScheme='blue' isLoading={updatingUser}>
                {translations[selectedLanguage]?.general.done}
              </Button>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserEditModal;
