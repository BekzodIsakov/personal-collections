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

  function joinUser() {
    socket.emit("join", { userId: user.id, roomId: itemId });
  }

  React.useEffect(() => {
    socket.connect();

    socket.on("connect", joinUser);
    socket.on("comment", handleReceivedComment);

    return () => {
      socket.disconnect();
      socket.off("connect", joinUser);
      socket.off("comment", handleReceivedComment);
    };
  }, []);

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
