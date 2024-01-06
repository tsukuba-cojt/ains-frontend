import { LinkBox, Text, LinkOverlay, Button, Link, Box } from "@chakra-ui/react";

export default function App() {
  return (
    <>
      <LinkBox maxW='sm' p='5' borderWidth='1px' rounded='md'>
        <LinkOverlay
          onClick={() => {
            console.log("nyaaaa");
          }}
        >
          New Year, New Beginnings: Smashing Workshops & Audits
        </LinkOverlay>
        <Text mb='3'>
          Catch up on what’s been cookin’ at Smashing and explore some of the most popular community resources.
        </Text>
        <Button
          onClick={() => {
            console.log("ooooooo");
          }}
          color='teal.400'
          fontWeight='bold'
        >
          Some inner link
        </Button>
      </LinkBox>

      <Link
        onClick={() => {
          console.log("nyaaaa");
        }}
      >
        <Box maxW='sm' p='5' borderWidth='1px' rounded='md'>
          New Year, New Beginnings: Smashing Workshops & Audits
          <Text mb='3'>
            Catch up on what’s been cookin’ at Smashing and explore some of the most popular community resources.
          </Text>
          <Button
            onClick={() => {
              console.log("ooooooo");
            }}
            color='teal.400'
            fontWeight='bold'
          >
            Some inner link
          </Button>
        </Box>
      </Link>
    </>
  );
}
