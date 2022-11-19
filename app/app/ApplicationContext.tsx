"use client";
import { User } from "@prisma/client";
import { createContext } from "react";
export const userContext = createContext<User>({} as User);
