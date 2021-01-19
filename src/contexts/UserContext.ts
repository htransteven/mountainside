import { createContext } from "react";

import { IUser } from "../models/user";

export interface IUserContext {
  user: IUser | null;
}

export const UserContext = createContext<IUser | null>(null);
