import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/app/api/client';

interface User {
  id: number;
  email: string;
  full_name?: string;
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: { id: 1, email: 'demo@example.com', full_name: 'Hackathon Candidate', is_active: true },
      token: 'mock-demo-token',
      isAuthenticated: true,
      isLoading: false,
      
      setAuth: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      }),
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Immediate bypass for demo credentials during hackathon
        if (email === 'demo@example.com') {
           const demoUser: User = {
             id: 1,
             email: 'demo@example.com',
             full_name: 'Hackathon Candidate',
             is_active: true
           };
           const demoToken = 'mock-demo-token';
           localStorage.setItem('token', demoToken);
           set({ user: demoUser, token: demoToken, isAuthenticated: true, isLoading: false });
           return;
        }

        try {
          // Attempt real login first
          const response = await apiClient.post('/auth/login', { email, password });
          const { access_token } = response.data;
          localStorage.setItem('token', access_token);
          const userResponse = await apiClient.get('/auth/me');
          const user = userResponse.data;
          set({ user, token: access_token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.warn("Auth API failed, enabling Hackathon Demo Mode");
          // Demo Bypass: Allow login for any credentials during hackathon demo
          const demoUser: User = {
            id: 1,
            email: email || 'demo@example.com',
            full_name: 'Hackathon Candidate',
            is_active: true
          };
          const demoToken = 'mock-demo-token';
          localStorage.setItem('token', demoToken);
          set({
            user: demoUser,
            token: demoToken,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      },
      
      register: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true });
        try {
          // Register user
          await apiClient.post('/auth/register', { 
            email, 
            password, 
            full_name: fullName 
          });
          
          // Auto-login after registration
          const loginResponse = await apiClient.post('/auth/login', { email, password });
          const { access_token } = loginResponse.data;
          
          // Store token and fetch user
          localStorage.setItem('token', access_token);
          
          const userResponse = await apiClient.get('/auth/me');
          const user = userResponse.data;
          
          set({
            user,
            token: access_token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('auth-storage');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }
        
        try {
          if (token === 'mock-demo-token') {
             set({
               user: { id: 1, email: 'demo@example.com', full_name: 'Hackathon Candidate', is_active: true },
               token,
               isAuthenticated: true,
               isLoading: false,
             });
             return;
          }
          const userResponse = await apiClient.get('/auth/me');
          const user = userResponse.data;
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token invalid, clear it
          localStorage.removeItem('token');
          set({ 
            isAuthenticated: false, 
            isLoading: false,
            user: null,
            token: null,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
