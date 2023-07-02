import { ChevronDownIcon } from "@chakra-ui/icons";
import {
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
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      px={4}
      py={2}
      display={{ md: "none" }}
    >
      {navItems?.length &&
        navItems.map((navItem) => (
          <MobileNavItem
            key={navItem.label}
            {...navItem}
            linkColor={linkColor}
          />
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
    <Stack spacing={0} onClick={children && onToggle}>
      <Flex
        py={2}
        as={NavLink}
        to={to}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={children ? 600 : 500} color={linkColor}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            mr={2}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          spacing={1}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link as={NavLink} key={child.label} to={child.to} color={linkColor} py={0.5}>
                {child.label}
              </Link>
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
