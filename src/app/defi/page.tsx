"use client";

import { Highlight } from '@chakra-ui/react'
import {Card, Image, CardFooter, CardBody, CardHeader} from '@chakra-ui/react'
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
    Text,
    Divider,
    Button,
    Stack,
    ButtonGroup,
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
        <div>
            <HStack mt={"10"}>
                <Heading>Defi</Heading>
            </HStack>

            <Box alignContent={"center"}>
                <Tabs mt="14" colorScheme="teal" ml={"30px"} >
                    <TabList>
                        <Tab>Token Swap</Tab>
                        <Tab>Donation</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Card
                                mt={"20px"} ml={"115px"}
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='outline'
                                width="1200px" height={"400px"}
                            >
                            </Card>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </div>
    );
}
