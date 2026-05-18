import { create } from "zustand";

interface CreateKuesionerFormsStore {
  isOpen: boolean;
  kuesionerId?: string;
  open: (id?: string) => void;
  close: () => void;
}

const useCreateKuesionerForms = create<CreateKuesionerFormsStore>((set) => ({
  isOpen: false,
  kuesionerId: undefined,
  open: (id) => set({ isOpen: true, kuesionerId: id }),
  close: () => set({ isOpen: false, kuesionerId: undefined }),
}));

export default useCreateKuesionerForms;
