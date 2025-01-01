import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  // useColorModeValue,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ColorSwitch,
  SearchModal,
  SearchButton,
  LanguageSelect,
} from "@/components";
import Persona from "../Persona";
import Navigation from "./Navigations/Navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../providers/authProvider";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useAuth();
  const { t } = useTranslation();

  return (
    <Box
      position='sticky'
      zIndex='docked'
      top='0'
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Flex
        px={{ base: "2", sm: "4", md: "8" }}
        py='2'
        alignItems='center'
        justifyContent='space-between'
      >
        <Navigation />

        <HStack gap={{ base: "12px", xs: "20px" }}>
          <HStack gap={{base: "5px", xs: "8px", md:"12px"}}>
            <LanguageSelect />
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
        </HStack>
      </Flex>

      {isOpen && (
        <SearchModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      )}
    </Box>
  );
};

export default Header;
