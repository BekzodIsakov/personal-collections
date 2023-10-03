import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ColorSwitch,
  UserProfile,
  SearchModal,
  SearchButton,
  LanguageSelect,
} from "@/components";
import Navigation from "./Navigations/Navigation";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position='sticky'
      zIndex='docked'
      top='0'
      boxShadow='md'
      bg={useColorModeValue("gray.50", "gray.700")}
    >
      <Flex h='14' px='4' alignItems='center' justifyContent='space-between'>
        <Navigation />

        <HStack alignItems='center' h='40%'>
          <LanguageSelect />
          <ColorSwitch />
          <SearchButton onOpen={onOpen} />
          <UserProfile />
        </HStack>
      </Flex>

      {isOpen && (
        <SearchModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      )}
    </Box>
  );
};

export default Header;
