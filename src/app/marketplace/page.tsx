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
  const [searchData, setSearchData] = useState<DocumentData[]>([]);

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

  const onEnterChocolateSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && watch("term") !== "") {
      setSearchData(() =>
        chocolates.filter((i) =>
          i.title.toLowerCase().includes(watch("term").toLowerCase())
        )
      );
    } else {
      setSearchData([]);
    }
  };

  const onEnterCoffeeSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && watch("term") !== "") {
      setSearchData(() =>
        coffees.filter((i) =>
          i.title.toLowerCase().includes(watch("term").toLowerCase())
        )
      );
    } else {
      setSearchData([]);
    }
  };

  const onClickOrderBy = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "price") {
      if (tab === "coffee") {
        setSearchData(() => coffees.sort((a, b) => b.price - a.price));
      } else {
        setSearchData(() => chocolates.sort((a, b) => b.price - a.price));
      }
    } else if (e.target.value === "newest") {
      if (tab === "coffee") {
        setSearchData(() => coffees.sort((a, b) => b.createdAt - a.createdAt));
      } else {
        setSearchData(() =>
          chocolates.sort((a, b) => b.createdAt - a.createdAt)
        );
      }
    }
  };

  return (
    <Box mt="10">
      <HStack>
        <Heading>Marketplace</Heading>
      </HStack>
      <HStack w="50%" mt={3}>
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
        <Select
          placeholder="Filter"
          w={{ md: "40", lg: "60" }}
          onChange={onClickOrderBy}
        >
          <option value="price">Price</option>
          <option value="newest">Newest</option>
        </Select>
      </HStack>
      <Tabs mt={3}>
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
              {searchData.length !== 0
                ? searchData.map((coffee) => <ProductCard data={coffee} />)
                : coffees.map((coffee) => <ProductCard data={coffee} />)}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              mt={5}
              columns={{ sm: 1, md: 2, lg: 2, xl: 3 }}
              spacing={4}
            >
              {searchData.length !== 0
                ? searchData.map((coffee) => <ProductCard data={coffee} />)
                : chocolates.map((chocolate) => (
                    <ProductCard data={chocolate} />
                  ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
