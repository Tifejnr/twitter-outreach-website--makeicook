import { create } from "zustand";

const useStore = create((set) => ({
  creditsFromServer: "",

  setCreditsFromServer: (fetchedCredits) =>
    set((state) => ({ creditsFromServer: fetchedCredits })),

  count: 0,
  // Function to increment the count
  increment: () => set((state) => ({ count: state.count + 1 })),

  checkboxesArray: [],

  // Function to push a new string into the checkboxesArray
  pushCheckboxesArray: (newString) =>
    set((state) => ({
      checkboxesArray: [...state.checkboxesArray, newString],
    })),
}));

export default useStore;
