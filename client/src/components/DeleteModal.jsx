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
import { useTranslation } from "react-i18next";

const DeleteModal = ({ isOpen, onClose, onDelete, modalTitle, loading }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx='3'>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalFooter>
          <HStack>
            <Button
              colorScheme={"red"}
              onClick={onDelete}
              size='sm'
              isLoading={loading}
            >
              {t("global.delete")}
            </Button>
            <Button colorScheme='blue' mr='3' onClick={onClose} size='sm'>
              {t("global.cancel")}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
