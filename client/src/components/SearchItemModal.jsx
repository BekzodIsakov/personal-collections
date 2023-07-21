import React from "react";
import {
  Card,
  CardBody,
  IconButton,
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
  Text,
  VStack,
} from "@chakra-ui/react";
import SVG from "./SVG";
import { useSearchItems } from "../hooks/items";

const SearchItemModal = ({ isOpen, onClose, onOpen }) => {
  const [searchText, setSearchText] = React.useState("");

  const initialRef = React.useRef();

  const { searchResult, searchItems, loading } = useSearchItems();
  console.log({ searchResult });

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ searchText });
    searchItems(searchText);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior='inside'
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent mx={3}>
        <ModalHeader>Search items</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={5}>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                ref={initialRef}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  onClick={onOpen}
                  aria-label='Search database'
                  size={"sm"}
                  type='submit'
                  isLoading={loading}
                  isDisabled={searchText.length < 2}
                  title={"Search"}
                  icon={<SVG iconId={"search"} size={"20px"} />}
                  colorScheme={"blue"}
                />
              </InputRightElement>
            </InputGroup>
          </form>

          <VStack alignItems={"stretch"} mt='6'>
            {searchResult?.items.map((item) => (
              <Card key={item._id}>
                <CardBody>
                  <Link href={`/items/${item._id}`}>
                    <Text>{item.name}</Text>
                  </Link>
                </CardBody>
              </Card>
            ))}
            {searchResult?.collections.map((collection) => (
              <Card key={collection._id}>
                <CardBody>
                  <Link
                    href={
                      collection.items.length
                        ? `/items/${collection.items[0]}`
                        : `/collections/${collection._id}`
                    }
                  >
                    <Text>{collection.title}</Text>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchItemModal;
