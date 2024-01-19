import { Text, TextProps } from "@chakra-ui/react";
import { Fragment } from "react";

type TextWithBreaksProps = { text: string } & TextProps;

const TextWithBreaks = ({ text, ...textProps }: TextWithBreaksProps) => {
  const textWithBreaks = text.split("\n").map((t: string, i: number) => {
    return (
      <Fragment key={i}>
        {t}
        <br />
      </Fragment>
    );
  });
  return <Text {...textProps}>{textWithBreaks}</Text>;
};

export default TextWithBreaks;
