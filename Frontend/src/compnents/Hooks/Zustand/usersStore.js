import { create } from "zustand";

const useStore = create((set) => ({
  creditsFromServer: "",

  setCreditsFromServer: (fetchedCredits) =>
    set((state) => ({ creditsFromServer: fetchedCredits })),

  //change members and boards names while being added
  userDetails: "",

  setuserDetails: (updatedDetails) =>
    set((state) => ({ userDetails: updatedDetails })),

  //change boards names while being added
  sectionName: "",

  setSectionName: (updatedSectionName) =>
    set((state) => ({ sectionName: updatedSectionName })),

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

  // Incrementing Total attempts length
  totalAttemptLength: 0,
  incrementTotalAttemptLength: () =>
    set((state) => ({ totalAttemptLength: state.totalAttemptLength + 1 })),
}));

export default useStore;
