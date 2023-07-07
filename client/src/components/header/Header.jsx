import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Navigation from "./Navigations/Navigation";
import { useAuth } from "../../provider/authProvider";
import { useUserSignOut } from "../../hooks/user";
import SVG from "../SVG";
import React from "react";

const Header = () => {
  const [searchText, setSearchText] = React.useState("");

  const { loading, onSignOut } = useUserSignOut();

  const { token, user, setToken } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    onSignOut();
    setToken(null);
  };

  return (
    <Box
      position={"sticky"}
      zIndex={"docked"}
      top={0}
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Flex h={14} px={4} alignItems={"center"} justifyContent='space-between'>
        {token ? <Navigation /> : <div></div>}

        <IconButton
          icon={<SVG iconId={"search"} size={"20px"} />}
          variant={"ghost"}
          size={"sm"}
          onClick={onOpen}
          aria-label='Search database'
          title={"Search"}
          _hover={{ bg: "transparent" }}
        />

        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
          <ModalOverlay />
          <ModalContent mx={3}>
            <ModalHeader>Search items</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={5}>
              <InputGroup>
                <Input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    onClick={onOpen}
                    aria-label='Search database'
                    size={"sm"}
                    isLoading={false}
                    isDisabled={searchText.length < 2}
                    title={"Search"}
                    icon={<SVG iconId={"search"} size={"20px"} />}
                    colorScheme={"blue"}
                  />
                </InputRightElement>
              </InputGroup>
            </ModalBody>
          </ModalContent>
        </Modal>

        {token ? (
          <HStack alignItems='center' h='40%'>
            <HStack mr={3}>
              <Avatar name={user.name} src='' size='xs' />
              <Text whiteSpace='nowrap' display={{ base: "none", md: "block" }}>
                {user.name}
              </Text>
            </HStack>
            <Divider
              orientation='vertical'
              variant='solid'
              borderColor='gray.400'
            />
            <Button
              isLoading={loading}
              loadingText={"Sign out"}
              variant={"ghost"}
              colorScheme={"red"}
              size={"sm"}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </HStack>
        ) : (
          <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
            <Link to='/signin'>Sign in</Link>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
