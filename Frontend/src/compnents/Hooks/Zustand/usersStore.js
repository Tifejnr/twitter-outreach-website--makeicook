import { create } from "zustand";

const useStore = create((set) => ({
  //set credits no
  creditsFromServer: "",

  setCreditsFromServer: (fetchedCredits) =>
    set((state) => ({ creditsFromServer: fetchedCredits })),

  //set credits no
  barWidth: "",

  setBarWidth: (updatedWidth) => set((state) => ({ barWidth: updatedWidth })),

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
  // Incrementing Success Length and reseting when necessary
  sucessLength: 0,
  incrementSucessLength: () =>
    set((state) => ({ sucessLength: state.sucessLength + 1 })),
  resetSucessLength: () => set({ sucessLength: 0 }), // New action to reset sucessLength to 0

  // Incrementing FailureLength and reseting when necessary
  failureLength: 0,
  incrementFailureLength: () =>
    set((state) => ({ failureLength: state.failureLength + 1 })),
  resetFailureLength: () => set({ failureLength: 0 }),

  // Incrementing Total attempts length
  totalAttemptLength: 0,
  incrementTotalAttemptLength: () =>
    set((state) => ({ totalAttemptLength: state.totalAttemptLength + 1 })),

  // Incrementing currentRound  when necessary
  currentRound: 0,
  incrementCurrentRound: () =>
    set((state) => ({ currentRound: state.currentRound + 1 })),
}));

export default useStore;
