import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
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
  const menuBg = useColorModeValue("gray.50", "gray.700");

  return (
    <>
      {/* <Flex
        flex={{ base: 1, md: "auto" }}
        ml={{ base: -2 }}
        display={{ base: "flex", md: "none" }}
      > */}
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              display={{ base: "flex", md: "none" }}
              as={IconButton}
              size='md'
              icon={
                isOpen ? (
                  <CloseIcon w='3' h='3' />
                ) : (
                  <HamburgerIcon w='5' h='5' />
                )
              }
            />
            <MenuList
              sx={{
                position: "fixed",
                left: "-2",
                width: "100vw",
                boxShadow: "2xl",
                border: "none",
                borderTopRadius: "0",
                bg: menuBg,
              }}
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
      {/* </Flex> */}
      <Flex display={{ base: "none", md: "flex" }}>
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
