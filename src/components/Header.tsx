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
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Header() {
  const setUser = useSetRecoilState(userState);
  const { auth } = initializeFirebaseClient();
  const user = useRecoilValue(userState);
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
        {user ? (
          <Menu>
            <MenuButton>
              <Avatar size="sm" />
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
