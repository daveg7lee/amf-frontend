"use client";

import initializeFirebaseClient from "@/lib/initFirebase";
import { Button, Center, useToast } from "@chakra-ui/react";
import {
  useAuth,
  useAddress,
  ConnectWallet,
  Web3Button,
} from "@thirdweb-dev/react";
import { signInWithCustomToken } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const thirdwebAuth = useAuth();
  const address = useAddress();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { auth, db } = initializeFirebaseClient();

  async function signIn() {
    setIsLoading(true);

    const payload = await thirdwebAuth.login({
      domain: "http://localhost:3000",
    });

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    const { token } = await res.json();

    const userCredential = await signInWithCustomToken(auth, token);

    const user = userCredential.user;

    const usersRef = doc(db, "users", user.uid!);

    const userDoc = await getDoc(usersRef);

    if (!userDoc.exists()) {
      router.push("/onboarding");
    } else {
      router.push("/");
      toast({ title: "you are logged in!", status: "success" });
    }
  }

  return (
    <Center w="full" h="90vh">
      {address ? (
        <Button isLoading={isLoading} onClick={() => signIn()}>
          Sign in with Wallet
        </Button>
      ) : (
        <ConnectWallet />
      )}
    </Center>
  );
}
