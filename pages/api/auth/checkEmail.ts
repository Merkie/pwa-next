import type { NextApiRequest, NextApiResponse } from "next";
import pc from "../../../lib/resources/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // post request only
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  // get request body
  const { email } = req.body as {
    email: string;
  };

  // check if the user already exists
  const user = await pc.user.findUnique({ where: { email } });

  // if the user already exists, error
  if (user) {
    res.status(401).send({ success: false, message: "User already exists" });
    return;
  }

  // success if the user doesn't exist
  res.status(200).send({ success: true, message: "User does not exist" });
}
