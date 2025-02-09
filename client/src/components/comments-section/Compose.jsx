import React from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import SVG from "../SVG";
import { useAutoSizeTextarea } from "@/hooks/useAutoSizeTextarea";

const Compose = ({
  src,
  name,
  comment,
  setComment,
  loading,
  onSend,
  editMode,
  turnOffEditMode,
}) => {
  const textAreaRef = React.useRef(null);

  useAutoSizeTextarea(textAreaRef.current, comment);

  const bgColor = useColorModeValue("gray.200", "gray.600");
  const textAreaBgColor = useColorModeValue("whiteAlpha.700", "whiteAlpha.400");

  return (
    <HStack alignItems='flex-start' width='100%'>
      {!editMode && <Avatar src={src} name={name} size='sm' />}
      <VStack
        spacing='0'
        bg={bgColor}
        rounded='2xl'
        px='3'
        py='2'
        alignItems='flex-start'
        fontSize='sm'
        flexGrow='1'
      >
        <Box lineHeight='1.4' width='100%'>
          <Textarea
            autoFocus
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            p='1'
            border='none'
            fontSize='sm'
            resize='none'
            ref={textAreaRef}
            rows='2'
            placeholder='Comment'
            bg={textAreaBgColor}
          ></Textarea>
          <HStack justifyContent='flex-end'>
            {editMode && (
              <Button
                mt='1'
                variant={editMode ? "solid" : "unstyled"}
                size={editMode ? "xs" : "md"}
                isDisabled={loading || !comment}
                display='flex'
                justifyContent='center'
                height='30px'
                onClick={turnOffEditMode}
              >
                Cancel
              </Button>
            )}
            <Button
              mt='1'
              variant={editMode ? "solid" : "unstyled"}
              size={editMode ? "xs" : "md"}
              isDisabled={loading || !comment}
              display='flex'
              justifyContent='center'
              height='30px'
              onClick={onSend}
              color='blue.400'
            >
              {editMode ? (
                <Text fontSize='12px' fontWeight='semibold'>
                  Done
                </Text>
              ) : (
                <SVG iconId='send' color='#3182ce' />
              )}
            </Button>
          </HStack>
        </Box>
      </VStack>
    </HStack>
  );
};

export default Compose;
