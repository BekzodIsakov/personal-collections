import { IconButton, useColorMode } from "@chakra-ui/react";
import { SVG } from "@/components";

export const ThemeSwitcher = () => {
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
