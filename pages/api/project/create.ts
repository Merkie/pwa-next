import type { NextApiRequest, NextApiResponse } from "next";
import pc from "../../../lib/resources/prisma";
import AuthenticateRoute from "../../../lib/AuthenticateRoute";

// input: { name: string, description: string }
// output: { success: boolean, project?: Project, message?: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // post request only
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  // get the user from the token
  const user = await AuthenticateRoute(req.cookies.auth);
  // if the user is not authenticated, return 401
  if (!user) {
    res.status(401).send({ message: "Not authenticated", success: false });
    return;
  }
  // consume the request body
  const { name, description } = req.body;
  // create the project
  const project = await pc.project.create({
    data: {
      name,
      description,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  // If the project was not created, return 500
  if (!project) {
    res
      .status(500)
      .send({ message: "Failed to create project", success: false });
    return;
  }
  // return the project if everything was successful
  res.status(200).send({ project, success: true });
}
