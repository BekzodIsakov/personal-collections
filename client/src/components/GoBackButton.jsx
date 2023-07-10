import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      leftIcon={<ChevronLeftIcon />}
      variant='link'
      colorScheme='blue'
      fontWeight={"normal"}
      mb={7}
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};

export default GoBackButton;
