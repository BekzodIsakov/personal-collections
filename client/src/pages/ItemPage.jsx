import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import ItemCard from "../components/ItemCard";

const ItemPage = () => {
  const { itemId } = useParams();

  return (
    <Box>
      <ItemCard itemId={itemId} />
    </Box>
  );
};

export default ItemPage;
