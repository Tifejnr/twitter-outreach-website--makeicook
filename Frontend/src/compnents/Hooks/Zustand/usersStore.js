import { create } from "zustand";

const useStore = create((set) => ({
  creditsFromServer: "",

  setCreditsFromServer: (fetchedCredits) =>
    set((state) => ({ creditsFromServer: fetchedCredits })),
}));

export default useStore;
