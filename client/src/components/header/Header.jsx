import { useDispatch, useSelector } from "react-redux";
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
import { signOutUser } from "../../store/slices/usersSlice";
import { useAuth } from "../../provider/authProvider";

const Header = () => {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const { setToken } = useAuth();

  const handleSignOut = () => {
    dispatch(signOutUser());
    setToken(null);
  };

  return (
    <Box
      position={"sticky"}
      top={0}
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Flex h={14} px={4} alignItems={"center"} justifyContent='space-between'>
        {currentUser.data ? <Navigation /> : <div></div>}

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
            <Button
              isLoading={currentUser.status === "pending"}
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
