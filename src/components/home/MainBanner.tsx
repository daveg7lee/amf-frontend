import { Heading, HStack, Button, Box, Image } from "@chakra-ui/react";
import Link from "next/link";

interface IMainBannerProps {
  firstText: string;
  secondText: string;
  img: string;
  firstButton: string;
  secondButton: string;
  firstLink?: string;
  secondLink?: string;
}

export default function MainBanner({
  firstText,
  secondText,
  img,
  firstButton,
  secondButton,
  firstLink,
  secondLink,
}: IMainBannerProps) {
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      minH="90vh"
    >
      <Box
        display="flex"
        flexDir="column"
        justifyContent="start"
        alignItems="start"
      >
        <Heading fontSize="7xl" my={3}>
          {firstText}
        </Heading>
        <Heading fontSize="7xl" my={3} textAlign="start">
          {secondText}
        </Heading>
        <HStack mt={6}>
          <Button>{firstButton}</Button>
          {secondLink ? (
            <Button as={Link} href={secondLink}>
              {secondButton}
            </Button>
          ) : (
            <Button>{secondButton}</Button>
          )}
        </HStack>
      </Box>
      <Box
        position="relative"
        display={{ base: "none", md: "none", lg: "block" }}
      >
        <Image src={`/${img}`} alt="main" width="10rem" />
      </Box>
    </Box>
  );
}
