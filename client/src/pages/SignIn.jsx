import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
  Text,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";

import { useAuth } from "@/providers/authProvider";
import { useUserSignIn } from "@/hooks/user";
import { LanguageSelect, ThemeSwitcher } from "@/components";
import useForm from "@/hooks/useForm";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, handleChange] = useForm({ email: "", password: "" });
  const { setToken, setUser } = useAuth();
  const { data, loading, errorMessage, onSignIn } = useUserSignIn();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { email, password } = values;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn({ email: values.email, password: values.password });
  };

  useEffect(() => {
    if (data) {
      setToken(data.token);
      setUser({
        name: data.user.name,
        isAdmin: data.user.isAdmin,
        id: data.user._id,
      });
      navigate("/", { replace: true });
    }
  }, [data, setToken, setUser, navigate]);

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx='auto'
        width={{ base: "100%", twSM: "450px" }}
        py={12}
        px={6}
      >
        <Heading as={"h1"} fontSize='4xl' textAlign={"center"}>
          {t("auth.headings.login")}
        </Heading>

        <Box
          rounded='md'
          bg={useColorModeValue("white", "gray.700")}
          boxShadow='lg'
          px={{ base: 6, twSM: 8 }}
          py={{ base: 8, twSM: 10 }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id='email'>
                <FormLabel>{t("auth.emailAddress")}</FormLabel>
                <Input
                  type='email'
                  required
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>{t("auth.password")}</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                  />
                  <InputRightElement mr={1}>
                    <Button size='sm' onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={3}>
                <Text color='red.400'>{errorMessage}</Text>
                <Button
                  type='submit'
                  isLoading={loading}
                  loadingText='Submitting'
                  colorScheme='blue'
                >
                  {t("auth.login")}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Text>
          {t("auth.hasNoAccount?")}&nbsp;&nbsp;
          <ChakraLink as={RouterLink} to='/signup'>
            {t("auth.register")}
          </ChakraLink>{" "}
          |{" "}
          <ChakraLink as={RouterLink} to='/'>
            {t("nav.mainPage")}
          </ChakraLink>
        </Text>

        <HStack pos='fixed' right='12' bottom='12'>
          <LanguageSelect />
          <ThemeSwitcher />
        </HStack>
      </Stack>
    </Flex>
  );
};

export default SignIn;
