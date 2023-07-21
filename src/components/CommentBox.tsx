import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { Fragment } from "react";

interface Props {
  icon_url: string;
  username: string;
  text: string;
}

const CommentBox = (props: Props) => {
  const convert_to_br_text = props.text.split("\\n").map((t: string, i: number) => {
    return (
      <Fragment key={i}>
        {t}
        <br />
      </Fragment>
    );
  });

  return (
    <Flex gap={3} my={5}>
      <Image boxSize='2.25rem' rounded='full' src={props.icon_url} alt={props.icon_url} />
      <Box>
        <Text as='b'>{props.username}</Text>
        <Text>{convert_to_br_text}</Text>
      </Box>
    </Flex>
  );
};

export default CommentBox;
