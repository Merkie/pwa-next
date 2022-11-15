import Application from "./Application";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import jwtcreate from "../../lib/resources/jwt";
import { User } from "@prisma/client";

const checkToken = async () => {
  const nextCookies = cookies();
  const auth = nextCookies.get("auth")?.value;
  if (auth) {
    try {
      const user = jwt.verify(
        auth + "",
        process.env.SECRET + ""
      ) as unknown as {
        data: string;
      };

      const new_token = await jwtcreate({
        id: JSON.parse(user.data).id,
        email: JSON.parse(user.data).email,
      });

      return { success: true, token: new_token, user };
    } catch (error) {
      return { success: false, message: "There was an error." };
    }
  }
  return { success: false, message: "No token" };
};

export default async function App() {
  const data = await checkToken();
  if (data.success) {
    return <Application user={data.user as unknown as User} />;
  }
  return <h1>Error, unauthorized.</h1>;
}
