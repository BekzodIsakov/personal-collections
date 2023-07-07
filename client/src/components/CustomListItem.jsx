import {
  Box,
  Button,
  Divider,
  HStack,
  ListItem,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const CustomListItem = ({ item, onClick, ...rest }) => {
  const tagColorMode = useColorModeValue("blackAlpha", "gray");

  return (
    <ListItem mb={5} {...rest}>
      <Box>
        <Text mb={1}>{item.name}</Text>
        <HStack>
          <Tag colorScheme={tagColorMode} fontSize={"sm"} py='1'>
            {item.parentCollection.title}
          </Tag>
          <Divider h='5' orientation='vertical' borderColor={"gray.400"} />
          <Text fontWeight={"medium"}>{item.author.name}</Text>
          <Divider h='5' orientation='vertical' borderColor={"gray.400"} />
          <Button
            size={"xs"}
            variant={"outline"}
            colorScheme='blue.400'
            onClick={onClick}
          >
            View
          </Button>
        </HStack>
      </Box>
    </ListItem>
  );
};

export default CustomListItem;
