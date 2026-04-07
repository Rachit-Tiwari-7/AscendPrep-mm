import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Technical' | 'Soft' | 'Tool' | 'Language';
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  summary: string;
  targetJobRole: string;
}

export interface ATSInsight {
  keyword: string;
  found: boolean;
  importance: 'high' | 'medium' | 'low';
}

export interface ATSScore {
  overall: number;
  skillsMatch: number;
  experienceRelevance: number;
  formatting: number;
  keywordDensity: number;
  impact: number;
}

export interface ATSReport {
  score: ATSScore;
  insights: ATSInsight[];
  recommendations: string[];
  lastAnalyzed: string;
}

interface ResumeStore {
  // Resume Data
  resumeData: ResumeData;
  
  // ATS Data
  atsReport: ATSReport | null;
  
  // UI State
  currentStep: number;
  selectedTemplate: 'modern' | 'professional' | 'creative' | 'minimalist' | 'bold' | 'minimal' | 'compact';
  isAnalyzing: boolean;
  
  // Actions
  setPersonalDetails: (details: Partial<PersonalDetails>) => void;
  setExperience: (experience: Experience[]) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  setEducation: (education: Education[]) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  setProjects: (projects: Project[]) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  setSkills: (skills: Skill[]) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (index: number) => void;
  
  setSummary: (summary: string) => void;
  setTargetJobRole: (role: string) => void;
  
  setATSReport: (report: ATSReport) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  
  setCurrentStep: (step: number) => void;
  setSelectedTemplate: (template: 'modern' | 'professional' | 'creative' | 'minimalist' | 'bold' | 'minimal' | 'compact') => void;
  
  // Utility Actions
  resetResume: () => void;
  exportResumeData: () => string;
  importResumeData: (data: string) => void;
}

const initialResumeData: ResumeData = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
  summary: '',
  targetJobRole: '',
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      // Initial State
      resumeData: initialResumeData,
      atsReport: null,
      currentStep: 0,
      selectedTemplate: 'modern',
      isAnalyzing: false,

      // Personal Details Actions
      setPersonalDetails: (details) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalDetails: { ...state.resumeData.personalDetails, ...details },
          },
        })),

      // Experience Actions
      setExperience: (experience) =>
        set((state) => ({
          resumeData: { ...state.resumeData, experience },
        })),

      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [
              ...state.resumeData.experience,
              { ...experience, id: Date.now().toString() },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      // Education Actions
      setEducation: (education) =>
        set((state) => ({
          resumeData: { ...state.resumeData, education },
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              { ...education, id: Date.now().toString() },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      // Projects Actions
      setProjects: (projects) =>
        set((state) => ({
          resumeData: { ...state.resumeData, projects },
        })),

      addProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [
              ...state.resumeData.projects,
              { ...project, id: Date.now().toString() },
            ],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
        })),

      // Skills Actions
      setSkills: (skills) =>
        set((state) => ({
          resumeData: { ...state.resumeData, skills },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, skill],
          },
        })),

      removeSkill: (index) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((_, i) => i !== index),
          },
        })),

      // Summary and Target Role
      setSummary: (summary) =>
        set((state) => ({
          resumeData: { ...state.resumeData, summary },
        })),

      setTargetJobRole: (targetJobRole) =>
        set((state) => ({
          resumeData: { ...state.resumeData, targetJobRole },
        })),

      // ATS Actions
      setATSReport: (atsReport) =>
        set(() => ({
          atsReport,
        })),

      setIsAnalyzing: (isAnalyzing) =>
        set(() => ({
          isAnalyzing,
        })),

      // UI Actions
      setCurrentStep: (currentStep) =>
        set(() => ({
          currentStep,
        })),

      setSelectedTemplate: (selectedTemplate) =>
        set(() => ({
          selectedTemplate: selectedTemplate as any,
        })),

      // Utility Actions
      resetResume: () =>
        set(() => ({
          resumeData: initialResumeData,
          atsReport: null,
          currentStep: 0,
          selectedTemplate: 'modern',
          isAnalyzing: false,
        })),

      exportResumeData: () => {
        return JSON.stringify(get().resumeData, null, 2);
      },

      importResumeData: (data) => {
        try {
          const parsedData = JSON.parse(data);
          set(() => ({
            resumeData: { ...initialResumeData, ...parsedData },
          }));
        } catch (error) {
          console.error('Failed to import resume data:', error);
        }
      },
    }),
    {
      name: 'resume-ats-storage',
      partialize: (state) => ({
        resumeData: state.resumeData,
        selectedTemplate: state.selectedTemplate,
      }),
    }
  )
);
