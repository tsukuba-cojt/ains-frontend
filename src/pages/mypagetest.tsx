import { Button, Box, Image, Flex, Heading, Text } from "@chakra-ui/react";

const PinterestBoardButton = () => {
  const boardData = [
    {
      title: "Title 1",
      description: "Description 1",
      imageUrl: "BU.jpg",
    },
    {
      title: "Title 2",
      description: "Description 2",
      imageUrl: "IK.jpg",
    },
    {
      title: "Title 3",
      description: "Description 3",
      imageUrl: "OIP.jpg",
    },
    // 他のボードデータを追加
  ];

  return (
    <Flex flexWrap='wrap' justifyContent='center' gap={4}>
      {boardData.map((board, index) => (
        <Box key={index} maxWidth='300px'>
          <Image src={board.imageUrl} alt='Board Image' borderRadius='md' />
          <Box p={4}>
            <Heading as='h3' fontSize='lg' mt={2} mb={1}>
              {board.title}
            </Heading>
            <Text fontSize='sm'>{board.description}</Text>
            <Button
              mt={4}
              colorScheme='teal'
              size='sm'
              width='full'
              onClick={() => {
                // ボタンがクリックされたときの処理
                console.log(`Button clicked for ${board.title}`);
              }}
            >
              View Board
            </Button>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default PinterestBoardButton;
