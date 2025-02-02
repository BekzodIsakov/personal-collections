import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  // useColorModeValue,
  useDisclosure,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { X, Menu } from "lucide-react";

import {
  ColorSwitch,
  SearchModal,
  SearchButton,
  LanguageSelect,
} from "@/components";
import Persona from "../Persona";
// import Navigation from "./Navigations/Navigation";
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
    >
      <Flex
        px={{ base: "2", md: "8" }}
        py='2'
        alignItems='center'
        justifyContent='space-between'
        gap={8}
      >
        <HStack gap={33}>
          <ChakraLink
            as={NavLink}
            to={"/"}
            color={"inherit"}
            backgroundColor={"blue.400"}
            borderRadius={"md"}
            p={1}
          >
            <Boxes size={30} strokeWidth={1.1} color='white' />
          </ChakraLink>
          {/* <Navigation /> */}

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
          <HStack gap={{ base: "5px", xs: "8px", md: "12px" }}>
            <LanguageSelect display={{ base: "none", sm2: "flex" }} />
            <ColorSwitch />
            <SearchButton onOpen={onOpen} />
          </HStack>

          {token ? (
            <Persona />
          ) : (
            <ChakraLink
              as={NavLink}
              whiteSpace={"nowrap"}
              variant={""}
              to='/signin'
            >
              {t("auth.signIn")}
            </ChakraLink>
          )}

          <Box display={{ sm2: "none" }}>
            <Button ref={drawerBtnRef} onClick={onDrawerOpen}>
              {isDrawerOpen ? <X /> : <Menu />}
            </Button>
            <ChakraDrawer
              isOpen={isDrawerOpen}
              onClose={onDrawerClose}
              drawerBtnRef={drawerBtnRef}
              onSearchBarOpen={onOpen}
            />
          </Box>
        </HStack>
      </Flex>

      {isOpen && (
        <SearchModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      )}
    </Box>
  );
};

export default Header;
