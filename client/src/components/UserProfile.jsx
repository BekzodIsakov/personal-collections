import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Divider, HStack, Text } from "@chakra-ui/react";
import { Link } from "@/components";
import { useAuth } from "@/providers/authProvider";
import { useUserSignOut } from "@/hooks/user";

const UserProfile = () => {
  const { token, setToken, user, setUser } = useAuth();

  const navigate = useNavigate();

  const { loading, signOut } = useUserSignOut();

  const { t } = useTranslation();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    setToken(null);
    setUser(null);
  };

  return (
    <>
      {token ? (
        <>
          <HStack>
            <Avatar name={user.name} src='' size='xs' />
            <Text whiteSpace='nowrap' display={{ base: "none", md: "block" }}>
              {user.name}
            </Text>
          </HStack>
          <Divider
            orientation='vertical'
            variant='solid'
            borderColor='gray.400'
            mx='2'
          />
          <Button
            onClick={handleSignOut}
            isLoading={loading}
            loadingText='Sign out'
            colorScheme='red'
            size='sm'
            variant='ghost'
            minW='max-content'
          >
            {t("auth.signOut")}
          </Button>
        </>
      ) : (
        <Button variant='link' colorScheme='blue' size='sm'>
          <Link to='/signin'>{t("auth.signIn")}</Link>
        </Button>
      )}
    </>
  );
};

export default UserProfile;
