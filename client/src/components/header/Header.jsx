import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  useDisclosure,
  useColorModeValue,
  Button,
  Divider,
} from "@chakra-ui/react";
import { X, Menu } from "lucide-react";

import {
  ColorSwitch,
  SearchModal,
  SearchButton,
  LanguageSelect,
} from "@/components";
import Persona from "../Persona";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../providers/authProvider";
import { NavLink } from "react-router-dom";
import { Boxes } from "lucide-react";
import { useNavData } from "./Navigations/navData";
import { useRef } from "react";
import ChakraDrawer from "../Drawer";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const { token } = useAuth();
  const { t } = useTranslation();
  const { navData } = useNavData();
  const drawerBtnRef = useRef();

  return (
    <Box
      position='sticky'
      zIndex='docked'
      top='0'
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.900")}
      px={{ base: "3", md: "8" }}
      py='2'
    >
      <Box maxW={1200} mx={"auto"}>
        <Flex alignItems='center' justifyContent='space-between' gap={8}>
          <HStack gap={33}>
            <ChakraLink
              as={NavLink}
              to={"/"}
              color={"inherit"}
              border={"2px solid gray"}
              borderRadius={"md"}
              p={1}
            >
              <Boxes size={35} fill='black' strokeWidth={1.1} color='white' />
            </ChakraLink>

            <HStack gap={25} display={{ base: "none", sm2: "flex" }}>
              {navData.map((link, index) => (
                <ChakraLink
                  key={index}
                  as={NavLink}
                  to={link.to}
                  _activeLink={{ textDecoration: "underline" }}
                >
                  {link.label}
                </ChakraLink>
              ))}
            </HStack>
          </HStack>

          <HStack gap={{ base: "12px", xs: "20px" }}>
            <HStack gap={{ base: "8px", md: "12px" }}>
              {token ? (
                <Persona />
              ) : (
                <Button
                  as={NavLink}
                  whiteSpace={"nowrap"}
                  variant={"outline"}
                  to='/signin'
                >
                  {t("auth.signIn")}
                </Button>
              )}
            </HStack>
          </HStack>
        </Flex>

        <Divider my={3} display={{ base: "block", sm2: "block" }} />

        <HStack justifyContent={"space-between"}>
          <Button
            ref={drawerBtnRef}
            onClick={onDrawerOpen}
            display={{ base: "initial", sm2: "none" }}
          >
            {isDrawerOpen ? <X /> : <Menu />}
          </Button>
          <ChakraDrawer
            isOpen={isDrawerOpen}
            onClose={onDrawerClose}
            drawerBtnRef={drawerBtnRef}
            onSearchBarOpen={onOpen}
          />

          <HStack gap={{ base: "8px", md: "12px" }}>
            <LanguageSelect />
            <ColorSwitch />
            <SearchButton onOpen={onOpen} />
          </HStack>
        </HStack>

        {isOpen && (
          <SearchModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
        )}
      </Box>
    </Box>
  );
};

export default Header;
