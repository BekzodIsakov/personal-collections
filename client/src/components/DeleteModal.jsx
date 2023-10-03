import { useTranslation } from "react-i18next";
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
              onClick={onDelete}
              isLoading={loading}
              colorScheme={"red"}
              size='sm'
            >
              {t("global.delete")}
            </Button>
            <Button onClick={onClose} colorScheme='telegram' size='sm' mr='3'>
              {t("global.cancel")}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
