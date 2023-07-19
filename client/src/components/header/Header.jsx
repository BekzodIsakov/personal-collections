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
  Select,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Navigation from "./Navigations/Navigation";
import { useAuth } from "../../providers/authProvider";
import { useUserSignOut } from "../../hooks/user";
import SVG from "../SVG";
import React from "react";
import { useI18n } from "../../providers/i18nProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = React.useState("");

  const { loading, onSignOut } = useUserSignOut();

  const { token, user, setToken } = useAuth();

  const { languages, selectedLanguage, setSelectedLanguage } = useI18n();

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    onSignOut();
    navigate("/");
    setToken(null);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  const initialRef = React.useRef(null);

  return (
    <Box
      position={"sticky"}
      zIndex={"docked"}
      top={0}
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Flex h={14} px={4} alignItems={"center"} justifyContent='space-between'>
        <Navigation />

        <HStack alignItems='center' h='40%'>
          <Select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            ml={15}
            size={"sm"}
            display={{ base: "none", xs: "block" }}
            variant={"filled"}
            rounded={"md"}
          >
            {Object.values(languages).map((language) => (
              <option key={language}>{language}</option>
            ))}
          </Select>

          <IconButton
            onClick={toggleColorMode}
            variant={"ghost"}
            size={"sm"}
            icon={
              colorMode === "light" ? (
                <SVG iconId={"moon"} />
              ) : (
                <SVG iconId={"sun"} size={"22px"} />
              )
            }
          />

          <IconButton
            icon={<SVG iconId={"search"} />}
            variant={"ghost"}
            size={"sm"}
            onClick={onOpen}
            aria-label='Search database'
            title={"Search"}
            _hover={{ bg: "transparent" }}
            mr={2}
          />
          {token ? (
            <>
              <HStack>
                <Avatar name={user.name} src='' size='xs' />
                <Text
                  whiteSpace='nowrap'
                  display={{ base: "none", md: "block" }}
                >
                  {user.name}
                </Text>
              </HStack>
              <Divider
                orientation='vertical'
                variant='solid'
                borderColor='gray.400'
                mx={2}
              />
              <Button
                isLoading={loading}
                loadingText={"Sign out"}
                variant={"ghost"}
                colorScheme={"red"}
                size={"sm"}
                onClick={handleSignOut}
                px={{ base: "2px", xs: "12px" }}
                minW={"max-content"}
              >
                Sign out
              </Button>
            </>
          ) : (
            <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              <Link to='/signin'>Sign in</Link>
            </Button>
          )}
        </HStack>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent mx={3}>
          <ModalHeader>Search items</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <InputGroup>
              <Input
                ref={initialRef}
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
    </Box>
  );
};

export default Header;
