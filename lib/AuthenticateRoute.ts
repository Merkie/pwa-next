import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import pc from "./resources/prisma";

export default async function AuthenticateRoute(
  token: string | null | undefined
): Promise<User | null> {
  // If the token provided is not a valid string, return null
  if (!token) return null;
  // Decode the JWT token from the string
  const decoded = jwt.decode(token + "");
  // If the token is not an object, return null
  if (!decoded) return null;
  // Get the user ID from the decoded token's data
  const userId = JSON.parse((decoded as { data: string }).data).id;
  // If we for some reason do not get the ID from the user, return null
  if (!userId) return null;
  // Get the user from the database given the ID
  const user = await pc.user.findUnique({ where: { id: userId } });
  // If the user does not exist, return null
  if (!user) return null;
  // Delete the hashedPassword from the user object
  delete (user as { hashedPassword?: null }).hashedPassword;
  // return the user
  return user as unknown as User;
}
