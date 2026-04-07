'use client';

import { ResumeData } from '@/store/resume-ats/use-resume-store';

// Local storage keys
const RESUMES_STORAGE_KEY = 'frontend-resumes';
const RESUME_TEMPLATES_KEY = 'resume-templates';

export interface FrontendResume {
  id: string;
  name: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  analysis_status: 'draft' | 'completed' | 'processing';
  created_at: string;
  updated_at: string;
  resume_data: ResumeData;
  ats_report?: any;
  template_used?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  preview_data: ResumeData;
}

// Resume templates for frontend generation
const DEFAULT_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    description: 'Professional template for software engineering roles',
    category: 'Technology',
    preview_data: {
      personalDetails: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: ''
      },
      experience: [],
      education: [],
      projects: [],
      skills: [],
      summary: '',
      targetJobRole: 'Software Engineer'
    }
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    description: 'Template for product management positions',
    category: 'Business',
    preview_data: {
      personalDetails: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: ''
      },
      experience: [],
      education: [],
      projects: [],
      skills: [],
      summary: '',
      targetJobRole: 'Product Manager'
    }
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Template for data science and analytics roles',
    category: 'Data',
    preview_data: {
      personalDetails: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: ''
      },
      experience: [],
      education: [],
      projects: [],
      skills: [],
      summary: '',
      targetJobRole: 'Data Scientist'
    }
  }
];

