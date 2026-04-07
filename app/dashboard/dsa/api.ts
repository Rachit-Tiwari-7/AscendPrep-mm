import { apiClient } from '@/app/api/client';

export interface DSAQuestion {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  pattern?: string;
  problem_description: string;
  constraints?: string[];
  example_input?: string;
  example_output?: string;
  hints?: string[];
  solution_explanation?: string;
  leetCodeUrl?: string;
  is_completed?: boolean;
  completed_at?: string;
  created_at: string;
}

export interface DSAProgress {
  id: number;
  user_id: number;
  question_id: number;
  is_completed: boolean;
  attempts_count: number;
  time_spent_minutes?: number;
  user_solution?: string;
  notes?: string;
  started_at: string;
  completed_at?: string;
  updated_at: string;
}

export interface DSAQuestionRequest {
  topic: string;
  difficulty: string;
}

export interface DSAProgressUpdate {
  is_completed?: boolean;
  attempts_count?: number;
  time_spent_minutes?: number;
  user_solution?: string;
  notes?: string;
}

export interface DSAStats {
  total_questions_attempted: number;
  total_questions_completed: number;
  topics_practiced: string[];
  difficulty_distribution: { easy: number; medium: number; hard: number };
  average_attempts_per_question: number;
  total_time_spent_minutes: number;
}

export interface DSAAnalytics {
  stats: DSAStats;
  recent_questions: DSAQuestion[];
  progress_by_topic: Record<string, { attempted: number; completed: number }>;
}

export interface DSATopicsResponse {
  topics: Record<string, {
    patterns: string[];
    techniques: string[];
  }>;
  difficulty_levels: string[];
}

export const dsaApi = {
  // Topics
  getTopics: async (): Promise<DSATopicsResponse> => {
    const response = await apiClient.get<DSATopicsResponse>('/dsa/topics');
    return response.data;
  },

  // Questions
  generateQuestion: async (data: DSAQuestionRequest): Promise<DSAQuestion> => {
    const response = await apiClient.post<DSAQuestion>('/dsa/generate', data);
    return response.data;
  },

  listQuestions: async (): Promise<DSAQuestion[]> => {
    const response = await apiClient.get<DSAQuestion[]>('/dsa/questions');
    return response.data;
  },

  getQuestion: async (id: number): Promise<DSAQuestion> => {
    const response = await apiClient.get<DSAQuestion>(`/dsa/questions/${id}`);
    return response.data;
  },

  deleteQuestion: async (id: number): Promise<void> => {
    await apiClient.delete<void>(`/dsa/questions/${id}`);
  },

  // Progress
  updateProgress: async (questionId: number, data: DSAProgressUpdate): Promise<DSAProgress> => {
    const response = await apiClient.put<DSAProgress>(`/dsa/progress/${questionId}`, data);
    return response.data;
  },

  getProgress: async (): Promise<DSAProgress[]> => {
    const response = await apiClient.get<DSAProgress[]>('/dsa/progress');
    return response.data;
  },

  // Analytics
  getAnalytics: async (): Promise<DSAAnalytics> => {
    const response = await apiClient.get<DSAAnalytics>('/dsa/analytics');
    return response.data;
  },
};
