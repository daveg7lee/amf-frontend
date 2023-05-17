"use client";

import { userState } from "@/atom";
import initializeFirebaseClient from "@/lib/initFirebase";
import { Box, Button, HStack, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Home() {
  const setUser = useSetRecoilState(userState);
  const { auth } = initializeFirebaseClient();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const userCopy = JSON.parse(JSON.stringify(user));
      setUser(userCopy);
    });
  }, []);

  return (
    <Box
      minH="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={{ base: "0", md: "6", lg: "20" }}
    >
      <Box w={{ lg: "50%", md: "100%", base: "100%" }}>
        <Heading fontSize="7xl" my={3}>
          Avax
        </Heading>
        <Heading fontSize="7xl" my={3}>
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
        w="50%"
        position="relative"
        display={{ base: "none", md: "none", lg: "block" }}
      >
        <Image src="/main.png" alt="main" />
      </Box>
    </Box>
  );
}
