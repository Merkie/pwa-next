"use client";
import { Page, Project, Tile, User } from "@prisma/client";
import { createContext } from "react";

type PageWithTiles = Page & { tiles: Tile[] };
type ProjectWithPages = Project & { pages: PageWithTiles[] };
type UserWithProjects = User & { projects: ProjectWithPages[] };
export type UserFull = Omit<UserWithProjects, "hashedPassword">;

export const userContext = createContext<UserFull>({} as UserFull);
