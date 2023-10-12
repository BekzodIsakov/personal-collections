import { Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner = ({ color = "blue.500", ...otherProps }) => {
  return <ChakraSpinner color={color} {...otherProps} />;
};

export default Spinner;
