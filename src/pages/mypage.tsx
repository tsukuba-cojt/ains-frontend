import { Avatar, Box, Grid, Text, GridItem } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { Image, Stack, AspectRatio } from "@chakra-ui/react";

const MypagePage = () => {
  const buttonWidth = 200;
  return (
    <Flex flexDirection='column' align='center'>
      <Avatar size='xl' src='https://bit.ly/broken-link' />
      <Box fontSize='36px'>name</Box>
      <Box color='rgba(0, 0, 0, 0.5)'>UserID</Box>
      <Box>フォロワー：4人・フォロー中：3人</Box>
      <Flex>
        <Button mr={2}>シェア</Button>
        <Button>プロフィールを編集</Button>
      </Flex>
      <Box my={2}></Box>
      <Tabs align='center'>
        <TabList>
          <Tab>作成コンテンツ</Tab>
          <Tab>保存済み</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <Grid templateColumns='repeat(5, 1fr)'>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='SP.png' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='R.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='SP.png' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='R.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='SP.png' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='R.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='SP.png' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='R.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='SP.png' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='R.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='SP.png' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='R.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
            </Grid>
          </TabPanel>

          {/*ここから保存済み */}
          <TabPanel>
            <Grid templateColumns='repeat(5, 1fr)'>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='IK.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='BU.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA2.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='IK.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='BU.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA2.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
              <Button h='fit-content' padding={4} variant='ghost' w={`${buttonWidth}px`}>
                <Flex direction='column' w='100%'>
                  <Grid w='100%' templateRows='repeat(2, 1fr)' templateColumns='repeat(3, 1fr)'>
                    <GridItem rowSpan={2} colSpan={2}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='IK.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio ratio={1}>
                        <Image src='BU.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={1}>
                      <AspectRatio maxW='100%' ratio={1}>
                        <Image src='AA2.jpg' alt='代替テキスト' w='100%' />
                      </AspectRatio>
                    </GridItem>
                  </Grid>
                  <Box>
                    <Text mt={2}>ファイル名</Text>
                    <Text fontSize='0.3rem'>件数</Text>
                  </Box>
                </Flex>
              </Button>
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MypagePage;
