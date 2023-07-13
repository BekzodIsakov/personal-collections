import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const DeleteModal = ({ isOpen, onClose, onDelete, deleteItem, deleting }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={3}>
        <ModalHeader>Delete {deleteItem}</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <HStack>
            <Button
              colorScheme={"red"}
              onClick={onDelete}
              size='sm'
              isLoading={deleting}
            >
              Delete
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose} size='sm'>
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
