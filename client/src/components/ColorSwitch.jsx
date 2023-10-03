import { IconButton, useColorMode } from "@chakra-ui/react";
import { SVG } from "@/components";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      variant='ghost'
      size='sm'
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

export default ColorModeSwitch;
