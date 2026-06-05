import { create } from 'zustand';
import type { validationData } from '../validation/validationSchema';

interface submissionData extends validationData {
  id: string;
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
