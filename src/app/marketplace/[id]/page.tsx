"use client";

import { Image, VStack, Grid, Divider, SkeletonText } from "@chakra-ui/react";
import initializeFirebaseClient from "@/lib/initFirebase";
import {
  Box,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase-admin/firestore";
import {
  getDocs,
  query,
  collection,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import ProductCard from "@/components/home/ProductCard";
import { usePathname } from "next/navigation";

export default function MarketPlace() {
  const { db } = initializeFirebaseClient();
  const path = usePathname();
  const id = path.split("/")[2];
  const [data, setData] = useState<DocumentData>();
  const [coffees, setCoffees] = useState<DocumentData[]>([]);

  const getItemData = async () => {
    if (!id) return;

    const itemRef = doc(db, "items", id);
    const data = await getDoc(itemRef);
    if (data.exists()) {
      setData(data.data());
    }
  };

  const getCoffeesData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "items"), where("type", "==", "coffee"))
    );
    setCoffees(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getCoffeesData();
    getItemData();
  }, []);

  return (
    <Box minH="90vh">
      <Heading my="10">Coffee</Heading>

      <HStack spacing={10} alignItems="center">
        <Image
          width="md"
          fit="cover"
          rounded="lg"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        />

        <VStack
          h="full"
          alignItems="start"
          justifyContent="space-between"
          spacing={8}
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={12}>
            <Box>
              {data ? (
                <>
                  <Text fontWeight="bold">Name</Text>
                  <Text>{data.title}</Text>
                </>
              ) : (
                <SkeletonText noOfLines={2} skeletonHeight={2} />
              )}
            </Box>

            <Box>
              {data ? (
                <>
                  <Text fontWeight="bold">Coporation</Text>
                  <Text>{data.company}</Text>{" "}
                </>
              ) : (
                <SkeletonText noOfLines={2} skeletonHeight={2} />
              )}
            </Box>

            <Box>
              {data ? (
                <>
                  <Text fontWeight="bold">Date</Text>
                  <Text>{data.createdAt}</Text>
                </>
              ) : (
                <SkeletonText noOfLines={2} skeletonHeight={2} />
              )}
            </Box>

            <Box>
              {data ? (
                <>
                  <Text fontWeight="bold">Price</Text>
                  <Text>{data.price}</Text>
                </>
              ) : (
                <SkeletonText noOfLines={2} skeletonHeight={2} />
              )}
            </Box>
          </Grid>

          <Button variant="solid" bg={"#90ee90"} width="full" color={"black"}>
            Buy Now
          </Button>
        </VStack>
      </HStack>
      <Divider my={6} />
      <Text fontSize="2xl" fontWeight="bold">
        Recommended item
      </Text>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={6} mt={6}>
        {coffees.map((coffee) => (
          <ProductCard data={coffee} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
