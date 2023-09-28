import React from "react";
import {
  Badge,
  Box,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchItems } from "@/hooks/items";

const SearchItemModal = ({ isOpen, onClose, onOpen }) => {
  const [searchText, setSearchText] = React.useState("");

  const initialRef = React.useRef();
  const timeOutId = React.useRef(null);

  const { searchResult, searchItems, loading } = useSearchItems();

  React.useEffect(() => {
    if (searchText && searchText.length > 1) {
      clearTimeout(timeOutId.current);

      timeOutId.current = setTimeout(() => {
        searchItems(searchText);
      }, 600);
    }
  }, [searchText]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent mx='3'>
        <ModalHeader>Search items</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <InputGroup>
            <Input
              ref={initialRef}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <InputRightElement>
              {loading && <Spinner color='blue.400' />}
            </InputRightElement>
          </InputGroup>

          <VStack alignItems={"stretch"} mt='6'>
            {searchResult?.items.map((item) => (
              <Card key={item._id}>
                <CardBody py='3'>
                  <Box mb='1'>
                    <Badge fontWeight='medium'>Item</Badge>
                  </Box>
                  <Link color='blue.400' href={`/items/${item._id}`}>
                    {item.name}
                  </Link>
                </CardBody>
              </Card>
            ))}
            {searchResult?.collections.map((collection) => (
              <Card key={collection._id}>
                <CardBody py='3'>
                  <Box mb='1'>
                    <Badge fontWeight='medium'>Collection</Badge>
                  </Box>
                  <Link
                    href={
                      collection.items.length
                        ? `/items/${collection.items[0]}`
                        : `/collections/${collection._id}`
                    }
                    color='blue.400'
                  >
                    {collection.title}
                  </Link>
                </CardBody>
              </Card>
            ))}
          </VStack>
          {searchResult?.items.length ||
          searchResult?.collections.length ? null : (
            <Text as='em' color='gray.500'>
              No matching results!
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchItemModal;
