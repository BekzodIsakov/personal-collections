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

const ItemViewModal = ({ isOpen, onClose, itemId, setItemId, itemName }) => {
  const { isOpen: isCollapsed, onToggle } = useDisclosure();

  const { user, token } = useAuth();
  const toast = useToast();

  const toastBgColor = useColorModeValue("white", "gray.800");

  const { loading, item, setItem, onItemFetch, updateItem } = useItemFetch();
  console.log({ item });

  const [comment, setComment] = React.useState("");

  const likeUnlikeItem = async (itemId) => {
    try {
      setLikeLoading(true);
      const result = await axios.patch(
        `${import.meta.env.VITE_URL}/items/${itemId}/react`
      );
      updateItem({ likes: result.data });
    } catch (error) {
      if (error.response.status === 401) {
        setErrorTitle("Unauthorized");
        toast({
          render: ({ onClose }) => (
            <Box p={3} bg={toastBgColor} borderRadius={"md"} boxShadow={"lg"}>
              <HStack justify={"space-between"} align={"center"} mb={2}>
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  <WarningIcon w={5} h={5} color='orange' mr={1} /> {errorTitle}
                </Text>
                <IconButton
                  size={"xs"}
                  icon={<CloseIcon />}
                  onClick={onClose}
                />
              </HStack>
              Please &nbsp;
              <Link href='/signin' color={"blue.400"}>
                sign in
              </Link>
              &nbsp; or &nbsp;
              <Link href='/signup' color={"blue.400"}>
                create new account
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

  const [errorTitle, setErrorTitle] = React.useState("");
  const [likeLoading, setLikeLoading] = React.useState(false);

  const {
    comment: sentComment,
    sendComment,
    loading: commentSending,
  } = useSendComment();

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
  console.log({ comments });

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
    console.log("items comments changed");
  }, [comments.length]);

  React.useEffect(() => {
    if (sentComment) {
      console.log({ sentComment });
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

  let modalContent = null;
  if (loading) {
    modalContent = (
      <>
        <Skeleton h={"64px"} />
        <HStack my={1}>
          <Skeleton w={"75px"} h={"32px"} />
          <Skeleton w={"97px"} h={"32px"} />
        </HStack>
      </>
    );
  } else if (item) {
    modalContent = (
      <>
        <Card variant='outline'>
          <CardBody p={3}>
            <List>
              <ListItem>Author - {item.author.name}</ListItem>
              {item.optionalFields.length &&
                item.optionalFields.map((field, index) => (
                  <ListItem key={index}>
                    {field.key} - {field.value}
                  </ListItem>
                ))}
            </List>
          </CardBody>
        </Card>

        <HStack my={1}>
          <Button
            isLoading={likeLoading}
            isDisabled={likeLoading}
            onClick={() => likeUnlikeItem(item._id)}
            variant='ghost'
            size={"sm"}
            color={item.likes.includes(user?.id) ? "blue.400" : ""}
          >
            {item.likes.includes(user?.id) ? "Liked" : "Like"}
            <Text
              color='blue.400'
              fontSize={"sm"}
              ml={item.likes.length ? 2 : 0}
            >
              {item.likes.length || null}
            </Text>
          </Button>
          <Button size={"sm"} variant='ghost' onClick={onToggle}>
            Comments
          </Button>
        </HStack>
        <Collapse in={isCollapsed} animateOpacity>
          <Box p={3} bg={commentsSectionBg} rounded={"md"}>
            <Box mb={4}>
              {token ? (
                <HStack align={"start"}>
                  <Avatar name={user?.name} size={"xs"} />
                  <Textarea
                    rows={2}
                    rounded={"lg"}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    size={"xs"}
                    colorScheme={"blue"}
                    px={3}
                    isDisabled={!comment}
                    isLoading={commentSending}
                    onClick={handleSendComment}
                  >
                    comment
                  </Button>
                </HStack>
              ) : (
                <Box>
                  <Text fontWeight={"medium"}>
                    You must be logged in to comment.
                  </Text>{" "}
                  &nbsp;
                  <Link href='/signin' color='blue.400'>
                    Sign in
                  </Link>{" "}
                  |{" "}
                  <Link href='/signup' color='blue.400'>
                    Sign up
                  </Link>
                </Box>
              )}
            </Box>
            <VStack spacing={3} align={"stretch"} rounded='md'>
              {item.comments.length ? (
                item.comments.map((c) => (
                  <HStack key={c._id} align={"start"}>
                    <Avatar name={c.author.name} size={"xs"} />
                    <Text
                      color={commentTextColor}
                      bg={commentTextBg}
                      fontSize={"sm"}
                      rounded={"md"}
                      py={1}
                      px={2}
                      w={"100%"}
                    >
                      {c.comment}
                    </Text>
                  </HStack>
                ))
              ) : (
                <Text fontSize={"sm"}>No comments</Text>
              )}
            </VStack>
          </Box>
        </Collapse>
      </>
    );
  }

  return (
    <Modal isOpen={isOpen} scrollBehavior='inside' onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent mx={3}>
        <ModalHeader>
          <Text fontSize={"md"} mr={5}>
            {itemName}
          </Text>
        </ModalHeader>
        <ModalCloseButton ml={2} />
        <ModalBody>{modalContent}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemViewModal;
