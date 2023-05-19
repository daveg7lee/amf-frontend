"use client";

import { userState } from "@/atom";
import initializeFirebaseClient from "@/lib/initFirebase";
import {
  Avatar,
  Button,
  HStack,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Header() {
  const setUser = useSetRecoilState(userState);
  const { colorMode, toggleColorMode } = useColorMode();
  const { auth } = initializeFirebaseClient();
  const user = useRecoilValue(userState);
  const address = useAddress();
  const router = useRouter();

  const onClickSignout = () => {
    auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const userCopy = JSON.parse(JSON.stringify(user));
      setUser(userCopy);
    });
  }, []);

  return (
    <HStack w="full" alignItems="center" justifyContent="space-between" pt="4">
      <HStack spacing={10}>
        <Heading as={NextLink} href="/" cursor="pointer">
          AMF
        </Heading>
        <HStack spacing={8}>
          <Link
            as={NextLink}
            fontSize="md"
            fontWeight="medium"
            href="/marketplace"
          >
            Market
          </Link>
          <Link as={NextLink} fontSize="md" fontWeight="medium" href="/defi">
            Defi
          </Link>
        </HStack>
      </HStack>
      <HStack>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
        {user ? (
          <Menu>
            <MenuButton>
              <HStack>
                <Avatar size="sm" />
                <Text>
                  {address?.substring(0, 5) + "..." + address?.substring(6, 10)}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <NextLink href="/me">
                <MenuItem>My Page</MenuItem>
              </NextLink>
              <MenuItem onClick={onClickSignout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button as={NextLink} href="/signin">
            Sign in
          </Button>
        )}
      </HStack>
    </HStack>
  );
}
