"use client";

import { userState } from "@/atom";
import MainBanner from "@/components/home/MainBanner";
import initializeFirebaseClient from "@/lib/initFirebase";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  getDocs,
  collection,
  DocumentData,
  where,
  query,
} from "firebase/firestore";
import ProductCard from "@/components/home/ProductCard";

export default function Home() {
  const { db } = initializeFirebaseClient();
  const [coffees, setCoffees] = useState<DocumentData[]>([]);
  const [chocolates, setChocolates] = useState<DocumentData[]>([]);

  const getCoffeesData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "items"), where("type", "==", "coffee"))
    );
    setCoffees(querySnapshot.docs.map((doc) => doc.data()));
  };

  const getChocolateData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "items"), where("type", "==", "chocolate"))
    );
    setChocolates(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getCoffeesData();
    getChocolateData();
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
        <MainBanner
          firstText="Avax"
          secondText="Meet Fair Trade"
          img="main.png"
          firstButton="Learn more"
          secondButton="Sign up"
          secondLink="signup"
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
      <Box px={{ base: "0", md: "6", lg: "20" }}>
        <Heading mb={3}>Coffee</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={4}>
          {coffees.map((coffee) => (
            <ProductCard data={coffee} />
          ))}
        </SimpleGrid>
      </Box>
      <Box my="20" px={{ base: "0", md: "6", lg: "20" }}>
        <Heading mb={3}>Chocolate</Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={4}>
          {chocolates.map((chocolate) => (
            <ProductCard data={chocolate} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
