import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  HStack,
  ListItem,
  OrderedList,
  Skeleton,
  Stack,
  Tag,
  Text,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ItemModal from "../pages/ItemModal";

const CustomList = ({
  list,
  type,
  loading,
  errorMessage,
  showDetails=true,
}) => {
  const [itemId, setItemId] = React.useState("");
  const [itemName, setItemName] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openItemModal = (itemId, itemName) => {
    setItemId(itemId);
    setItemName(itemName);
    onOpen();
  };

  const tagColorMode = useColorModeValue("blackAlpha", "gray");

  let listItems = [];

  if (loading) {
    listItems = (
      <Stack>
        <Skeleton height='30px' startColor='gray.300' endColor='gray.100' />
        <Skeleton height='30px' startColor='gray.300' endColor='gray.100' />
        <Skeleton height='30px' startColor='gray.300' endColor='gray.100' />
      </Stack>
    );
  } else if (list?.length) {
    listItems = list.map((item) => (
      <ListItem key={item._id} mb={showDetails ? 5 : 2}>
        <Box>
          
          <Text mb={1} display={"inline-block"}>{item.name}</Text>
          {!showDetails && (
            <Button
              size={"xs"}
              variant={"outline"}
              colorScheme='blue.400'
              ml={3}
              onClick={() => openItemModal(item._id, item.name)}
            >
              View
            </Button>
          )}
          {showDetails && (
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
                onClick={() => openItemModal(item._id, item.name)}
              >
                View
              </Button>
            </HStack>
          )}
        </Box>
      </ListItem>
    ));
  } else if (errorMessage) {
    listItems = (
      <Text fontSize='md' color='red'>
        Something went wrong!
      </Text>
    );
  }

  return (
    <>
      {type === "ol" ? (
        <OrderedList>{listItems}</OrderedList>
      ) : (
        <UnorderedList>{listItems}</UnorderedList>
      )}
      {isOpen && (
        <ItemModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          itemId={itemId}
          setItemId={setItemId}
          itemName={itemName}
        />
      )}
    </>
  );
};

CustomList.propTypes = {
  list: PropTypes.array,
  type: PropTypes.oneOf(["ol", "ul"]),
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  showDetails: PropTypes.bool,
};

export default CustomList;
