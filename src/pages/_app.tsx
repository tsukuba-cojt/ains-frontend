import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider, extendTheme, withDefaultColorScheme, theme as baseTheme } from "@chakra-ui/react";

import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import Navbar from "@/components/Navbar";

import "@/plugins/Firebase";

export const theme = extendTheme(
  {
    initialColorMode: "light",
    useSystemColorMode: false,
    colors: {
      primary: baseTheme.colors.cyan,
      secondary: {
        ml: baseTheme.colors.gray[200],
        md: baseTheme.colors.gray[700],
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAuthProvider>
      <ChakraProvider theme={theme}>
        <Navbar />
        <div style={{ marginTop: "60px" }} />
        <Component {...pageProps} />
      </ChakraProvider>
    </FirebaseAuthProvider>
  );
}
