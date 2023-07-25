import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const DesktopNav = ({ navItems = [], linkColor, linkHoverColor }) => {
  const popoverContentBgColor = useColorModeValue("white", "gray.600");

  return (
    <Stack direction={"row"} spacing='4'>
      {navItems.map((navItem, index) => (
        <Box key={index}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                as={NavLink}
                _activeLink={{ color: "blue.400", textDecoration: "none" }}
                p={2}
                to={navItem.to}
                fontSize='md'
                fontWeight={navItem.children ? 600 : 500}
                color={linkColor}
                textDecoration={"underline"}
                _hover={{
                  color: linkHoverColor,
                  textDecoration: "none",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow='xl'
                bg={popoverContentBgColor}
                p='4'
                rounded='xl'
                minW='sm'
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

DesktopNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      subLabel: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.object),
      to: PropTypes.string,
    })
  ),
};

const DesktopSubNav = ({ label, subLabel, to }) => {
  return (
    <Link
      as={NavLink}
      to={to}
      role='group'
      display='block'
      p='2'
      rounded='md'
      _hover={{ bg: useColorModeValue("gray.100", "gray.900") }}
    >
      <Stack direction='row' align='center'>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "gray.500" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize='sm'>{subLabel}</Text>
        </Box>
        <Flex
          transition='all .3s ease'
          transform='translateX(-10px)'
          opacity='0'
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify='flex-end'
          align='center'
          flex={1}
        >
          <Icon color='gray.500' w='5' h='5' as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

DesktopSubNav.propTypes = {
  label: PropTypes.string,
  subLabel: PropTypes.string,
  to: PropTypes.string,
};

export default DesktopNav;
