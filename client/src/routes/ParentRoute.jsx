import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const ParentRoute = () => {
  return (
    <>
      <Header />
      {/* <div>Parent route</div> */}
      <Box maxW={"90rem"} py='4' px='8' m='auto'>
        <Outlet />
      </Box>
    </>
  );
};

export default ParentRoute;
