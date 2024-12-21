import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavData } from "./navData";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Navigation = () => {
  const { navData } = useNavData();

  const linkColor = useColorModeValue("gray.500", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const menuBg = useColorModeValue("white", "gray.700");

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
                size='sm'
                colorScheme='gray'
                icon={
                  isOpen ? (
                    <CloseIcon w='3' h='3' />
                  ) : (
                    <HamburgerIcon w='5' h='5' />
                  )
                }
              />
              <MenuList
                p='0'
                w='100vw'
                boxShadow='xl'
                border='none'
                bg={menuBg}
                borderTopRadius='0'
                closeOnSelect={true}
              >
                <MobileNav
                  navItems={navData}
                  linkColor={linkColor}
                  linkHoverColor={linkHoverColor}
                />
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
      <Flex display={{ base: "none", md: "flex" }} ml='3'>
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
