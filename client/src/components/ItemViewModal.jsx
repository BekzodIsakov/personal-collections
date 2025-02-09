import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { ItemCard } from "@/components";

const ItemViewModal = ({ isOpen, onClose, itemId, setItemId, itemName }) => {
  const handleModalClose = () => {
    onClose();
    setItemId("");
  };

  return (
    <Modal isOpen={isOpen} scrollBehavior='inside' onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent mx='3'>
        <ModalHeader>
          <Text fontSize='md' mr='5'>
            {itemName}
          </Text>
        </ModalHeader>
        <ModalCloseButton ml='2' />
        <ModalBody>
          <ItemCard itemId={itemId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemViewModal;
