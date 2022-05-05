import { useContext, createContext } from "react";

export type Authentication = {
  isAuthenticated: boolean
  userHasAuthenticated:(state: boolean) => void
}

export const AppContext = createContext<Authentication | null>(null);

export function useAppContext(): Authentication | null {
  return useContext(AppContext);
}