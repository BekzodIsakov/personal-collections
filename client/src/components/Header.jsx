import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.700")} px={4}>
      <Flex h={14} alignItems={"center"} justifyContent='space-between'>
        <div>Navlinks</div>

        <HStack alignItems='center' h='40%'>
          <HStack mr={3}>
            <Avatar name='User Name' src='' size='xs' />
            <Text whiteSpace='nowrap'>User Name</Text>
          </HStack>
          <Divider
            orientation='vertical'
            variant='solid'
            borderColor='gray.400'
          />
          <Button variant={"ghost"} colorScheme={"red"} size={"sm"}>
            Sign out
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
