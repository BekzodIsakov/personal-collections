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
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { useAuth } from "../provider/authProvider";
import { useItemFetch } from "../hooks/useItemFetch";

const ItemModal = ({
  isOpen,
  onOpen,
  onClose,
  itemId,
  setItemId,
  itemName,
}) => {
  const { isOpen: isCollapsed, onToggle } = useDisclosure();

  // const currentUser = useSelector((state) => state.usersReducer.user)
  const { user } = useAuth();
  const toast = useToast();

  const { loading, item, onItemFetch, updateItem } = useItemFetch();
  console.log({ item });
  const likeUnlikeItem = async (itemId) => {
    try {
      setLikeLoading(true);
      const result = await axios.patch(
        `${import.meta.env.VITE_DEV_URL}/items/${itemId}/react`
      );
      updateItem({ likes: result.data });
    } catch (error) {
      if (error.response.status === 401) {
        setErrorTitle("Unauthorized");
        toast({
          render: ({ onClose }) => (
            <Box p={3} bg='white' borderRadius={"md"} boxShadow={"lg"}>
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

  console.log({ item });

  const handleModalClose = () => {
    onClose();
    setItemId("");
  };

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
          <CardBody>
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
          <Box p={3} mb={2} color='gray.600' bg='gray.50' rounded='md'>
            {item.comments.length ? (
              item.comments.map((c) => <Box key={c._id}>{c.comment}</Box>)
            ) : (
              <Text fontSize={"sm"}>No comments</Text>
            )}
          </Box>
          <Box>
            <Textarea />
            <Button>Comment</Button>
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

export default ItemModal;
