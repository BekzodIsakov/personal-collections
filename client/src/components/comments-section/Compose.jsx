import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import SVG from "../SVG";
import { useAutoSizeTextarea } from "../../hooks/useAutoSizeTextarea";

const Compose = ({ src, name, onSend, sending, comment, setComment }) => {
  const textAreaRef = React.useRef(null);

  useAutoSizeTextarea(textAreaRef.current, comment);

  const bgColor = useColorModeValue("gray.200", "gray.600");

  return (
    <HStack alignItems='flex-start' width='100%'>
      <Avatar src={src} name={name} size='sm' />
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            p='1'
            border='none'
            fontSize='sm'
            resize='none'
            ref={textAreaRef}
            rows='1'
            placeholder='Comment'
          ></Textarea>
          <Flex justifyContent='flex-end'>
            <IconButton
              onClick={onSend}
              isDisabled={sending}
              variant='unstyled'
              icon={<SVG iconId='send' color='#3182ce' />}
              display='flex'
              justifyContent='center'
              height='30px'
            ></IconButton>
          </Flex>
        </Box>
      </VStack>
    </HStack>
  );
};

export default Compose;
