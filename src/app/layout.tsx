"use client";

import {Footer} from "@/components/Footer"
import "./globals.css";
import { Providers } from "./providers";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Header from "@/components/Header";
import { RecoilRoot } from "recoil";
import { Box, ColorModeScript, Container } from "@chakra-ui/react";
import {Html} from "next/document";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <>
      <body style={{ minHeight: "100vh" }}>
        <ColorModeScript initialColorMode="dark" />
        <ThirdwebProvider
          authConfig={{
            // Set this to your domain to prevent signature malleability attacks.
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN ?? "",
          }}
          activeChain={{
            chainId: 2000777,
            rpc: [
              "http://aops-custom-202305-2crvsg-nlb-1d600174371701f9.elb.ap-northeast-2.amazonaws.com:9650/ext/bc/XpX1yGquejU5cma1qERzkHKDh4fsPKs4NttnS1tErigPzugx5/rpc",
            ],
            nativeCurrency: {
              decimals: 18,
              name: "Avalanche coin",
              symbol: "AVAX",
            },
            shortName: "AVAX",
            slug: "AVAX",
            testnet: true,
            chain: "Glitch",
            name: "Glitch devnet",
          }}
        >
          <RecoilRoot>
            <Providers>
              <Box px={{ sm: "3", md: "5", lg: "10" }} minH="100vh">
                <Header />
                {children}
                <Footer/>
              </Box>
            </Providers>
          </RecoilRoot>
        </ThirdwebProvider>
      </body>
    </>
  );
}
