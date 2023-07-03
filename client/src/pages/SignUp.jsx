import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  Link,
  Text,
} from "@chakra-ui/react";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../store/slices/usersSlice";
import { useAuth } from "../provider/authProvider";

const SignUp = () => {
  const currentUser = useSelector((state) => state.usersReducer.currentUser);
  const dispatch = useDispatch();

  const { setToken } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handlePasswordShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ name, email, password }));
  };

  console.log({ currentUser });

  React.useEffect(() => {
    if (currentUser.data) {
      setToken(currentUser.data.token);
      navigate("/", { replace: true });
    }
  }, [currentUser, setToken, navigate]);

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl'>Create your account</Heading>
        </Stack>

        <Box
          rounded='lg'
          bg={useColorModeValue("white", "gray.700")}
          boxShadow='lg'
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id='name'>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button size='sm' onClick={handlePasswordShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={1}>
                {/*<Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
                >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>*/}
                <Text color={"tomato"} fontSize={"sm"}>
                  {currentUser.error}
                </Text>
                <Button
                  type='submit'
                  isLoading={currentUser.status === "pending"}
                  loadingText='Submitting'
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Box color='gray.500'>
          Already have an account?&nbsp;&nbsp;
          {/* <RouterLink to='/signin' color={"blue.400"} fontWeight='bold'>
            Sign in
          </RouterLink> */}
          <Link
            as={RouterLink}
            to='/signin'
            color={"blue.400"}
            fontWeight='bold'
          >
            Sign in
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
