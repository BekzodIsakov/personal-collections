import { Stack } from "@chakra-ui/react";
import CollectionsCards from "./components/CollectionsCards";

const MainPage = () => {
  return (
    <Stack direction={"column"} spacing={24}>
      <CollectionsCards />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aperiam
        asperiores illo corporis, modi magni nihil animi quisquam praesentium
        ratione.
      </div>
    </Stack>
  );
};

export default MainPage;
