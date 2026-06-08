import { create } from 'zustand';
import type { validationData } from '../validation/validationSchema';

interface submissionData extends validationData {
  id: string;
}

interface submission {
  submissions: submissionData[];
  addSubmission: (data: Omit<submissionData, 'id'>) => void;
  countries: string[];
  setCountries: (list: string[]) => void;
}

export const useFormStore = create<submission>((set) => ({
  submissions: [],
  countries: [
    'Armenia',
    'Australia',
    'Azerbaijan',
    'Belarus',
    'Brazil',
    'Canada',
    'China',
    'Estonia',
    'France',
    'Georgia',
    'Germany',
    'India',
    'Italy',
    'Japan',
    'Kazakhstan',
    'Kyrgyzstan',
    'Latvia',
    'Lithuania',
    'Moldova',
    'Poland',
    'Russia',
    'South Korea',
    'Spain',
    'Tajikistan',
    'Turkey',
    'Turkmenistan',
    'Ukraine',
    'United Kingdom',
    'USA',
    'Uzbekistan',
  ],
  addSubmission: (data) => {
    const newSubmission: submissionData = {
      ...data,
      id: Date.now().toString(),
    };

    set((state) => ({
      submissions: [...state.submissions, newSubmission],
    }));
  },

  setCountries: (list) => set({ countries: list }),
}));
