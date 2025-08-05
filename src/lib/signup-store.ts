import { create } from "zustand";
import { SignUpFormData } from "./signup-schema";

interface SignUpStore {
  currentStep: number;
  isSubmitting: boolean;
  formData: SignUpFormData;

  // Actions
  setCurrentStep: (step: number) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  updateFormData: (data: Partial<SignUpFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

const initialFormData: SignUpFormData = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  type: "Student",
  school: "",
  programme: "",
  level: "",
};

export const useSignUpStore = create<SignUpStore>((set) => ({
  currentStep: 0,
  isSubmitting: false,
  formData: initialFormData,

  setCurrentStep: (step) => set({ currentStep: step }),

  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  resetForm: () =>
    set({
      currentStep: 0,
      isSubmitting: false,
      formData: initialFormData,
    }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 3),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
}));
