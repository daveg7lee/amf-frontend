"use client";

import { userState } from "@/atom";
import MainBanner from "@/components/home/MainBanner";
import initializeFirebaseClient from "@/lib/initFirebase";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
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
    <Box pb={5}>
      <Carousel
        autoPlay
        emulateTouch
        infiniteLoop
        showArrows={false}
        showIndicators={false}
        showStatus={false}
      >
        <MainBanner />
        <MainBanner />
        <MainBanner />
      </Carousel>
      <Box px={{ base: "0", md: "6", lg: "20" }}>
        <Heading mb={3}>Coffee</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />

              <Stack>
                <CardBody>
                  <Heading size="md">5 MAYAN GOLD</Heading>

                  <Text py="2">Cafe Direct</Text>
                </CardBody>

                <CardFooter>
                  <HStack alignItems="center">
                    <Icon width="5" height="5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="black" />
                      <path
                        d="M12.4238 4.66319C12.0485 4.33509 11.6924 4.56699 11.5612 4.72395L5.22076 15.9493C4.99075 16.4961 5.46793 16.7341 5.73527 16.7847H9.10979C9.99353 16.7726 10.4868 16.2632 10.623 16.01L13.816 10.3746C13.9774 10.1417 14.3335 9.55737 14.4667 9.08344C14.5998 8.60952 14.4414 8.14673 14.3456 7.97458L12.4238 4.66319Z"
                        fill="white"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M16.6297 12.0557C16.2287 11.5697 15.7943 11.8532 15.6272 12.0557L13.4854 15.7621C13.0722 16.479 13.6171 16.7595 13.9411 16.8102H18.3158C18.972 16.713 18.9639 16.2127 18.8778 15.9747L16.6297 12.0557Z"
                        fill="white"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </Icon>
                    <Text>3.33</Text>
                  </HStack>
                </CardFooter>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      <Box my="20" px={{ base: "0", md: "6", lg: "20" }}>
        <Heading mb={3}>Chocolate</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />

              <Stack>
                <CardBody>
                  <Heading size="md">5 MAYAN GOLD</Heading>

                  <Text py="2">Cafe Direct</Text>
                </CardBody>

                <CardFooter>
                  <HStack alignItems="center">
                    <Icon width="5" height="5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="12" fill="black" />
                      <path
                        d="M12.4238 4.66319C12.0485 4.33509 11.6924 4.56699 11.5612 4.72395L5.22076 15.9493C4.99075 16.4961 5.46793 16.7341 5.73527 16.7847H9.10979C9.99353 16.7726 10.4868 16.2632 10.623 16.01L13.816 10.3746C13.9774 10.1417 14.3335 9.55737 14.4667 9.08344C14.5998 8.60952 14.4414 8.14673 14.3456 7.97458L12.4238 4.66319Z"
                        fill="white"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M16.6297 12.0557C16.2287 11.5697 15.7943 11.8532 15.6272 12.0557L13.4854 15.7621C13.0722 16.479 13.6171 16.7595 13.9411 16.8102H18.3158C18.972 16.713 18.9639 16.2127 18.8778 15.9747L16.6297 12.0557Z"
                        fill="white"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </Icon>
                    <Text>3.33</Text>
                  </HStack>
                </CardFooter>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
