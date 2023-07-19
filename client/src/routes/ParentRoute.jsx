import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const ParentRoute = () => {
  return (
    <>
      <Header />
      <Box maxW={"60rem"} pt='8' pb='4' px='8' m='auto'>
        <Outlet />
      </Box>
    </>
  );
};

export default ParentRoute;
