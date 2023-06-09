import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme, withDefaultColorScheme, theme as baseTheme } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import "@/plugins/Firebase";

export const theme = extendTheme(
  {
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
      primary: baseTheme.colors.cyan,
      secondary: {
        ml: "#A0AEC0",
        md: "#A0AEC0",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <div style={{ marginTop: "60px" }} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
