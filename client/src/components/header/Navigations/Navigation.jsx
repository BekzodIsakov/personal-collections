import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import MobileNav from "./MobileNav";
import { useNavData } from "./navData";
import DesktopNav from "./DesktopNav";
import { useI18n } from "../../../providers/i18nProvider";

const Navigation = () => {
  const linkColor = useColorModeValue("gray.500", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const menuBgColor = useColorModeValue("white", "gray.700");

  const { navData } = useNavData();

  const { languages, setSelectedLanguage, selectedLanguage } = useI18n();

  return (
    <>
      <Flex
        flex={{ base: 1, md: "auto" }}
        ml={{ base: -2 }}
        display={{ base: "flex", md: "none" }}
      >
        <Menu offset={[-8, 12]}>
          {({ isOpen }) => (
            <>
              <MenuButton
                as={IconButton}
                isActive={false}
                size={"sm"}
                colorScheme='gray'
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
              />
              <MenuList
                p={0}
                w={"100vw"}
                boxShadow={"xl"}
                border={"none"}
                bg={menuBgColor}
                borderTopRadius={0}
              >
                <HStack justifyContent={"space-between"}>
                  <MobileNav
                    navItems={navData}
                    linkColor={linkColor}
                    linkHoverColor={linkHoverColor}
                  />
                  <Box p={4}>
                    <Select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      size={"sm"}
                      w='max-content'
                      mr='0'
                      ml='auto'
                      display={{ base: "auto", xs: "none" }}
                      variant={"filled"}
                      rounded={"md"}
                    >
                      {Object.values(languages).map((language) => (
                        <option key={language}>{language}</option>
                      ))}
                    </Select>
                  </Box>
                </HStack>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
      <Flex display={{ base: "none", md: "flex" }} ml={3}>
        <DesktopNav
          navItems={navData}
          linkColor={linkColor}
          linkHoverColor={linkHoverColor}
        />
      </Flex>
    </>
  );
};

export default Navigation;
