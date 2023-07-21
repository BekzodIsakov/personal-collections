import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MobileNav = ({ navItems = [], linkColor }) => {
  return (
    <Stack px='4' py='2' display={{ md: "none" }}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} linkColor={linkColor} />
      ))}
    </Stack>
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
      <Flex
        py='2'
        as={NavLink}
        _activeLink={{ color: "blue.400", textDecoration: "none" }}
        to={to}
        justify={"space-between"}
        align={"center"}
        textDecoration={"underline"}
        _hover={{
          textDecoration: "none",
        }}
        color={linkColor}
      >
        <Text fontWeight={children ? 600 : 500}>{label}</Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w='6'
            h='6'
            mr='2'
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          spacing='1'
          pl='4'
          borderLeft='1'
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box key={child.label}>
                <Link as={NavLink} to={child.to} color={linkColor} py={0.5}>
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
