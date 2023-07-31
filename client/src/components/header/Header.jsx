import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Navigation from "./Navigations/Navigation";
import { useAuth } from "../../providers/authProvider";
import { useUserSignOut } from "../../hooks/user";
import SVG from "../SVG";
import { useI18n } from "../../providers/i18nProvider";
import { useNavigate } from "react-router-dom";
import SearchItemModal from "../SearchItemModal";
import translations from "../../utils/translations";
import LanguageSelect from "../LanguageSelect";
import ColorModeSwitch from "../ColorModeSwitch";

const Header = () => {
  const { loading, signOut } = useUserSignOut();

  const { token, user, setToken, setUser } = useAuth();

  const { selectedLanguage } = useI18n();

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    setToken(null);
    setUser(null);
  };

  return (
    <Box
      position={"sticky"}
      zIndex={"docked"}
      top='0'
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Flex h={14} px={4} alignItems={"center"} justifyContent='space-between'>
        <Navigation />

        <HStack alignItems='center' h='40%'>
          <LanguageSelect />
          <ColorModeSwitch />

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
                {translations[selectedLanguage]?.auth.signout}
              </Button>
            </>
          ) : (
            <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              <Link to='/signin'>
                {translations[selectedLanguage]?.auth.signin}
              </Link>
            </Button>
          )}
        </HStack>
      </Flex>

      {isOpen && (
        <SearchItemModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      )}
    </Box>
  );
};

export default Header;
