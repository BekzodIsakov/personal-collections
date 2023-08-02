import React from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  HStack,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import SVG from "../components/SVG";
import { useItemFetch } from "../hooks/items";
import { useAuth } from "../providers/authProvider";
import CommentsSection from "../components/CommentsSection";

const ItemPage = () => {
  const [likeLoading, setLikeLoading] = React.useState(false);

  const { isOpen: isCollapsed, onToggle } = useDisclosure();
  const toast = useToast();
  const toastBgColor = useColorModeValue("white", "gray.800");

  const { t } = useTranslation();
  const { itemId } = useParams();

  const { user } = useAuth();

  const { loading, item, onItemFetch, updateItem } = useItemFetch();

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
                <Text as='b'>{t("global.author")}</Text> - {item.author.name}
              </ListItem>
              {JSON.parse(item.optionalFields).map((field, index) => (
                <ListItem key={index}>
                  <Text as='b'>{field.name}</Text> - {field.value}
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
            size={"sm"}
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

  return <Box>{modalContent}</Box>;
};

export default ItemPage;
