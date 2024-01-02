import { Box } from "@chakra-ui/react";
import { GoBackButton } from "@/components";
import Collection from "./Collection";

const CollectionPage = () => {
  return (
    <Box>
      <GoBackButton />
      <Collection />
    </Box>
  );
};

export default CollectionPage;
