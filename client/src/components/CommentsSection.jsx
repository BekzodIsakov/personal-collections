import React from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Link,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../providers/authProvider";
import { useTranslation } from "react-i18next";
import { useFetchComments, useSendComment } from "../hooks/comments";

const CommentsSection = ({ itemId }) => {
  const [comment, setComment] = React.useState("");

  const { token, user } = useAuth();

  const { fetchComments, comments, setComments } = useFetchComments();
  const { result, sendComment, loading: sendingComment } = useSendComment();
  console.log({ comments });

  const { t } = useTranslation();

  const commentsSectionBg = useColorModeValue("gray.50", "gray.700");
  const commentTextBg = useColorModeValue("gray.200", "gray.600");
  const commentTextColor = useColorModeValue("black", "gray.50");

  React.useEffect(() => {
    fetchComments(itemId);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      fetchComments(itemId);
    }, 4500);

    return () => {
      clearInterval(intervalId);
    };
  }, [itemId]);

  React.useEffect(() => {
    if (result) {
      const updatedComments = [...comments];
      updatedComments.push(result);
      setComments(updatedComments);
      setComment("");
    }
  }, [result]);

  function handleSendComment() {
    sendComment(itemId, comment);
  }

  return (
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
              isLoading={sendingComment}
              onClick={handleSendComment}
            >
              {t("global.send")}
            </Button>
          </HStack>
        ) : (
          <Box>
            <Text fontWeight='medium'>{t("global.loginToComment")}</Text> &nbsp;
            <Link href='/signin' color='blue.400'>
              {t("global.signIn")}
            </Link>{" "}
            |{" "}
            <Link href='/signup' color='blue.400'>
              {t("global.signUp")}
            </Link>
          </Box>
        )}
      </Box>
      <VStack spacing='3' align='stretch' rounded='md'>
        {comments.length ? (
          comments.map((c) => (
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
          <Text fontSize='sm'>{t("global.noComments")}</Text>
        )}
      </VStack>
    </Box>
  );
};

export default CommentsSection;
