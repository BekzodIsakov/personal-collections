import { IconButton, useColorMode } from "@chakra-ui/react";
import { SVG } from "@/components";

const ColorSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={
        colorMode === "light" ? (
          <SVG iconId='moon' />
        ) : (
          <SVG iconId='sun' size='22px' />
        )
      }
    />
  );
};

export default ColorSwitch;
