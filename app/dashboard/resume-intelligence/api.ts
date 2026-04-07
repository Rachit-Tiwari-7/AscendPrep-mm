/**
 * Resume Intelligence API client.
 */

import { apiClient } from '@/app/api/client';

export interface ResumeAnalysisRequest {
  resume_id: number;
  target_role?: string;
  target_company_type?: 'startup' | 'faang' | 'enterprise';
}

export interface ResumeInsight {
  id: number;
  user_id: number;
  resume_id: number;
  technical_skills: string[];
  soft_skills: string[];
  languages: string[];
  certifications: string[];
  experience_level: string;
  years_of_experience: number;
  industries: string[];
  roles: string[];
  technologies: string[];
  programming_languages: string[];
  frameworks: string[];
  tools: string[];
  project_domains: string[];
  key_achievements: string[];
  education_level?: string;
  degrees: string[];
  missing_skills: string[];
  suggested_roles: string[];
  suggested_career_paths: string[];
  resume_score: number;
  technical_depth_score: number;
  experience_quality_score: number;
  education_score: number;
  presentation_score: number;
  recommended_dsa_topics: string[];
  recommended_interview_topics: string[];
  analysis_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface ResumeDashboardStats {
  total_resumes: number;
  latest_resume_id?: number;
  latest_resume_score: number;
  skills_detected: number;
  top_skills: string[];
  skill_gaps_count: number;
  suggested_roles: string[];
  recommended_dsa_topics: string[];
}

export interface SkillGapDetail {
  skill: string;
  category: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  description?: string;
  learning_resources?: string[];
}

export interface SkillGapAnalysis {
  target_role: string;
  target_company_type?: string;
  required_skills: string[];
  user_skills: string[];
  missing_skills: SkillGapDetail[];
  matching_skills: string[];
  match_percentage: number;
  skill_gap_score: number;
  recommendations: string[];
  learning_path: string[];
}

export interface InterviewPersonalizationContext {
  user_id: number;
  resume_id?: number;
  technical_skills: string[];
  experience_level: string;
  detected_domains: string[];
  missing_competencies: string[];
  suggested_focus_areas: string[];
}

export const resumeIntelligenceApi = {
  // Analyze a resume
  analyze: async (request: ResumeAnalysisRequest): Promise<ResumeInsight> => {
    const response = await apiClient.post('/resume-intelligence/analyze', request);
    return response.data;
  },

  // List all insights
  list: async (): Promise<ResumeInsight[]> => {
    const response = await apiClient.get('/resume-intelligence/insights');
    return response.data;
  },

  // Get insight by resume ID
  getByResumeId: async (resumeId: number): Promise<ResumeInsight> => {
    const response = await apiClient.get(`/resume-intelligence/insights/${resumeId}`);
    return response.data;
  },

  // Get dashboard stats
  getDashboardStats: async (): Promise<ResumeDashboardStats> => {
    const response = await apiClient.get('/resume-intelligence/dashboard-stats');
    return response.data;
  },

  // Analyze skill gap for target role
  analyzeSkillGap: async (
    targetRole: string,
    targetCompanyType?: string
  ): Promise<SkillGapAnalysis> => {
    const params = new URLSearchParams();
    params.append('target_role', targetRole);
    if (targetCompanyType) {
      params.append('target_company_type', targetCompanyType);
    }
    const response = await apiClient.post(`/resume-intelligence/skill-gap?${params.toString()}`);
    return response.data;
  },

  // Get interview personalization context
  getInterviewContext: async (): Promise<InterviewPersonalizationContext> => {
    const response = await apiClient.get('/resume-intelligence/interview-context');
    return response.data;
  },
};
