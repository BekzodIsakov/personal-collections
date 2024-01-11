import { Box } from "@chakra-ui/react";
import { GoBackButton } from "@/components";
// import Collection from "./Collection";

const CollectionPage = ({ children }) => {
  return (
    <Box>
      <GoBackButton />
      {children}
    </Box>
  );
};

export default CollectionPage;
