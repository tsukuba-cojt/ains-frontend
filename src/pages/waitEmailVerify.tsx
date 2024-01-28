import { Box, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

import { theme } from "./_app";

const EmailConfirmPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  return (
    <Box>
      <Text>アカウントのメールアドレスに認証メールのリンクを送信しました。認証してください。</Text>
      <Link href='/'>
        <Text>indexへ</Text>
      </Link>
    </Box>
  );
};

export default EmailConfirmPage;
