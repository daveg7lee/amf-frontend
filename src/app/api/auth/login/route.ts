import { NextResponse } from "next/server";
import { verifyLogin } from "@thirdweb-dev/auth/evm";
import initializeFirebaseServer from "../../../../lib/initFirebaseAdmin";
import { NextApiRequest } from "next";

export async function POST(req: Request) {
  const { payload } = await req.json();

  const { address, error } = await verifyLogin(
    process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
    payload
  );
  if (!address) {
    return NextResponse.json({ error });
  }
  const { auth } = initializeFirebaseServer();
  const token = await auth.createCustomToken(address);
  return NextResponse.json({ token });
}
