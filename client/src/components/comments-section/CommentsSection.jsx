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
import Comment from "./Comment";
import Compose from "./Compose";

import { socket } from "../../socket";

const CommentsSection = ({ itemId, comments, setComments }) => {
  const { token, user } = useAuth();

  const { t } = useTranslation();
  const commentsSectionBg = useColorModeValue("gray.50", "gray.700");

  function handleReceivedComment(newComment) {
    setComments((prevComments) => [...prevComments, newComment]);
  }

  const [comment, setComment] = React.useState("");
  const [sendingComment, setSendingComment] = React.useState(false);

  function handleSendComment() {
    setSendingComment(true);
    socket.emit("comment", comment, () => {
      setSendingComment(false);
      setComment("");
    });
  }

  function handleEditComment({ commentId, content }) {
    const _comments = comments.map((comment) => {
      if (comment._id === commentId) {
        return {
          ...comment,
          content,
        };
      }

      return comment;
    });

    setComments(_comments);
  }

  function handleDeleteComment(commentId) {
    const _comments = comments.filter((c) => c._id !== commentId);
    setComments(_comments);
  }

  function joinUser() {
    socket.emit("join", { userId: user.id, roomId: itemId });
  }

  function handleLikeUnlikeItem({ commentId, likes }) {
    const _comments = comments.map((comment) => {
      if (comment._id === commentId) {
        comment.likes = likes;
      }

      return comment;
    });

    setComments(_comments);
  }

  React.useEffect(() => {
    socket.connect();

    socket.on("connect", joinUser);
    socket.on("comment", handleReceivedComment);
    socket.on("editComment", handleEditComment);
    socket.on("deleteComment", handleDeleteComment);
    socket.on("likeUnlikeItem", handleLikeUnlikeItem);

    return () => {
      socket.disconnect();
      socket.off("connect", joinUser);
      socket.off("comment", handleReceivedComment);
      socket.off("editComment", handleEditComment);
      socket.off("editComment", handleDeleteComment);
      socket.off("likeUnlikeItem", handleLikeUnlikeItem);
    };
  }, []);

  console.log({ comments });

  return (
    <Box p='3' pt='5' bg={commentsSectionBg} rounded='md'>
      <Box mb='4'>
        {token ? (
          <HStack align='start'>
            <Compose
              name={user?.name}
              comment={comment}
              setComment={setComment}
              onSend={handleSendComment}
              loading={sendingComment}
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
            <Comment
              key={c._id}
              commentId={c._id}
              name={c.author?.name}
              comment={c.content}
              authorId={c.author?._id}
              likes={c.likes}
              date={c.createdAt}
              setComments={setComments}
              comments={comments}
            />
          ))
        ) : (
          <Text fontSize='sm'>{t("global.noComments")}</Text>
        )}
      </VStack>
    </Box>
  );
};

export default CommentsSection;
