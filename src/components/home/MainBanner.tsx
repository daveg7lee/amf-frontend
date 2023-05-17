import { Heading, HStack, Button, Box, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function MainBanner() {
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="90vh"
    >
      <Box
        display="flex"
        flexDir="column"
        justifyContent="start"
        alignItems="start"
      >
        <Heading fontSize="7xl" my={3}>
          Avax
        </Heading>
        <Heading fontSize="7xl" my={3} textAlign="start">
          Meet Fair Trade
        </Heading>
        <HStack mt={6}>
          <Button>Learn more</Button>
          <Button as={Link} href="/signin">
            Sign up
          </Button>
        </HStack>
      </Box>
      <Box
        position="relative"
        display={{ base: "none", md: "none", lg: "block" }}
      >
        <Image src="/main.png" alt="main" width="10rem" />
      </Box>
    </Box>
  );
}
