"use client";

import { userState } from "@/atom";
import initializeFirebaseClient from "@/lib/initFirebase";
import {
  Box,
  HStack,
  Image,
  SkeletonCircle,
  SkeletonText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAddress, useWallet } from "@thirdweb-dev/react";
import { DocumentData } from "firebase-admin/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default function Me() {
  const user = useRecoilValue(userState);
  const address = useAddress();
  const { db } = initializeFirebaseClient();

  const [userData, setUserData] = useState<DocumentData>();

  const getUserData = async () => {
    if (!user?.uid) return;

    const usersRef = doc(db, "users", user.uid);
    const data = await getDoc(usersRef);
    if (data.exists()) {
      setUserData(data.data());
    }
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  return (
    <Box mt="10">
      <HStack spacing="20" alignItems="center" justifyContent="start">
        {userData?.img ? (
          <Image src={userData?.img} width="60" />
        ) : (
          <SkeletonCircle size="60" />
        )}
        <VStack justifyContent="start" alignItems="start">
          <Text fontSize="2xl" fontWeight="bold">
            Wallet Address
          </Text>
          {address ? <Text fontSize="lg">{address}</Text> : <SkeletonText />}
        </VStack>
        <VStack justifyContent="start" alignItems="start">
          <Text fontSize="2xl" fontWeight="bold">
            Asset
          </Text>
          <Text fontSize="lg">0xxxxxxxx0xxx</Text>
        </VStack>
      </HStack>
      <Tabs px="28" mt="14">
        <TabList>
          <Tab>Recent Item</Tab>
          <Tab>My Staking</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>TODO</TabPanel>
          <TabPanel>TODO</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
