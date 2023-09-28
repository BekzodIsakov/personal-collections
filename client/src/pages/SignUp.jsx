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

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useAuth } from "../providers/authProvider";
import { useUserSignUp } from "../hooks/user";
import LanguageSelect from "../components/LanguageSelect";
import { useTranslation } from "react-i18next";
import useForm from "../hooks/useForm";

const SignUp = () => {
  const { data, loading, errorMessage, onSignUp } = useUserSignUp();

  const { setToken, setUser } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const [values, handleChange] = useForm({ name: "", email: "", password: "" });

  const handlePasswordShowClick = () => {
    setShowPassword(!showPassword);
  };

  const { name, email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({
      name,
      email,
      password,
    });
  };

  React.useEffect(() => {
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
        spacing='8'
        mx='auto'
        width={{ base: "100%", sm: "430px" }}
        py='12'
        px='6'
      >
        <Stack align='center'>
          <Heading fontSize='4xl'>{t("auth.headings.signUp")}</Heading>
        </Stack>

        <Box
          rounded='lg'
          bg={useColorModeValue("white", "gray.700")}
          boxShadow='lg'
          p='8'
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing='4'>
              <FormControl id='name'>
                <FormLabel>{t("auth.name")}</FormLabel>
                <Input
                  required
                  name='name'
                  value={name}
                  onChange={handleChange}
                />
              </FormControl>
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
                  <InputRightElement mr='1'>
                    <Button size='sm' onClick={handlePasswordShowClick}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={1}>
                <Text color='tomato' fontSize='sm'>
                  {errorMessage}
                </Text>
                <Button
                  type='submit'
                  isLoading={loading}
                  loadingText='Submitting'
                  bg='blue.400'
                  color='white'
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  {t("auth.signUp")}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Box color='gray.500'>
          {t("auth.noAccountYet?")}&nbsp;&nbsp;
          <Link as={RouterLink} to='/signin' color='blue.400' fontWeight='bold'>
            {t("auth.signIn")}
          </Link>
        </Box>

        <Box pos='fixed' right='12' bottom='12'>
          <LanguageSelect />
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
