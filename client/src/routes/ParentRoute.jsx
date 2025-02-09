import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const ParentRoute = () => {
  return (
    <>
      <Header />
      <Box
        as='main'
        maxW={1200}
        pt={8}
        pb={4}
        px={{ base: 4, twSM: 8 }}
        m='auto'
      >
        <Outlet />
      </Box>
    </>
  );
};

export default ParentRoute;
