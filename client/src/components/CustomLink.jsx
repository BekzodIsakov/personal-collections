import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

const CustomLink = (props) => {
  return (
    <Link as={RouteLink} color={"blue.400"} {...props}>
      {props.children}
    </Link>
  );
};

export default CustomLink;
