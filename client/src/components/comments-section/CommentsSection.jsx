import React from "react";
import {
  Box,
  HStack,
  Link,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../../providers/authProvider";
import { useTranslation } from "react-i18next";
import { useFetchComments, useSendComment } from "../../hooks/comments";
import Comment from "./Comment";
import Compose from "./Compose";

const CommentsSection = ({ itemId }) => {
  const [comment, setComment] = React.useState();

  const { token, user } = useAuth();

  const { fetchComments, comments, setComments } = useFetchComments();
  const { result, sendComment, loading: sendingComment } = useSendComment();

  const { t } = useTranslation();

  const commentsSectionBg = useColorModeValue("gray.50", "gray.700");

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
            <Compose
              name={user?.name}
              onSend={handleSendComment}
              comment={comment}
              setComment={setComment}
              sending={sendingComment}
            />
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
      <VStack spacing='3' align='stretch' rounded='md' mb='5'>
        {comments.length ? (
          comments.map((c) => (
            <Comment key={c._id} name={c.author?.name} comment={c.comment} />
          ))
        ) : (
          <Text fontSize='sm'>{t("global.noComments")}</Text>
        )}
      </VStack>
    </Box>
  );
};

export default CommentsSection;
