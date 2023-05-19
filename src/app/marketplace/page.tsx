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
import { getDocs, collection, query, where } from "firebase/firestore";
import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  term: string;
}

export default function MarketPlace() {
  const { db } = initializeFirebaseClient();
  const { register, watch } = useForm<IForm>();
  const [tab, setTab] = useState("coffee");
  const [coffees, setCoffees] = useState<DocumentData[]>([]);
  const [chocolates, setChocolates] = useState<DocumentData[]>([]);
  const [coffeeSearchData, setCoffeeSearchData] = useState<DocumentData[]>([]);
  const [chocolateSearchData, setChocolateSearchData] = useState<
    DocumentData[]
  >([]);

  const getCoffeesData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "items"), where("type", "==", "coffee"))
    );
    setCoffees(querySnapshot.docs.map((doc) => doc.data()));
    setCoffeeSearchData(querySnapshot.docs.map((doc) => doc.data()));
  };

  const getChocolateData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "items"), where("type", "==", "chocolate"))
    );
    setChocolates(querySnapshot.docs.map((doc) => doc.data()));
    setChocolateSearchData(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getCoffeesData();
    getChocolateData();
  }, []);

  const onEnterChocolateSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && watch("term") !== "") {
      setChocolateSearchData(() =>
        chocolates.filter((i) =>
          i.title.toLowerCase().includes(watch("term").toLowerCase())
        )
      );
    } else {
      setChocolateSearchData(chocolates);
    }
  };

  const onEnterCoffeeSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && watch("term") !== "") {
      setCoffeeSearchData(() =>
        coffees.filter((i) =>
          i.title.toLowerCase().includes(watch("term").toLowerCase())
        )
      );
    } else {
      setCoffeeSearchData(coffees);
    }
  };

  // const onClickOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.value === "price") {
  //     setCoffeeSearchData(() =>
  //       coffeeSearchData.sort((a, b) => b.price - a.price)
  //     );
  //     setChocolateSearchData(() =>
  //       chocolateSearchData.sort((a, b) => b.price - a.price)
  //     );
  //   } else if (e.target.value === "newest") {
  //     setCoffeeSearchData(() =>
  //       coffeeSearchData.sort((a, b) => b.createdAt - a.createdAt)
  //     );
  //     setChocolateSearchData(() =>
  //       chocolateSearchData.sort((a, b) => b.createdAt - a.createdAt)
  //     );
  //   }
  // };

  return (
    <Box mt="10">
      <HStack>
        <Heading>Marketplace</Heading>
      </HStack>
      <HStack spacing={1} mt={3}>
        <InputGroup size="md" mr={5} w="96">
          <Input
            placeholder="Search"
            {...register("term")}
            onKeyDown={
              tab === "coffee" ? onEnterCoffeeSearch : onEnterChocolateSearch
            }
          />
          <InputRightElement>
            <Search2Icon />
          </InputRightElement>
        </InputGroup>
        {/* <Select placeholder="Filter" w="60" onChange={onClickOrderBy}>
          <option value="price">Price</option>
          <option value="newest">Newest</option>
        </Select> */}
      </HStack>
      <Tabs mt={3} colorScheme="teal">
        <TabList>
          <Tab onChange={() => setTab("coffee")}>Coffee</Tab>
          <Tab onChange={() => setTab("chocolate")}>Chocolate</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid
              mt={5}
              columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
              spacing={4}
            >
              {coffeeSearchData.map((coffee) => (
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
              {chocolateSearchData.map((coffee) => (
                <ProductCard data={coffee} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
