import { Box, Button, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

import { theme } from "./_app";

const EmailConfirmPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  return (
    <Box>
      <Box>
        <p>Current color mode: {colorMode}</p>
        <Button onClick={() => console.log("eeeee")}>Change color mode</Button>
      </Box>
      <Text>アカウントのメアドに認証メールのリンク投げたのでメアド認証しろ!!!</Text>
      <Link href='/'>
        <Text>indexへ</Text>
      </Link>
    </Box>
  );
};

export default EmailConfirmPage;
