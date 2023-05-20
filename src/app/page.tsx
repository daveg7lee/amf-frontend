"use client";

import MainBanner from "@/components/home/MainBanner";
import initializeFirebaseClient from "@/lib/initFirebase";
import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  DocumentData,
  where,
  query,
} from "firebase/firestore";

export default function Home() {
  const { db } = initializeFirebaseClient();

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
        <MainBanner
          firstText="Avax"
          secondText="Meet Fair Trade"
          img="main.png"
          firstButton="Learn more"
          secondButton="Sign up"
          secondLink="signin"
          imgSize="22rem"
        />
        <MainBanner
          firstText="CAFE Direct"
          secondText="Coffee for labors"
          img="main2.png"
          firstButton="View on market"
          secondButton="Explore market"
          firstLink="marketplace"
          secondLink="marketplace"
        />
        <MainBanner
          firstText="Alter eco"
          secondText="Non-GMO and organic"
          img="main3.png"
          firstButton="View on market"
          secondButton="Explore market"
          firstLink="marketplace"
          secondLink="marketplace"
        />
      </Carousel>
      <Container>
        <div style={{ textAlign: "center" }}>
          <Text fontSize="3xl">
            AMF means ‘Avalanche, Meet Fairtrade’.
            <br />
            <br />
          </Text>
          <Text textAlign="center">
            Have you heard about Fairtrade or interested in that?
            <br />
            Fairtrade is so important in our life.
            <br /> So we want to deliver our vision to people in the world.
          </Text>
        </div>
      </Container>
    </Box>
  );
}
