import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { Fragment } from "react";

interface Props {
  icon: string;
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
      <Avatar size='sm' src={props.icon} name={props.username} />
      <Box>
        <Text as='b'>{props.username}</Text>
        <Text>{convert_to_br_text}</Text>
      </Box>
    </Flex>
  );
};

export default CommentBox;
