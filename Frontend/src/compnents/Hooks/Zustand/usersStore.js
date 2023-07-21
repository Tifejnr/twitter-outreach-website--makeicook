import { create } from "zustand";

const useStore = create((set) => ({
  taskTitle: "",

  setTaskTitle: (newTitle) => set((state) => ({ taskTitle: newTitle })),
}));

export default useStore;
