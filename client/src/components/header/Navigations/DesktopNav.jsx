import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Link as ChakraLink,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { Boxes } from "lucide-react";

const DesktopNav = ({ navItems = [], linkColor, linkHoverColor }) => {
  const popoverContentBgColor = useColorModeValue("white", "gray.600");

  return (
    <HStack gap={"6"}>
      <ChakraLink as={NavLink} to={"/"}>
        <Boxes size={33} color='black' strokeWidth={1} />
      </ChakraLink>
      {navItems.map((navItem, index) => (
        <Box key={index}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <ChakraLink
                as={NavLink}
                to={navItem.to}
                _activeLink={{ textDecoration: "underline" }}
              >
                {navItem.label}
              </ChakraLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border='0'
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
    </HStack>
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
    <ChakraLink
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
            fontWeight='500'
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
          flex='1'
        >
          <Icon color='gray.500' w='5' h='5' as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </ChakraLink>
  );
};

DesktopSubNav.propTypes = {
  label: PropTypes.string,
  subLabel: PropTypes.string,
  to: PropTypes.string,
};

export default DesktopNav;
