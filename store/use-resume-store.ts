import { create } from 'zustand';

export interface ResumeData {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  links: string[];
  summary: string;
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    duration: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
  }[];
  skills: {
    technical: string[];
    soft: string[];
  };
  certifications: string[];
}

interface ATSReport {
  score: number;
  breakdown: {
    skills: number;
    experience: number;
    keywords: number;
    formatting: number;
  };
  keywords: {
    found: string[];
    missing: string[];
  };
  suggestions: string[];
  compliance: {
    issues: string[];
    is_ats_friendly: boolean;
  };
}

interface ResumeStore {
  resumeData: ResumeData | null;
  atsReport: ATSReport | null;
  isGenerating: boolean;
  isAnalyzing: boolean;
  setResumeData: (data: Partial<ResumeData>) => void;
  setAtsReport: (report: ATSReport | null) => void;
  setGenerating: (status: boolean) => void;
  setAnalyzing: (status: boolean) => void;
  reset: () => void;
}

const initialResumeData: ResumeData = {
  full_name: '',
  email: '',
  phone: '',
  location: '',
  links: [],
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: { technical: [], soft: [] },
  certifications: [],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  atsReport: null,
  isGenerating: false,
  isAnalyzing: false,
  setResumeData: (data) =>
    set((state) => ({
      resumeData: state.resumeData ? { ...state.resumeData, ...data } : null,
    })),
  setAtsReport: (report) => set({ atsReport: report }),
  setGenerating: (status) => set({ isGenerating: status }),
  setAnalyzing: (status) => set({ isAnalyzing: status }),
  reset: () => set({ resumeData: initialResumeData, atsReport: null }),
}));
