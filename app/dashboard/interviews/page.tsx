'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Plus, Play, CheckCircle2, Clock, XCircle, Loader2, Trash2,
  Sparkles, ArrowRight, Brain, Target, Zap, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from '@/components/animations';

interface Interview {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  completed_at?: string;
  turn_count: number;
  feedback?: any;
}

const STORAGE_KEY = 'interviews';

// Local storage helpers
const getStoredInterviews = (): Interview[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveInterviews = (interviews: Interview[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(interviews));
};

export default function InterviewsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newInterview, setNewInterview] = useState({ title: '', job_description: '' });
  const queryClient = useQueryClient();

  const { data: interviews, isLoading } = useQuery<Interview[]>({
    queryKey: ['interviews'],
    queryFn: () => getStoredInterviews(),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; job_description?: string }) => {
      const interviews = getStoredInterviews();
      const newId = interviews.length > 0 ? Math.max(...interviews.map(i => i.id)) + 1 : 1;
      const newInterview: Interview = {
        id: newId,
        title: data.title,
        status: 'pending',
        created_at: new Date().toISOString(),
        turn_count: 0,
      };
      saveInterviews([...interviews, newInterview]);
      return newInterview;
    },
    onSuccess: () => {
      toast.success('Interview created successfully!');
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      setIsCreateOpen(false);
      setNewInterview({ title: '', job_description: '' });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create interview');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (interviewId: number) => {
      const interviews = getStoredInterviews();
      const filtered = interviews.filter(i => i.id !== interviewId);
      saveInterviews(filtered);
      return interviewId;
    },
    onSuccess: () => {
      toast.success('Interview deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
    onError: (error: any) => {
      toast.error('Failed to delete interview');
    },
  });

  const handleDelete = (interviewId: number, interviewTitle: string) => {
    if (confirm(`Delete "${interviewTitle}"? This cannot be undone.`)) {
      deleteMutation.mutate(interviewId);
    }
  };

  const handleCreate = () => {
    if (!newInterview.title.trim()) {
      toast.error('Please enter an interview title');
      return;
    }
    createMutation.mutate({
      title: newInterview.title,
      job_description: newInterview.job_description.trim() || undefined,
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': 
        return 'bg-emerald-100 text-emerald-700 border-2 border-emerald-900';
      case 'in_progress': 
        return 'bg-amber-100 text-amber-700 border-2 border-amber-900';
      case 'pending': 
        return 'bg-gray-100 text-gray-600 border-2 border-gray-900';
      default: 
        return 'bg-rose-100 text-rose-700 border-2 border-rose-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'in_progress': return <Play className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'pending': return 'Pending';
      default: return 'Cancelled';
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 noise-overlay pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                Your <span className="text-primary">Interviews</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Practice and track all your interview sessions
              </p>
            </div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="btn-brutalist px-8 py-4 text-lg rounded-full inline-flex items-center gap-3 transform -rotate-1 hover:rotate-0"
            >
              <Plus className="w-5 h-5" />
              New Interview
            </button>
          </div>
        </FadeIn>

        {/* Create Modal */}
        {isCreateOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="brutalist-card-primary p-8 rounded-funky max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Create Interview</h2>
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="w-10 h-10 bg-gray-100 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider mb-2">Interview Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Software Engineer Practice"
                    value={newInterview.title}
                    onChange={(e) => setNewInterview({ ...newInterview, title: e.target.value })}
                    className="w-full p-3 border-2 border-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider mb-2">Job Description (Optional)</label>
                  <textarea
                    placeholder="Paste the job description here..."
                    value={newInterview.job_description}
                    onChange={(e) => setNewInterview({ ...newInterview, job_description: e.target.value })}
                    className="w-full p-3 border-2 border-gray-900 bg-white min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <button
                  onClick={handleCreate}
                  disabled={createMutation.isPending}
                  className="w-full btn-brutalist py-4 text-lg flex items-center justify-center gap-2"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Create Interview
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Interview Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="brutalist-card p-6 h-48 animate-pulse bg-gray-100" />
            ))}
          </div>
        ) : interviews && interviews.length > 0 ? (
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {interviews.map((interview, index) => (
              <StaggerItem key={interview.id}>
                <motion.div
                  whileHover={{ y: -8, rotate: 0 }}
                  className={`brutalist-card p-6 rounded-funky ${index % 3 === 0 ? 'tilt-funky-1' : index % 3 === 1 ? 'tilt-funky-2' : 'tilt-funky-4'} tilt-hover-straighten`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-black text-lg line-clamp-1">{interview.title}</h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {format(new Date(interview.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(interview.id, interview.title)}
                      disabled={deleteMutation.isPending}
                      className="w-8 h-8 bg-gray-100 border-2 border-gray-900 flex items-center justify-center hover:bg-rose-100 hover:border-rose-900 hover:text-rose-600 transition-colors"
                    >
                      {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 ${getStatusStyle(interview.status)}`}>
                      {getStatusIcon(interview.status)}
                      {getStatusLabel(interview.status)}
                    </span>
                    <span className="text-sm text-gray-500 font-bold">{interview.turn_count} turns</span>
                  </div>

                  <div className="space-y-2">
                    {interview.status === 'pending' && (
                      <Link href={`/dashboard/interviews/${interview.id}`} className="block w-full py-3 bg-primary text-white font-black text-center border-2 border-gray-900 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" /> Start Interview
                      </Link>
                    )}
                    {interview.status === 'in_progress' && (
                      <Link href={`/dashboard/interviews/${interview.id}`} className="block w-full py-3 bg-amber-500 text-white font-black text-center border-2 border-gray-900 shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" /> Continue
                      </Link>
                    )}
                    {interview.status === 'completed' && (
                      <>
                        <Link href={`/dashboard/interviews/${interview.id}`} className="block w-full py-3 bg-white font-black text-center border-2 border-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <Target className="w-4 h-4" /> View Details
                        </Link>
                        {interview.feedback?.overall_score && (
                          <div className="text-center py-2 bg-emerald-50 border-2 border-emerald-900">
                            <span className="text-sm font-black text-emerald-700">Score: {Math.round(interview.feedback.overall_score * 100)}%</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeInUp>
            <div className="brutalist-card p-12 text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-200 border-2 border-gray-900 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-black mb-2">No interviews yet</h3>
              <p className="text-gray-500 font-medium mb-6">Create your first interview to start practicing with AI</p>
              <button onClick={() => setIsCreateOpen(true)} className="btn-brutalist px-8 py-4 text-lg inline-flex items-center gap-2">
                <Plus className="w-5 h-5" /> Create Interview
              </button>
            </div>
          </FadeInUp>
        )}
      </div>
    </div>
  );
}
