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
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/providers/authProvider";
import { useUserSignIn } from "@/hooks/user";
import LanguageSelect from "@/components/LanguageSelect";
import useForm from "@/hooks/useForm";
import Link from "@/components/Link";

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [values, handleChange] = useForm({ email: "", password: "" });

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { setToken, setUser } = useAuth();
  const { data, loading, errorMessage, onSignIn } = useUserSignIn();

  const handlePasswordShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn({ email: values.email, password: values.password });
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
        spacing={8}
        mx='auto'
        width={{ base: "100%", sm: "430px" }}
        py='12'
        px='6'
      >
        <Stack align='center'>
          <Heading fontSize='4xl'>{t("auth.headings.signIn")}</Heading>
        </Stack>

        <Box
          p={8}
          rounded='lg'
          boxShadow='lg'
          bg={useColorModeValue("white", "gray.700")}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>{t("auth.emailAddress")}</FormLabel>
                <Input
                  type='email'
                  required
                  name='email'
                  value={values.email}
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
                    value={values.password}
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
                <Text color={"tomato"} fontSize={"sm"}>
                  {errorMessage}
                </Text>
                <Button
                  isLoading={loading}
                  loadingText='Submitting'
                  type='submit'
                  colorScheme='telegram'
                >
                  {t("auth.signIn")}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Box color='gray.500'>
          {t("auth.noAccountYet?")}&nbsp;&nbsp;
          <Link to='/signup' color='blue.500'>
            {t("auth.signUp")}
          </Link>
        </Box>
      </Stack>

      <Box pos='fixed' right='12' bottom='12'>
        <LanguageSelect />
      </Box>
    </Flex>
  );
};

export default SignIn;
