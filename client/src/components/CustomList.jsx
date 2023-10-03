import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
import { ItemViewModal } from "@/components";

const CustomList = ({
  list,
  type,
  loading,
  errorMessage,
  showDetails = true,
}) => {
  const [itemId, setItemId] = React.useState("");
  const [itemName, setItemName] = React.useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const tagColorMode = useColorModeValue("blackAlpha", "gray");

  const { t } = useTranslation();

  const openItemModal = (itemId, itemName) => {
    setItemId(itemId);
    setItemName(itemName);
    onOpen();
  };

  if (loading) {
    return (
      <Stack>
        <Skeleton height='30px' startColor='gray.300' endColor='gray.100' />
        <Skeleton height='30px' startColor='gray.300' endColor='gray.100' />
        <Skeleton height='30px' startColor='gray.300' endColor='gray.100' />
      </Stack>
    );
  }

  if (errorMessage) {
    return (
      <Text fontSize='md' color='red'>
        {t("global.error")}
      </Text>
    );
  }

  if (list?.length) {
    const List = type === "ol" ? OrderedList : UnorderedList;
    return (
      <>
        <List>
          {list.map((item) => (
            <ListItem key={item._id} mb={showDetails ? "5" : "2"}>
              <Box>
                <Text mb={1} display={"inline-block"}>
                  {item.name}
                </Text>

                {showDetails ? (
                  <HStack>
                    <Tag colorScheme={tagColorMode} fontSize='sm' py='1'>
                      {item.parentCollection.title}
                    </Tag>
                    <Divider
                      h='5'
                      orientation='vertical'
                      borderColor='gray.400'
                    />
                    <Text fontWeight='medium'>{item.author.name}</Text>
                    <Divider
                      h='5'
                      orientation='vertical'
                      borderColor='gray.400'
                    />
                    <Button
                      size='xs'
                      variant='outline'
                      colorScheme='blue.400'
                      onClick={() => openItemModal(item._id, item.name)}
                    >
                      {t("global.view")}
                    </Button>
                  </HStack>
                ) : (
                  <Button
                    size='xs'
                    variant='outline'
                    colorScheme='blue.400'
                    ml={3}
                    onClick={() => openItemModal(item._id, item.name)}
                  >
                    {t("global.view")}
                  </Button>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
        {isOpen && (
          <ItemViewModal
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
  }
};

CustomList.propTypes = {
  list: PropTypes.array,
  type: PropTypes.oneOf(["ol", "ul"]),
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  showDetails: PropTypes.bool,
};

export default CustomList;
