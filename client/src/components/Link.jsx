import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const Link = ({ children, ...otherProps }) => {
  return (
    <ChakraLink as={ReactRouterLink} color={"blue.500"} {...otherProps}>
      {children}
    </ChakraLink>
  );
};

export default Link;
