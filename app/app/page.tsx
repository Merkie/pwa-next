import Application from "./Application";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import jwtcreate from "../../lib/resources/jwt";
import { User } from "@prisma/client";
import pc from "../../lib/resources/prisma";

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

// function that recursively checks for a Date object and converts it to a string
const convertDate = (obj: any) => {
  for (const key in obj) {
    if (obj[key] instanceof Date) {
      obj[key] = obj[key].toISOString();
    } else if (typeof obj[key] === "object") {
      convertDate(obj[key]);
    }
  }
};

export default async function App() {
  const data = await checkToken();

  if (data.success) {
    const userId = (JSON.parse(data.user?.data + "") as unknown as User).id;
    const user = await pc.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: {
          include: {
            pages: {
              include: {
                tiles: true,
              },
            },
          },
        },
      },
    });
    if (!user) return <div>There was an error.</div>;
    //@ts-ignore
    delete user?.hashedPassword;
    // convert Date objects to strings
    convertDate(user);
    return <Application user={user} />;
  }
  return <h1>Error, unauthorized.</h1>;
}
