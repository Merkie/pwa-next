import type { NextApiRequest, NextApiResponse } from "next";
import pc from "../../../lib/resources/prisma";
import jwt from "../../../lib/resources/jwt";
import bcrypt from "bcrypt";

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
  const { email, password } = req.body as { email: string; password: string };

  // get the user
  const user = await pc.user.findUnique({ where: { email } });

  // if user doesn't exist, error
  if (!user) {
    res.status(401).send({ success: false, message: "User not found" });
    return;
  }
  // if the user doesn't have a password, error
  if (!user.hashedPassword) {
    res.status(401).send({ success: false, message: "User has no password" });
    return;
  }

  // compare the password
  const result = await bcrypt.compare(password, user.hashedPassword);

  // if the password is wrong, error
  if (!result) {
    res.status(401).send({ success: false, message: "Wrong password" });
    return;
  }

  // if the password is correct, send the user
  res
    .status(200)
    .send({
      success: true,
      token: await jwt({ id: user.id, email: user.email }),
    });
}
