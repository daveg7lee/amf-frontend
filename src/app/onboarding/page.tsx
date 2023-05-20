"use client";

import initializeFirebaseClient from "@/lib/initFirebase";
import {
  Box,
  Container,
  Divider,
  Stack,
  Text,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
  useToast, SimpleGrid,
} from "@chakra-ui/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  username: string;
  email: string;
  selfEmployed: boolean;
}

export default function Onboarding() {
  const { auth, db } = initializeFirebaseClient();
  const router = useRouter();
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm<IForm>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: IForm) => {
    if (!auth?.currentUser?.uid) return;

    setIsLoading(true);

    const usersRef = doc(db, "users", auth.currentUser.uid);
    setDoc(
      usersRef,
      {
        ...data,
        createdAt: serverTimestamp(),
        img: "https://ipfs.thirdwebcdn.com/ipfs/QmcJh2k69iDQDdZnfdUS4MtWWu1ReEDGkSRudRFfMLrUta/Avalanche_logo_without_text.png",
      },
      { merge: true }
    );

    toast({ title: "you are logged in!", status: "success" });

    router.push("/");
  };

  return (
    <VStack
      h="90vh"
      alignItems="start"
      justifyContent="center"
      maxW="2xl"
      mx="auto"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SimpleGrid columns={3} spacing={10}>
        <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
            borderColor={"#90ee90"}
        >
          <Stack spacing="3">

            <Stack spacing="3">
              <Stack>

              </Stack>
              <HStack>
                <Divider color={"red"}/>
              </HStack>
            </Stack>
            <Stack spacing="3" textAlign={"center"}>
              <Text> Title </Text>
            </Stack>
            <HStack justify="space-between">
              <Text>Description obout our Dapp AMF</Text>
            </HStack>
          </Stack>
        </Box>
        <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="3">

            <Stack spacing="3">
              <Stack>

              </Stack>
              <HStack>
                <Divider color={"red"}/>
              </HStack>
            </Stack>
            <Stack spacing="3" textAlign={"center"}>
              <Text> Title </Text>
            </Stack>
            <HStack justify="space-between">
              <Text>Description obout our Dapp AMF</Text>
            </HStack>
          </Stack>
        </Box>

        <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg-surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="3">

            <Stack spacing="3">
              <Stack>

              </Stack>
              <HStack>
                <Divider color={"red"}/>
              </HStack>
            </Stack>
            <Stack spacing="3" textAlign={"center"}>
              <Text> Title </Text>
            </Stack>
            <HStack justify="space-between">
              <Text>Description obout our Dapp AMF</Text>
            </HStack>
          </Stack>
        </Box>

      </SimpleGrid>

      <Heading mb={2} mt={"4"}>Sign up</Heading>
      <FormControl isInvalid={!!formState.errors.username}>
        <FormLabel>Username</FormLabel>
        <Input
          {...register("username", { required: "plz enter your username" })}
        />
        {formState.errors.username ? (
          <FormErrorMessage>
            {formState.errors.username.message}
          </FormErrorMessage>
        ) : null}
      </FormControl>
      <FormControl isInvalid={!!formState.errors.email}>
        <FormLabel>Email address</FormLabel>
        <Input
          {...register("email", { required: "plz enter your email" })}
          type="email"
        />
        {formState.errors.email ? (
          <FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
        ) : null}
      </FormControl>
      <FormControl>
        <FormLabel>Self-employed</FormLabel>
        <Checkbox {...register("selfEmployed")} />
      </FormControl>
      <HStack justifyContent="end" w="full">
        <Button isLoading={isLoading} type="submit">
          Sign up
        </Button>
      </HStack>
    </VStack>
  );
}
