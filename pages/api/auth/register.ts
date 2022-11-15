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
  const { email, name, password } = req.body as {
    email: string;
    name: string;
    password: string;
  };

  // check if the user already exists
  const tempUser = await pc.user.findUnique({ where: { email } });

  // if the user already exists, error
  if (tempUser) {
    res.status(401).send({ success: false, message: "User already exists" });
    return;
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create the user
  const user = await pc.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // send the user
  res.status(200).send({
    success: true,
    token: await jwt({ id: user.id, email: user.email }),
  });
}
