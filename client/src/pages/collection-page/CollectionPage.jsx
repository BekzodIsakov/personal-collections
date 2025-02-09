import { Box } from "@chakra-ui/react";
import { GoBackButton } from "@/components";

const CollectionPage = ({ children }) => {
  return (
    <Box>
      <GoBackButton />
      {children}
    </Box>
  );
};

export default CollectionPage;
