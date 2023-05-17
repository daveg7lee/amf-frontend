"use client";

import "./globals.css";
import { Providers } from "./providers";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";
import { Box } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }}>
        <ThirdwebProvider
          authConfig={{
            // Set this to your domain to prevent signature malleability attacks.
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN ?? "",
          }}
        >
          <RecoilRoot>
            <Providers>
              <Box px="10" minH="100vh">
                <Header />
                {children}
              </Box>
            </Providers>
          </RecoilRoot>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
