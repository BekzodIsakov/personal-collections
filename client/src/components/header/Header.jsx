import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Navigation from "./Navigations/Navigation";
import { useAuth } from "../../provider/authProvider";
import { useUserSignOut } from "../../hooks/user";

const Header = () => {
  const { loading, onSignOut } = useUserSignOut();

  const { token, user, setToken } = useAuth();

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
          // <CustomLink>Sign in</CustomLink>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
