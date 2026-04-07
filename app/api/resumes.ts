import { apiClient } from '@/app/api/client';

export interface Resume {
  id: number;
  file_name: string;
  file_size: number;
  file_type: string;
  analysis_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  extracted_data?: any;
}

export const resumesApi = {
  list: async (): Promise<Resume[]> => {
    const response = await apiClient.get('/resumes');
    return response.data;
  },

  upload: async (file: File, onProgress?: (progress: number) => void): Promise<Resume> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/resumes/${id}`);
  },
};
