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
import translations from "../utils/translations";
import { useI18n } from "../providers/i18nProvider";

const DeleteModal = ({ isOpen, onClose, onDelete, modalTitle, loading }) => {
  const { selectedLanguage } = useI18n();

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
              {translations[selectedLanguage]?.general.delete}
            </Button>
            <Button colorScheme='blue' mr='3' onClick={onClose} size='sm'>
              {translations[selectedLanguage]?.general.cancel}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
