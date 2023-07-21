import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  deletedItemName,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx='3'>
        <ModalHeader>Delete {deletedItemName}</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <HStack>
            <Button
              colorScheme={"red"}
              onClick={onDelete}
              size='sm'
              isLoading={loading}
            >
              Delete
            </Button>
            <Button colorScheme='blue' mr='3' onClick={onClose} size='sm'>
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
