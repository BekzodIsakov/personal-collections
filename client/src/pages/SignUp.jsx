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
  Select,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../providers/authProvider";
import { useUserSignUp } from "../hooks/user";
import { useI18n } from "../providers/i18nProvider";
import translations from "../utils/translations";

const SignUp = () => {
  const { data, loading, errorMessage, onSignUp } = useUserSignUp();

  const { setToken, setUser } = useAuth();
  const { selectedLanguage, setSelectedLanguage, languages } = useI18n();

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
    onSignUp({ name, email, password });
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
      <Stack spacing='8' mx='auto' maxW='lg' py='12' px='6'>
        <Stack align='center'>
          <Heading fontSize='4xl'>
            {translations[selectedLanguage]?.auth.mainHeadings.signup}
          </Heading>
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
                <FormLabel>
                  {translations[selectedLanguage]?.auth.name}
                </FormLabel>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id='email'>
                <FormLabel>
                  {translations[selectedLanguage]?.auth.emailAddress}
                </FormLabel>
                <Input
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>
                  {translations[selectedLanguage]?.auth.password}
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button size='sm' onClick={handlePasswordShowClick}>
                      {showPassword
                        ? translations[selectedLanguage]?.general.hide
                        : translations[selectedLanguage]?.general.show}
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
                  {translations[selectedLanguage]?.auth.signup}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Box color='gray.500'>
          {translations[selectedLanguage]?.auth.noAccountYet}&nbsp;&nbsp;
          <Link as={RouterLink} to='/signin' color='blue.400' fontWeight='bold'>
            {translations[selectedLanguage]?.auth.signin}
          </Link>
        </Box>

        <Box pos='fixed' right='12' bottom='12'>
          <Select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            ml='15'
            size='sm'
            display={{ base: "none", xs: "block" }}
            variant='filled'
            rounded='md'
          >
            {Object.values(languages).map((language) => (
              <option key={language}>{language}</option>
            ))}
          </Select>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
