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
  imgSize?: string;
}

export default function MainBanner({
  firstText,
  secondText,
  img,
  firstButton,
  secondButton,
  firstLink,
  secondLink,
  imgSize = "18rem",
}: IMainBannerProps) {
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      minH="90vh"
      userSelect="none"
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
            <Button as={Link} href={secondLink} bgColor="#FF5959">
              {secondButton}
            </Button>
          ) : (
            <Button bgColor="#FF5959">{secondButton}</Button>
          )}
        </HStack>
      </Box>
      <Box display={{ base: "none", md: "none", lg: "block" }} width={imgSize}>
        <Image src={`/${img}`} alt="main" />
      </Box>
    </Box>
  );
}
