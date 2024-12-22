import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const breakpoints = {
  xs: "23em", // 368px
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "96em", // 1536px
};

const theme = extendTheme({
  config,
  breakpoints,
  styles: {
    global: {
      body: {
        overflowX: "hidden",
      },
    },
  },
  components: {
    Link: {
      baseStyle: {
        color: "blue.500",
        fontWeight: "medium",
        _hover: {
          color: "blue.400",
        },
      },
    },
  },
});

export default theme;
