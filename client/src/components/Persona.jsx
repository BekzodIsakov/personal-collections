import {
  Avatar,
  HStack,
  Text,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverFooter,
} from "@chakra-ui/react";
import { useAuth } from "@/providers/authProvider";
import { useNavigate } from "react-router-dom";
import { useUserSignOut } from "../hooks/user";
import { useTranslation } from "react-i18next";

const Persona = () => {
  const { setToken, setUser, user } = useAuth();
  const { loading, signOut } = useUserSignOut();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    setToken(null);
    setUser(null);
  };

  return (
    <Popover placement='bottom-end' gutter={14}>
      <PopoverTrigger>
        <HStack cursor={"pointer"}>
          <Text
            fontWeight={"medium"}
            whiteSpace='nowrap'
            display={{ base: "none", sm: "block" }}
          >
            {user.name}
          </Text>
          <Avatar name={user.name} size='sm' />
        </HStack>
      </PopoverTrigger>

      <PopoverContent width={"max-content"}>
        <PopoverBody>
          <HStack key={user.email} gap='4' justify={"end"}>
            <Stack gap='0'>
              <Text fontWeight='medium'>{user.name}</Text>
              <Text color='fg.muted' textStyle='sm'>
                {/* {user.email} */}
                john.mason@example.com
              </Text>
            </Stack>
            <Avatar name={user.name} size='md' src={user.avatar} />
          </HStack>
        </PopoverBody>
        <PopoverFooter>
          <Stack align={"end"}>
            <Button
              onClick={handleSignOut}
              isLoading={loading}
              loadingText={t("auth.signOut")}
              colorScheme='red'
              variant="outline"
              size='sm'
            >
              {t("auth.signOut")}
            </Button>
          </Stack>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default Persona;
