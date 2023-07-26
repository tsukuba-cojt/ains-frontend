import { Tag } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const HoverTag = (props: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Tag
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => props.onClick()}
      style={{ textDecoration: isHover ? "line-through" : "none" }}
    >
      {props.children}
    </Tag>
  );
};

export default HoverTag;
