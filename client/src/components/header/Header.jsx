import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import DesktopNav from "./Navigations/DesktopNav";
import MobileNav from "./Navigations/MobileNav";
import navItems from "./Navigations/navData";
import Navigation from "./Navigations/Navigation";

const Header = () => {
  const { currentUser } = useSelector((state) => state.usersReducer);
  return (
    <Box
      position={"sticky"}
      top={0}
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Flex h={14} px={4} alignItems={"center"} justifyContent='space-between'>
        <Navigation />

        {currentUser.data ? (
          <HStack alignItems='center' h='40%'>
            <HStack mr={3}>
              <Avatar name={currentUser.data.name} src='' size='xs' />
              <Text whiteSpace='nowrap' display={{ base: "none", md: "block" }}>
                {currentUser.data.name}
              </Text>
            </HStack>
            <Divider
              orientation='vertical'
              variant='solid'
              borderColor='gray.400'
            />
            <Button variant={"ghost"} colorScheme={"red"} size={"sm"}>
              Sign out
            </Button>
          </HStack>
        ) : (
          <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
            <Link to='/signin'>Sign in</Link>
          </Button>
          // <CustomLink>Sign in</CustomLink>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
