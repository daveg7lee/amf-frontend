import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";

interface IProductCardProps {
  data: DocumentData;
}

export default function ProductCard({ data }: IProductCardProps) {
  console.log(data.id);
  return (
    <Link href={`marketplace/${data.id}`}>
      <Card
        direction={{ sm: "column", lg: "row" }}
        overflow="hidden"
        variant="outline"
        cursor="pointer"
      >
        <Image
          objectFit="cover"
          maxW={{ sm: "100%", lg: "180px" }}
          src={data.img}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{data.title}</Heading>

            <Text py="2">{data.company}</Text>
          </CardBody>

          <CardFooter>
            <HStack alignItems="center">
              <Icon width="5" height="5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="black" />
                <path
                  d="M12.4238 4.66319C12.0485 4.33509 11.6924 4.56699 11.5612 4.72395L5.22076 15.9493C4.99075 16.4961 5.46793 16.7341 5.73527 16.7847H9.10979C9.99353 16.7726 10.4868 16.2632 10.623 16.01L13.816 10.3746C13.9774 10.1417 14.3335 9.55737 14.4667 9.08344C14.5998 8.60952 14.4414 8.14673 14.3456 7.97458L12.4238 4.66319Z"
                  fill="white"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M16.6297 12.0557C16.2287 11.5697 15.7943 11.8532 15.6272 12.0557L13.4854 15.7621C13.0722 16.479 13.6171 16.7595 13.9411 16.8102H18.3158C18.972 16.713 18.9639 16.2127 18.8778 15.9747L16.6297 12.0557Z"
                  fill="white"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </Icon>
              <Text>{data.price}</Text>
            </HStack>
          </CardFooter>
        </Stack>
      </Card>
    </Link>
  );
}
