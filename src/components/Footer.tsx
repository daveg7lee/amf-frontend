import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export const Footer = () => (
  <Container as="footer" role="contentinfo" maxW="full">
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      align="center"
    >
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Avalanche Meet Fair trade, Inc. All
        rights reserved.
      </Text>
      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="#"
          aria-label="GitHub"
          icon={<FaGithub fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Twitter"
          icon={<FaTwitter fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  </Container>
);
