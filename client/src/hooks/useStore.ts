import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useStore = create<{
  loginToken: string;
  setLoginToken: (token: string) => void;
  clientUUID: string;
}>()(
  persist(
    set => ({
      loginToken: "",
      setLoginToken: token => set({ loginToken: token }),
      clientUUID: uuidv4()
    }),
    { name: "FLB" }
  )
);
