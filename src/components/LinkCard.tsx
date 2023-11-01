import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

import { theme } from "@/pages/_app";

type IconType = "circle" | "square";

interface LinkCardProps {
  title: string;
  show_icon: boolean;
  icon_url?: string;
  icon_type?: IconType;
  href: string;
}

const LinkCard = ({ title, show_icon, icon_url, icon_type, href }: LinkCardProps) => {
  const secondary = useColorModeValue(theme.colors.secondary.ml, theme.colors.secondary.md);

  let border_style = "full";
  switch (icon_type) {
    case "circle":
      border_style = "full";
      break;
    case "square":
      border_style = "lg";
      break;
  }

  return (
    <Link href={href}>
      <Flex bg={secondary} p={5} rounded='lg' w='fit-content' direction='row' alignItems='center' gap={5}>
        {show_icon && <Image w={10} h={10} src={icon_url} borderRadius={border_style} alt={title} />}
        <Text fontSize='xl'>{title}</Text>
      </Flex>
    </Link>
  );
};

export default LinkCard;
