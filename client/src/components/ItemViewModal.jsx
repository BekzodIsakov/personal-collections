import React from "react";
import {
  Avatar,
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
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { useAuth } from "../providers/authProvider";
import { useItemFetch } from "../hooks/items";
import { useFetchComments, useSendComment } from "../hooks/comments";
import { useI18n } from "../providers/i18nProvider";
import translations from "../utils/translations";
import SVG from "./SVG";

const ItemViewModal = ({ isOpen, onClose, itemId, setItemId, itemName }) => {
  const { isOpen: isCollapsed, onToggle } = useDisclosure();

  const toast = useToast();

  const { selectedLanguage } = useI18n();

  const { user, token } = useAuth();

  const {
    comment: sentComment,
    sendComment,
    loading: commentSending,
  } = useSendComment();

  const { loading, item, setItem, onItemFetch, updateItem } = useItemFetch();

  const [comment, setComment] = React.useState("");
  const [likeLoading, setLikeLoading] = React.useState(false);

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
            <Box p='3' bg='white' borderRadius={"md"} boxShadow={"lg"}>
              <HStack justify={"space-between"} align={"center"} mb='2'>
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  <WarningIcon w='5' h='5' color='orange' mr='1' />{" "}
                  {translations[selectedLanguage]?.general.unauthorized}
                </Text>
                <IconButton size='xs' icon={<CloseIcon />} onClick={onClose} />
              </HStack>
              {translations[selectedLanguage]?.general.please} &nbsp;
              <Link href='/signin' color={"blue.400"}>
                {translations[selectedLanguage]?.general.signin}
              </Link>
              &nbsp; {translations[selectedLanguage]?.general.or} &nbsp;
              <Link href='/signup' color={"blue.400"}>
                {translations[selectedLanguage]?.general.signup}
              </Link>
              .
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

  const commentsSectionBg = useColorModeValue("gray.50", "gray.700");
  const commentTextBg = useColorModeValue("gray.200", "gray.600");
  const commentTextColor = useColorModeValue("black", "gray.50");

  function handleSendComment() {
    sendComment(itemId, { comment });
  }

  const { fetchComments, comments } = useFetchComments();

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
                {translations[selectedLanguage]?.general.author} -{" "}
                {item.author.name}
              </ListItem>
              {item.optionalFields[0] &&
                JSON.parse(item.optionalFields).map((field, index) => (
                  <ListItem key={index}>
                    {field.name} - {String(field.value)}
                  </ListItem>
                ))}
            </List>
          </CardBody>
        </Card>

        <HStack my='1' spacing='5'>
          <Button
            isLoading={likeLoading}
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
            <Text fontSize='sm' ml={item.likes.length ? "2" : "0"}>
              {item.likes.length || null}
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
          <Box p='3' bg={commentsSectionBg} rounded='md'>
            <Box mb='4'>
              {token ? (
                <HStack align='start'>
                  <Avatar name={user?.name} size='xs' />
                  <Textarea
                    rows='2'
                    rounded='lg'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    size='xs'
                    colorScheme='blue'
                    px='3'
                    isDisabled={!comment}
                    isLoading={commentSending}
                    onClick={handleSendComment}
                  >
                    {translations[selectedLanguage]?.general.send}
                  </Button>
                </HStack>
              ) : (
                <Box>
                  <Text fontWeight='medium'>
                    {translations[selectedLanguage]?.general.loginToComment}.
                  </Text>{" "}
                  &nbsp;
                  <Link href='/signin' color='blue.400'>
                    {translations[selectedLanguage]?.general.signin}
                  </Link>{" "}
                  |{" "}
                  <Link href='/signup' color='blue.400'>
                    {translations[selectedLanguage]?.general.signup}
                  </Link>
                </Box>
              )}
            </Box>
            <VStack spacing='3' align='stretch' rounded='md'>
              {item.comments.length ? (
                item.comments.map((c) => (
                  <HStack key={c._id} align='start'>
                    <Avatar name={c.author?.name} size='xs' />
                    <Text
                      color={commentTextColor}
                      bg={commentTextBg}
                      fontSize='sm'
                      rounded='md'
                      py='1'
                      px='2'
                      w='100%'
                    >
                      {c.comment}
                    </Text>
                  </HStack>
                ))
              ) : (
                <Text fontSize='sm'>
                  {translations[selectedLanguage]?.general.noComments}
                </Text>
              )}
            </VStack>
          </Box>
        </Collapse>
      </>
    );
  }

  React.useEffect(() => {
    if (!isCollapsed) return;

    const intervalId = setInterval(() => {
      fetchComments(itemId);
    }, 4500);

    return () => {
      clearInterval(intervalId);
    };
  }, [isCollapsed]);

  React.useEffect(() => {
    if (comments.length) {
      const _item = { ...item };
      _item.comments = comments;
      setItem(_item);
    }
  }, [comments.length]);

  React.useEffect(() => {
    if (sentComment) {
      setComment("");
      const _item = item;
      item.comments.push(sentComment);
      setItem(_item);
    }
  }, [sentComment]);

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
