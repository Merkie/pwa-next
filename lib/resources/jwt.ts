import pc from "./prisma";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async function JWT({
  email,
  id,
}: {
  email: string;
  id: string;
}) {
  // get user
  const user = await pc.user.findFirst({ where: { id, email } });
  if (!user) return null;
  // delete hashed password
  delete (user as unknown as { hashedPassword?: string }).hashedPassword;
  // return token
  return jwt.sign(
    {
      data: JSON.stringify(user),
    },
    process.env.SECRET + "",
    { expiresIn: "24h" }
  );
}
