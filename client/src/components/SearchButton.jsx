import { IconButton } from "@chakra-ui/react";
import { SVG } from "@/components";

const SearchButton = ({ onOpen }) => {
  return (
    <IconButton
      onClick={onOpen}
      icon={<SVG iconId='search' />}
      aria-label='Search database'
      title='Search'
    />
  );
};

export default SearchButton;
