import { IconButton } from "@chakra-ui/react";
import { SVG } from "@/components";

const SearchButton = ({ onOpen }) => {
  return (
    <IconButton
      icon={<SVG iconId={"search"} />}
      variant='ghost'
      size='sm'
      onClick={onOpen}
      aria-label='Search database'
      title='Search'
      _hover={{ bg: "transparent" }}
      mr={2}
    />
  );
};

export default SearchButton;
