import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { ItemCard } from "@/components";

const ItemPage = () => {
  const { itemId } = useParams();

  return (
    <Box>
      <ItemCard itemId={itemId} />
    </Box>
  );
};

export default ItemPage;