// Frontend resume storage and management
export const frontendResumeApi = {
  // Get all resumes from local storage
  list: (): FrontendResume[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(RESUMES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading resumes:', error);
      return [];
    }
  },

  // Create new resume
  create: (templateId?: string): FrontendResume => {
    const template = templateId ? DEFAULT_TEMPLATES.find(t => t.id === templateId) : DEFAULT_TEMPLATES[0];
    const newResume: FrontendResume = {
      id: Date.now().toString(),
      name: `${template?.name || 'New Resume'} - ${new Date().toLocaleDateString()}`,
      analysis_status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      resume_data: template ? { ...template.preview_data } : DEFAULT_TEMPLATES[0].preview_data,
      template_used: templateId
    };

    const resumes = frontendResumeApi.list();
    resumes.push(newResume);
    localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
    
    return newResume;
  },

  // Update existing resume
  update: (id: string, data: Partial<FrontendResume>): FrontendResume | null => {
    const resumes = frontendResumeApi.list();
    const index = resumes.findIndex(r => r.id === id);
    
    if (index === -1) return null;
    
    resumes[index] = {
      ...resumes[index],
      ...data,
      updated_at: new Date().toISOString()
    };
    
    localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
    return resumes[index];
  },

  // Delete resume
  delete: (id: string): boolean => {
    const resumes = frontendResumeApi.list();
    const filtered = resumes.filter(r => r.id !== id);
    
    if (filtered.length === resumes.length) return false;
    
    localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  // Get specific resume
  get: (id: string): FrontendResume | null => {
    const resumes = frontendResumeApi.list();
    return resumes.find(r => r.id === id) || null;
  },

  // Get templates
  getTemplates: (): ResumeTemplate[] => {
    return DEFAULT_TEMPLATES;
  },

  // Duplicate resume
  duplicate: (id: string): FrontendResume | null => {
    const original = frontendResumeApi.get(id);
    if (!original) return null;

    const duplicate: FrontendResume = {
      ...original,
      id: Date.now().toString(),
      name: `${original.name} (Copy)`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const resumes = frontendResumeApi.list();
    resumes.push(duplicate);
    localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
    
    return duplicate;
  }
};

// Resume content generation utilities
export const resumeContentGenerator = {
  // Generate professional summary based on role and experience
  generateSummary: (role: string, experience: any[], skills: string[]): string => {
    const yearsOfExperience = experience.reduce((total, exp) => {
      const start = new Date(exp.startDate);
      const end = exp.current ? new Date() : new Date(exp.endDate);
      return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    }, 0);

    const roleSpecificSummaries = {
      'Software Engineer': `Experienced Software Engineer with ${Math.round(yearsOfExperience)}+ years of expertise in full-stack development, specializing in ${skills.slice(0, 3).join(', ')}. Proven track record of delivering scalable solutions and leading technical initiatives.`,
      'Product Manager': `Results-driven Product Manager with ${Math.round(yearsOfExperience)}+ years of experience in product strategy and development. Skilled in ${skills.slice(0, 3).join(', ')} with a focus on user-centric solutions and business growth.`,
      'Data Scientist': `Analytical Data Scientist with ${Math.round(yearsOfExperience)}+ years of experience in machine learning and data analysis. Proficient in ${skills.slice(0, 3).join(', ')} with a strong background in statistical modeling and insights generation.`,
      'default': `Professional with ${Math.round(yearsOfExperience)}+ years of experience and expertise in ${skills.slice(0, 3).join(', ')}. Committed to delivering exceptional results and driving organizational success.`
    };

    return roleSpecificSummaries[role] || roleSpecificSummaries['default'];
  },

  // Generate bullet points based on role
  generateBulletPoints: (role: string, company: string): string[] => {
    const roleBullets = {
      'Software Engineer': [
        `Developed and maintained scalable applications at ${company} using modern technologies`,
        `Improved system performance by 30% through optimization and best practices`,
        `Collaborated with cross-functional teams to deliver high-quality software solutions`,
        `Mentored junior developers and conducted code reviews to ensure quality standards`
      ],
      'Product Manager': [
        `Led product strategy and roadmap development at ${company} for key product lines`,
        `Conducted market research and user analysis to identify growth opportunities`,
        `Managed product lifecycle from conception to launch, achieving 25% user growth`,
        `Collaborated with engineering and design teams to deliver user-centric solutions`
      ],
      'Data Scientist': [
        `Developed machine learning models at ${company} that improved prediction accuracy by 40%`,
        `Analyzed large datasets to extract actionable insights for business decisions`,
        `Created data visualization dashboards for real-time performance monitoring`,
        `Collaborated with stakeholders to translate business requirements into data solutions`
      ],
      'default': [
        `Contributed to key projects and initiatives at ${company} with measurable impact`,
        `Collaborated with team members to achieve organizational goals`,
        `Developed and implemented solutions that improved operational efficiency`,
        `Maintained high standards of quality and performance in all deliverables`
      ]
    };

    return roleBullets[role] || roleBullets['default'];
  },

  // Generate skills based on role
  generateSkills: (role: string): any[] => {
    const roleSkills = {
      'Software Engineer': [
        { name: 'JavaScript', level: 'Expert' as const, category: 'Technical' as const },
        { name: 'React', level: 'Expert' as const, category: 'Technical' as const },
        { name: 'Node.js', level: 'Advanced' as const, category: 'Technical' as const },
        { name: 'TypeScript', level: 'Advanced' as const, category: 'Technical' as const },
        { name: 'Python', level: 'Intermediate' as const, category: 'Technical' as const },
        { name: 'AWS', level: 'Intermediate' as const, category: 'Technical' as const }
      ],
      'Product Manager': [
        { name: 'Product Strategy', level: 'Expert' as const, category: 'Business' as const },
        { name: 'Market Research', level: 'Advanced' as const, category: 'Business' as const },
        { name: 'Data Analysis', level: 'Advanced' as const, category: 'Technical' as const },
        { name: 'User Experience', level: 'Intermediate' as const, category: 'Design' as const },
        { name: 'Agile/Scrum', level: 'Expert' as const, category: 'Methodology' as const },
        { name: 'Stakeholder Management', level: 'Advanced' as const, category: 'Soft' as const }
      ],
      'Data Scientist': [
        { name: 'Python', level: 'Expert' as const, category: 'Technical' as const },
        { name: 'Machine Learning', level: 'Expert' as const, category: 'Technical' as const },
        { name: 'Statistics', level: 'Advanced' as const, category: 'Technical' as const },
        { name: 'SQL', level: 'Advanced' as const, category: 'Technical' as const },
        { name: 'Tableau', level: 'Intermediate' as const, category: 'Technical' as const },
        { name: 'Deep Learning', level: 'Intermediate' as const, category: 'Technical' as const }
      ],
      'default': [
        { name: 'Communication', level: 'Expert' as const, category: 'Soft' as const },
        { name: 'Problem Solving', level: 'Advanced' as const, category: 'Soft' as const },
        { name: 'Project Management', level: 'Advanced' as const, category: 'Business' as const },
        { name: 'Data Analysis', level: 'Intermediate' as const, category: 'Technical' as const },
        { name: 'Team Collaboration', level: 'Expert' as const, category: 'Soft' as const }
      ]
    };

    return roleSkills[role] || roleSkills['default'];
  },

  // Generate education template
  generateEducation: (degree?: string): any[] => {
    return [
      {
        id: Date.now().toString(),
        institution: degree?.includes('Master') || degree?.includes('MBA') ? 'University of California' : 'State University',
        degree: degree || 'Bachelor of Science',
        field: degree?.includes('Data') ? 'Data Science' : degree?.includes('Business') ? 'Business Administration' : 'Computer Science',
        startDate: '2018-09',
        endDate: degree?.includes('Master') || degree?.includes('MBA') ? '2020-05' : '2022-05',
        gpa: '3.8'
      }
    ];
  }
};

// Utility to simulate file upload (store file data in localStorage)
export const simulateFileUpload = (file: File, onProgress?: (progress: number) => void): Promise<FrontendResume> => {
  return new Promise((resolve, reject) => {
    try {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Create a resume entry for the uploaded file
          const uploadedResume: FrontendResume = {
            id: Date.now().toString(),
            name: file.name.replace('.pdf', ''),
            file_name: file.name,
            file_size: file.size,
            file_type: file.type,
            analysis_status: 'processing',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            resume_data: {
              personalDetails: {
                fullName: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                portfolio: ''
              },
              experience: [],
              education: [],
              projects: [],
              skills: [],
              summary: '',
              targetJobRole: ''
            }
          };

          // Store in localStorage
          const resumes = frontendResumeApi.list();
          resumes.push(uploadedResume);
          localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
          
          // Simulate processing completion
          setTimeout(() => {
            frontendResumeApi.update(uploadedResume.id, { analysis_status: 'completed' });
            resolve(uploadedResume);
          }, 2000);
        }
        
        onProgress?.(Math.round(progress));
      }, 200);
    } catch (error) {
      reject(error);
    }
  });
};
