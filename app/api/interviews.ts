import { apiClient } from '@/app/api/client';

export interface Interview {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  type: string;
  turn_count: number;
  created_at: string;
  completed_at?: string;
  conversation_history?: InterviewMessage[];
  feedback?: {
    overall_score: number;
    communication_score?: number;
    technical_score?: number;
    problem_solving_score?: number;
    code_quality_score?: number;
    topics_covered?: string[];
    skill_breakdown?: Record<string, any>;
    detected_issues?: Array<{
      issue_type: string;
      severity: string;
      description: string;
      count: number;
      context: string;
    }>;
  };
}

export interface CreateInterviewRequest {
  resume_id?: number;
  job_description?: string;
  interview_type?: string;
}

export interface InterviewMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface SkillProgressionData {
  communication: Array<{ interview_id: number; interview_title: string; date: string; score: number }>;
  technical: Array<{ interview_id: number; interview_title: string; date: string; score: number }>;
  problem_solving: Array<{ interview_id: number; interview_title: string; date: string; score: number }>;
  code_quality: Array<{ interview_id: number; interview_title: string; date: string; score: number }>;
}

export interface SkillAveragesData {
  communication: number;
  technical: number;
  problem_solving: number;
  code_quality: number;
}

export interface SkillComparisonData {
  comparison: {
    communication: Record<number, number>;
    technical: Record<number, number>;
    problem_solving: Record<number, number>;
    code_quality: Record<number, number>;
  };
  interviews: Array<{
    id: number;
    title: string;
    completed_at: string | null;
  }>;
}

export interface UserAnalytics {
  total_interviews: number;
  completed_interviews: number;
  in_progress_interviews: number;
  average_turn_count: number;
  average_quality: number;
  average_code_quality: number;
  total_code_submissions: number;
  topics_covered: string[];
  improvement_trend: Array<{ interview_id: number; score: number; date: string | null }>;
  recent_interviews: Array<{
    id: number;
    title: string;
    status: string;
    completed_at: string | null;
    quality_score: number | null;
  }>;
}

export interface SkillBreakdown {
  communication: { score: number; strengths: string[]; weaknesses: string[]; recommendations: string[] };
  technical: { score: number; strengths: string[]; weaknesses: string[]; recommendations: string[] };
  problem_solving: { score: number; strengths: string[]; weaknesses: string[]; recommendations: string[] };
  code_quality: { score: number; strengths: string[]; weaknesses: string[]; recommendations: string[] };
}

export interface InterviewSkillBreakdown {
  interview_id: number;
  interview_title: string;
  completed_at: string | null;
  skill_breakdown: SkillBreakdown;
  detected_issues?: Array<{
    issue_type: string;
    severity: string;
    description: string;
    count: number;
    context: string;
  }>;
}

export interface InterviewInsights {
  interview_id: number;
  title: string;
  status: string;
  turn_count: number;
  duration_minutes: number | null;
  topics_covered: string[];
  code_submissions: number;
  average_code_quality: number;
  conversation_quality: {
    overall_score?: number;
    communication_score?: number;
    technical_score?: number;
    problem_solving_score?: number;
    code_quality_score?: number;
  };
}

export const interviewsApi = {
  list: async (): Promise<Interview[]> => {
    try {
      const response = await apiClient.get('/interviews');
      return response.data;
    } catch (err) {
      console.warn("API List failed, using local storage/fallback");
      const local = localStorage.getItem('mock_interviews');
      if (local) return JSON.parse(local);
      return [{
         id: 1,
         title: 'Mock Software Engineering Interview',
         status: 'pending',
         type: 'Technical',
         turn_count: 0,
         created_at: new Date().toISOString()
      }];
    }
  },

  get: async (id: number): Promise<Interview> => {
    try {
      const response = await apiClient.get(`/interviews/${id}`);
      return response.data;
    } catch (err) {
      console.warn("API Get failed, using fallback");
      return {
         id,
         title: 'Mock Interview (Local Mode)',
         status: 'pending',
         type: 'Behavioral',
         turn_count: 0,
         created_at: new Date().toISOString(),
         conversation_history: []
      };
    }
  },

  create: async (data: CreateInterviewRequest): Promise<Interview> => {
    try {
      const response = await apiClient.post('/interviews', data);
      return response.data;
    } catch (err) {
      console.warn("API Create failed, mocking locally");
      const newInterview: Interview = {
        id: Math.floor(Math.random() * 1000),
        title: data.job_description ? `Interview for job ${data.job_description.substring(0, 10)}...` : 'New Interview',
        status: 'pending',
        type: 'Behavioral',
        turn_count: 0,
        created_at: new Date().toISOString()
      };
      const existing = await interviewsApi.list();
      localStorage.setItem('mock_interviews', JSON.stringify([...existing, newInterview]));
      return newInterview;
    }
  },

  sendMessage: async (id: number, message: string): Promise<{ response: string }> => {
    const response = await apiClient.post(`/interviews/${id}/message`, { message });
    return response.data;
  },

  complete: async (id: number): Promise<void> => {
    await apiClient.post(`/interviews/${id}/complete`);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/interviews/${id}`);
  },

  getMessages: async (id: number): Promise<InterviewMessage[]> => {
    const response = await apiClient.get(`/interviews/${id}/messages`);
    return response.data;
  },

  start: async (id: number): Promise<Interview> => {
    const response = await apiClient.post(`/interviews/${id}/start`);
    return response.data;
  },

  // Analytics methods - connected to real backend endpoints
  getUserAnalytics: async (): Promise<UserAnalytics> => {
    const response = await apiClient.get('/interviews/analytics/user');
    return response.data;
  },

  getSkillProgression: async (): Promise<SkillProgressionData> => {
    const response = await apiClient.get('/interviews/analytics/skills/progression');
    return response.data;
  },

  getSkillAverages: async (): Promise<SkillAveragesData> => {
    const response = await apiClient.get('/interviews/analytics/skills/averages');
    return response.data;
  },

  compareSkillInterviews: async (ids: number[]): Promise<SkillComparisonData> => {
    const response = await apiClient.get(`/interviews/analytics/skills/compare?interview_ids=${ids.join(',')}`);
    return response.data;
  },

  getInterviewSkills: async (id: number): Promise<{ interview_id: number; interview_title: string; completed_at: string | null; skill_breakdown: SkillBreakdown }> => {
    const response = await apiClient.get(`/interviews/${id}/skills`);
    return response.data;
  },

  getInterviewInsights: async (id: number): Promise<InterviewInsights> => {
    const response = await apiClient.get(`/interviews/${id}/insights`);
    return response.data;
  },

  generateFeedback: async (id: number): Promise<InterviewSkillBreakdown> => {
    const response = await apiClient.post(`/interviews/${id}/feedback`);
    return response.data;
  },
};
