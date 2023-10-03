import { IconButton } from "@chakra-ui/react";
import { SVG } from "@/components";

const SearchButton = ({ onOpen }) => {
  return (
    <IconButton
      onClick={onOpen}
      icon={<SVG iconId='search' />}
      variant='ghost'
      size='sm'
      aria-label='Search database'
      title='Search'
      _hover={{ bg: "transparent" }}
      mr='2'
    />
  );
};

export default SearchButton;
