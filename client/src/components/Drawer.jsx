import { useRef } from "react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack,
  Link as ChakraLink,
  Avatar,
} from "@chakra-ui/react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { SearchIcon } from "lucide-react";

import ColorSwitch from "./ColorSwitch";
import LanguageSelect from "./LanguageSelect";

import { useAuth } from "../providers/authProvider";
import { useNavData } from "./header/Navigations/navData";
import { useUserSignOut } from "../hooks/user";
import { useTranslation } from "react-i18next";

const ChakraDrawer = ({
  isOpen,
  onClose,
  drawerBtnRef,
  onSearchBarOpen,
  ...props
}) => {
  const drawerContainerRef = useRef(null);
  const { user, setToken, setUser } = useAuth();
  const { loading, navData } = useNavData();
  const navigate = useNavigate();

  const { signOut } = useUserSignOut();

  const { t } = useTranslation();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    setToken(null);
    setUser(null);
  };

  return (
    <div ref={drawerContainerRef}>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={drawerBtnRef}
        portalProps={{ containerRef: drawerContainerRef }} // This disables the portal
        {...props}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mb={4}>
            {user ? (
              <VStack gap={4} alignItems={"flex-start"}>
                <Avatar name={user.name} />

                <VStack gap={0} alignItems={"flex-start"}>
                  <Text fontWeight='medium'>{user.name}</Text>
                  <Text color='gray.500' fontSize='md'>
                    {/* {user.email} */}
                    john.mason@example.com
                  </Text>
                </VStack>
              </VStack>
            ) : (
              <ChakraLink
                as={Link}
                whiteSpace={"nowrap"}
                variant={""}
                to='/signin'
              >
                {t("auth.signIn")}
              </ChakraLink>
            )}
          </DrawerHeader>

          <DrawerBody>
            <VStack>
              {navData.map((link, index) => (
                <ChakraLink
                  key={index}
                  as={NavLink}
                  to={link.to}
                  _activeLink={{ backgroundColor: "blue.100" }}
                  _hover={{ backgroundColor: "blue.100" }}
                  backgroundColor={"blue.50"}
                  py={2}
                  px={4}
                  borderRadius={"md"}
                  width={"100%"}
                  onClick={onClose}
                >
                  {link.label}
                </ChakraLink>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack align={"right"} alignItems={"flex-end"}>
              {/* <ColorSwitch />

              <Button
                leftIcon={<SearchIcon />}
                variant='solid'
                onClick={onSearchBarOpen}
              >
                Search
              </Button>

              <LanguageSelect /> */}
              {user && (
                <Button
                  onClick={handleSignOut}
                  isLoading={loading}
                  loadingText={t("auth.signOut")}
                  colorScheme='red'
                  variant='outline'
                >
                  {t("auth.signOut")}
                </Button>
              )}
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChakraDrawer;
