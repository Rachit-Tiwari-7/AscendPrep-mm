import { apiClient } from '@/app/api/client';

export interface VoiceSession {
  session_id: string;
  token: string;
  url: string;
}

export const voiceApi = {
  createSession: async (interviewId: number): Promise<VoiceSession> => {
    const response = await apiClient.post('/voice/session', { interview_id: interviewId });
    return response.data;
  },

  endSession: async (sessionId: string): Promise<void> => {
    await apiClient.delete(`/voice/session/${sessionId}`);
  },
};
