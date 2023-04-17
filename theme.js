import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: true,
  fonts: {
    heading: `"Source Sans Pro", sans-serif;`,
    body: `"Source Sans Pro", sans-serif;`,
  },
});

export default theme;
