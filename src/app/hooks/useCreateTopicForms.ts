import { create } from "zustand";

interface TopicFormData {
  name?: string;
  description?: string;
  learning_objective?: string;
  enable_open_time?: boolean;
  enable_close_time?: boolean;
  open_time?: string;
  close_time?: string;
  id?: number;
}

interface CreateTopicFormsStore {
  isOpen: boolean;
  create: boolean;
  name?: string;
  description?: string;
  learning_objective?: string;
  enable_open_time?: boolean;
  enable_close_time?: boolean;
  open_time?: string;
  close_time?: string;
  id?: number;
  
  open: (create?: boolean, data?: TopicFormData) => void;
  close: () => void;
}

const useCreateTopicForms = create<CreateTopicFormsStore>((set) => ({
  isOpen: false,
  create: true,
  name: "",
  description: "",
  learning_objective: "",
  enable_open_time: false,
  enable_close_time: false,
  open_time: "",
  close_time: "",
  id: undefined,
  
  open: (create = true, data?: TopicFormData) => set({ 
    isOpen: true, 
    create,
    name: data?.name || "",
    description: data?.description || "",
    learning_objective: data?.learning_objective || "",
    enable_open_time: data?.enable_open_time || false,
    enable_close_time: data?.enable_close_time || false,
    open_time: data?.open_time || "",
    close_time: data?.close_time || "",
    id: data?.id
  }),
  
  close: () => set({ 
    isOpen: false, 
    create: true, 
    name: "", 
    description: "", 
    learning_objective: "",
    id: undefined,
    enable_open_time: false,
    enable_close_time: false,
    open_time: "",
    close_time: ""
  }),
}));

export default useCreateTopicForms;