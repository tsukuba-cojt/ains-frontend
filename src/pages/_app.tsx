import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme, withDefaultColorScheme, theme as baseTheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
      primary: baseTheme.colors.cyan,
      secondary: "#b5aebf",
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
