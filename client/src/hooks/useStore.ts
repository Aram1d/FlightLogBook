import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useStore = create<{
  loginToken: string;
  setLoginToken: (token: string) => void;
  clientUUID: string;

  deletePopoverMutex: Record<never, never> | null;
  setDeletePopoverMutex: (mutex: Record<never, never>) => void;

  flightLogFormReset: boolean;
  flightLogFormToggle: () => void;
}>()(
  persist(
    (set, get) => ({
      loginToken: "",
      setLoginToken: token => set({ loginToken: token }),
      clientUUID: uuidv4(),

      deletePopoverMutex: null,
      setDeletePopoverMutex: mutex =>
        set({
          deletePopoverMutex: mutex === get().deletePopoverMutex ? null : mutex
        }),

        flightLogFormReset: false,
        flightLogFormToggle: () =>
          set({
            flightLogFormReset: !get().flightLogFormReset
          })
    }),
    { name: "FLB" }
  )
);
