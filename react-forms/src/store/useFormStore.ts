import { create } from 'zustand';

interface submissionData {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  agreement: boolean;
  password: string;
  country: string;
}

interface submission {
  submissions: submissionData[];
  addSubmission: (data: Omit<submissionData, 'id'>) => void;
}

export const useFormStore = create<submission>((set) => ({
  submissions: [],
  addSubmission: (data) => {
    const newSubmission: submissionData = {
      ...data,
      id: Date.now().toString(),
    };

    set((state) => ({
      submissions: [...state.submissions, newSubmission],
    }));
  },
}));
