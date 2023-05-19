"use client";

import ProductCard from "@/components/home/ProductCard";
import initializeFirebaseClient from "@/lib/initFirebase";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { DocumentData } from "firebase-admin/firestore";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  term: string;
}

export default function MarketPlace() {
  const { db } = initializeFirebaseClient();
  const { register, watch } = useForm<IForm>();
  const [coffees, setCoffees] = useState<DocumentData[]>([]);
  const [chocolates, setChocolates] = useState<DocumentData[]>([]);

  const getCoffeesData = async () => {
    const querySnapshot = await getDocs(collection(db, "coffees"));
    setCoffees(querySnapshot.docs.map((doc) => doc.data()));
  };

  const getChocolateData = async () => {
    const querySnapshot = await getDocs(collection(db, "chocolates"));
    setChocolates(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getCoffeesData();
    getChocolateData();
  }, []);

  return (
    <Box mt="10">
      <HStack>
        <Heading>Marketplace</Heading>
      </HStack>
      <HStack w="50%" mt={3}>
        <InputGroup size="md" mr={5} w={{ sm: "40", md: "72", lg: "96" }}>
          <Input placeholder="Search" {...register("term")} />
          <InputRightElement>
            <Search2Icon />
          </InputRightElement>
        </InputGroup>
        <Select placeholder="Filter">
          <option value="coffee">Coffee</option>
          <option value="chocolate">Chocolate</option>
        </Select>
      </HStack>
      <Tabs mt={3}>
        <TabList>
          <Tab>Coffee</Tab>
          <Tab>Chocolate</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid
              mt={5}
              columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
              spacing={4}
            >
              {coffees.map((coffee) => (
                <ProductCard data={coffee} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              mt={5}
              columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
              spacing={4}
            >
              {chocolates.map((chocolate) => (
                <ProductCard data={chocolate} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
