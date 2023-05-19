"use client";

import { userState } from "@/atom";
import initializeFirebaseClient from "@/lib/initFirebase";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function Header() {
  const { auth } = initializeFirebaseClient();
  const user = useRecoilValue(userState);
  const router = useRouter();

  const onClickSignout = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <HStack w="full" alignItems="center" justifyContent="space-between" pt="4">
      <HStack>
        <Heading as={NextLink} href="/" mr={5} cursor="pointer">
          AMF
        </Heading>
        <Link as={NextLink} fontSize="md" href="/marketplace">
          Market
        </Link>
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
