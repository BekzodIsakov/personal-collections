import React, { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { useAuth } from "../provider/authProvider";

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

  const [errorMessage, setErrorMessage] = React.useState("");
  const [likeLoading, setLikeLoading] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const toast = useToast();

  const likeUnlikeItem = async () => {
    try {
      setLikeLoading(true);
      const result = await axios.patch(
        `${import.meta.env.VITE_DEV_URL}/items/${itemId}/react`
      );
      // console.log({ likeResult: result });
      updateItemLikes(result.data);
    } catch (error) {
      console.log({ error });
      if (error.response.status === 401) {
        setErrorMessage("Unauthorized");
        toast({
          render: ({ onClose }) => (
            <Box p={3} bg='white' borderRadius={"md"} boxShadow={"lg"}>
              <HStack justify={"space-between"} align={"center"} mb={2}>
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  <WarningIcon w={5} h={5} color='orange' mr={1} /> Unauthorized
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
          duration: 5000,
        });
      }
    } finally {
      setLikeLoading(false);
    }
  };

  function updateItemLikes(update) {
    const updatedItem = {
      ...item,
      ...update,
    };
    setItem(updatedItem);
  }

  const fetchCurrentItem = useCallback(async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_DEV_URL}/items/${itemId}`
      );
      setItem(result.data);
    } catch (error) {
      setErrorMessage("Unauthorized");
    }
  }, [itemId]);

  console.log({ item });

  const handleModalClose = () => {
    onClose();
    setItemId("");
  };

  React.useEffect(() => {
    if (itemId) {
      fetchCurrentItem();
    }
  }, [itemId, fetchCurrentItem]);

  return (
    <Modal isOpen={isOpen} scrollBehavior='inside' onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent mx={3}>
        <ModalHeader>{itemName}</ModalHeader>
        <ModalCloseButton />
        {item && (
          <ModalBody>
            <Card>
              <CardBody>
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  Title in view
                </Text>
              </CardBody>
            </Card>
            <HStack py={1}>
              <Flex mr='8' justify={"center"} align={"baseline"}>
                <Button
                  isDisabled={likeLoading}
                  onClick={likeUnlikeItem}
                  variant={"unstyled"}
                  size={"sm"}
                  color={item.likes.includes(user.id) ? "blue.400" : ""}
                >
                  {item.likes.includes(user.id) ? "Liked" : "Like"}
                </Button>
                &nbsp;
                <Text color='blue.400' fontSize={"sm"}>
                  {item.likes.length || null}
                </Text>
              </Flex>
              <Flex justify={"center"}>
                <Button size={"sm"} variant={"unstyled"} onClick={onToggle}>
                  Comments
                </Button>
              </Flex>
            </HStack>
            <Collapse in={isCollapsed} animateOpacity>
              <Box
                p='40px'
                color='white'
                bg='teal.500'
                rounded='md'
                shadow='md'
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam,
                sapiente!
              </Box>
            </Collapse>
          </ModalBody>
        )}

        <ModalFooter>
          <Textarea />
          <Button>Comment</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
