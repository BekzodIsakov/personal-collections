import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link,
  MenuItem,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MobileNav = ({ navItems = [], linkColor }) => {
  return (
    <VStack
      p='2'
      gap={"2"}
      align={"start"}
      display={{ base: "flex", md: "none" }}
    >
      {navItems.map((navItem, index) => (
        // <MobileNavItem key={index} {...navItem} linkColor={linkColor} />
        <MenuItem key={index} bg="transparent">
          <Link as={NavLink} to={navItem.to}>
            {navItem.label}
          </Link>
        </MenuItem>
      ))}
    </VStack>
  );
};

MobileNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      subLabel: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
      to: PropTypes.string,
    })
  ),
};

const MobileNavItem = ({ to, label, children, linkColor }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing='0' onClick={children && onToggle}>
      <MenuItem bg='none'>
        <Flex
          py='2'
          as={NavLink}
          _activeLink={{ color: "blue.400", textDecoration: "none" }}
          to={to}
          justify='space-between'
          align='center'
          _hover={{
            textDecoration: "none",
          }}
          color={linkColor}
        >
          <Text fontWeight={children ? 600 : 500}>{label}</Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition='all .25s ease-in-out'
              transform={isOpen ? "rotate(180deg)" : ""}
              w='6'
              h='6'
              mr='2'
            />
          )}
        </Flex>
      </MenuItem>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          spacing='1'
          pl='4'
          borderLeft='1'
          borderStyle='solid'
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align='start'
        >
          {children &&
            children.map((child) => (
              <Box key={child.label}>
                <Link as={NavLink} to={child.to} color={linkColor} py='0.5'>
                  {child.label}
                </Link>
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

MobileNavItem.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.object),
};

export default MobileNav;
