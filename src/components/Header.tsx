"use client";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header() {
  return (
    <HStack w="full" alignItems="center" justifyContent="space-between" pt="4">
      <HStack>
        <Heading mr={5}>AMF</Heading>
        <Link as={NextLink} fontSize="lg" href="/marketplace">
          Market
        </Link>
      </HStack>
      <InputGroup size="md" w="30%">
        <Input placeholder="Search" />
        <InputRightElement>
          <Search2Icon />
        </InputRightElement>
      </InputGroup>
      <HStack>
        <Button mr={3}>Sign in</Button>
        <Button>Sign up</Button>
      </HStack>
    </HStack>
  );
}
