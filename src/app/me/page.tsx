"use client";

import { userState } from "@/atom";
import initializeFirebaseClient from "@/lib/initFirebase";
import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { DocumentData } from "firebase-admin/firestore";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Me() {
  const user = useRecoilValue(userState);
  const address = useAddress();
  const { db } = initializeFirebaseClient();

  const [userData, setUserData] = useState<DocumentData>();
  const [recentItems, setRecentItems] = useState<DocumentData[]>();

  const getUserData = async () => {
    if (!user?.uid) return;

    const usersRef = doc(db, "users", user.uid);
    const data = await getDoc(usersRef);
    if (data.exists()) {
      setUserData(data.data());
    }
  };

  const getRecentItems = async () => {
    if (!user?.uid) return;

    const recentItemsRef = collection(db, "users", user.uid, "shopping-list");
    const querySnapshot = await getDocs(recentItemsRef);
    setRecentItems(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getUserData();
    getRecentItems();
  }, [user]);

  return (
    <Box my="10">
      <HStack spacing="14" alignItems="center" justifyContent="start">
        {userData?.img ? (
          <Image src={userData?.img} width="48" />
        ) : (
          <SkeletonCircle size="48" />
        )}
        <VStack justifyContent="start" alignItems="start">
          <Text fontSize="2xl" fontWeight="bold">
            Wallet Address
          </Text>
          {address ? (
            <Text fontSize="lg">{address}</Text>
          ) : (
            <Skeleton height="7" w="full" />
          )}
        </VStack>
        <VStack justifyContent="start" alignItems="start">
          <Text fontSize="2xl" fontWeight="bold">
            Asset
          </Text>
          <Text fontSize="lg">0xxxxxxxx0xxx</Text>
        </VStack>
      </HStack>
      <Tabs px="16" mt="14" colorScheme="teal">
        <TabList>
          <Tab>Recent Item</Tab>
          <Tab>My Staking</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 2, xl: 3 }} spacing={4}>
              {recentItems
                ? recentItems.map((recentItem) => (
                    <Card
                      direction="column"
                      overflow="hidden"
                      variant="outline"
                      cursor="pointer"
                    >
                      <Image
                        objectFit="cover"
                        maxW="100%"
                        src={recentItem.img}
                        alt="Caffe Latte"
                      />
                      <Stack>
                        <CardBody>
                          <Heading size="md">{recentItem.title}</Heading>
                        </CardBody>
                      </Stack>
                    </Card>
                  ))
                : null}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>TODO</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
