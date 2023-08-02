import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  HStack,
  IconButton,
  Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { useAuth } from "../providers/authProvider";
import { useItemFetch } from "../hooks/items";

import SVG from "./SVG";
import { useTranslation } from "react-i18next";
import CommentsSection from "./CommentsSection";

const ItemViewModal = ({ isOpen, onClose, itemId, setItemId, itemName }) => {
  const [likeLoading, setLikeLoading] = React.useState(false);

  const { isOpen: isCollapsed, onToggle } = useDisclosure();
  const toast = useToast();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { loading, item, onItemFetch, updateItem } = useItemFetch();

  const toastBgColor = useColorModeValue("white", "gray.800");

  const likeUnlikeItem = async (itemId) => {
    try {
      setLikeLoading(true);
      const result = await axios.patch(
        `${import.meta.env.VITE_URL}/items/${itemId}/react`
      );
      updateItem({ likes: result.data });
    } catch (error) {
      if (error.response.status === 401) {
        toast({
          render: ({ onClose }) => (
            <Box p='3' bg={toastBgColor} borderRadius={"md"} boxShadow={"lg"}>
              <HStack justify={"space-between"} align={"center"} mb='2'>
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  <WarningIcon w='5' h='5' color='orange' mr='1' />{" "}
                  {t("global.unauthorized")}
                </Text>
                <IconButton size='xs' icon={<CloseIcon />} onClick={onClose} />
              </HStack>
              {t("global.please")}
              &nbsp;
              <Link href='/signin' color={"blue.400"}>
                {t("global.signIn")}
              </Link>
              &nbsp; {t("global.or")} &nbsp;
              <Link href='/signup' color={"blue.400"}>
                {t("global.signUp")}
              </Link>
            </Box>
          ),
          duration: 4000,
        });
      }
    } finally {
      setLikeLoading(false);
    }
  };

  const handleModalClose = () => {
    onClose();
    setItemId("");
  };

  let modalContent = null;
  if (loading) {
    modalContent = (
      <>
        <Skeleton h='64px' />
        <HStack my='1'>
          <Skeleton w='75px' h='32px' />
          <Skeleton w='97px' h='32px' />
        </HStack>
      </>
    );
  } else if (item) {
    modalContent = (
      <>
        <Card variant='outline'>
          <CardBody p='3'>
            <List>
              <ListItem>
                <Text as='b'>{t("global.author")}</Text>- {item.author.name}
              </ListItem>
              {item.optionalFields[0] &&
                JSON.parse(item.optionalFields).map((field, index) => (
                  <ListItem key={index}>
                    <Text as='b'>{field.name}</Text> - {String(field.value)}
                  </ListItem>
                ))}
            </List>
          </CardBody>
        </Card>

        <HStack my='1' spacing='5'>
          <Button
            isDisabled={likeLoading}
            onClick={() => likeUnlikeItem(item._id)}
            variant='ghost'
            size='sm'
          >
            {item.likes.includes(user?.id) ? (
              <SVG iconId='like-solid' />
            ) : (
              <SVG iconId='like' />
            )}
            <Text
              color='blue.400'
              fontSize='sm'
              ml={item.likes.length ? "2" : "0"}
            >
              {likeLoading ? (
                <Spinner size='xs' />
              ) : item.likes.length ? (
                item.likes.length
              ) : null}
            </Text>
          </Button>
          <Button size='sm' variant='ghost' onClick={onToggle}>
            {isCollapsed ? (
              <SVG iconId='comments-solid' />
            ) : (
              <SVG iconId='comments' />
            )}
          </Button>
        </HStack>
        <Collapse in={isCollapsed} animateOpacity>
          {isCollapsed && <CommentsSection itemId={itemId} />}
        </Collapse>
      </>
    );
  }

  React.useEffect(() => {
    if (itemId) {
      onItemFetch(itemId);
    }
  }, [itemId]);

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
        <ModalBody>{modalContent}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemViewModal;
