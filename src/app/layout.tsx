"use client";

import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box px="10">
            <Header />
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
