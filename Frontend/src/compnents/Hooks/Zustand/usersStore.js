import { create } from "zustand";

const useStore = create((set) => ({
  creditsFromServer: "",

  setCreditsFromServer: (fetchedCredits) =>
    set((state) => ({ creditsFromServer: fetchedCredits })),

  // Function to push each checkbox ele into the checkboxesArray
  checkboxesArray: [],

  pushCheckboxesArray: (newString) =>
    set((state) => ({
      checkboxesArray: [...state.checkboxesArray, newString],
    })),

  // Incremeenting Functions
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),

  // Incremeenting Functions
  // Incrementing Success Length
  sucessLength: 0,
  incrementSucessLength: () =>
    set((state) => ({ sucessLength: state.sucessLength + 1 })),

  // Incrementing FailureLength
  failureLength: 0,
  incrementFailureLength: () =>
    set((state) => ({ failureLength: state.failureLength + 1 })),
}));

export default useStore;
