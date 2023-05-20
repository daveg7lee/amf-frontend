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


export default function Defi() {
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
                                <Image src={"@/../public/Token Swap.png"}/>
                            </Card>
                        </TabPanel>
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
    )
}