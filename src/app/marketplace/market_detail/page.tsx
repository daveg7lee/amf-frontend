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
                <Heading>Coffee</Heading>
            </HStack>
            <Card
                mt={"20px"} ml={"160px"}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                width="1200px" height={"400px"}
                alignContent={"center"}
            >
                <Image
                    ml={"50px"} my={"50px"}
                    width={"350px"} height={"300px"}
                    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                />

                <Stack ml="80px" mt={"50px"}>
                    <SimpleGrid columns={2} spacing={4} mb={"20px"} >
                        <Box>
                            <Text fontSize={"1xl"}>
                                Name : Totally normal coffee
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize={"1xl"}>
                                Coporation : awsome coffee
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize={"1xl"}>
                                Nation : Ghana
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize={"1xl"}>
                                Provider : David
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize={"1xl"}>
                                Date : 23.03.01
                            </Text>
                        </Box>

                        <Box>
                        </Box>

                        <Text>
                            This coffee, Totally Simple coffee. Tatste, flavor, anything is simple. so enjoy simply
                        </Text>

                        <Box>
                        </Box>

                        <Text fontSize={"2xl"}>
                            <a> Current Price <br/>30 AMF
                            </a>
                        </Text>

                        <CardFooter>
                            <Button variant='solid' bg={"#90ee90"} width={"300px"} height={"40px"} fontSize={"1xl"} color={"black"} >
                                Buy Now
                            </Button>
                        </CardFooter>
                    </SimpleGrid>
                </Stack>
            </Card>

            <Box alignContent={"center"}>
                <Tabs mt="14" colorScheme="teal" ml={"30px"} >
                    <TabList>
                        <Tab>Price History</Tab>
                        <Tab>Activity or Offers</Tab>
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
