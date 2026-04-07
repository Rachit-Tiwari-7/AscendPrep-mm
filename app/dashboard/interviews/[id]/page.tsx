'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Play, CheckCircle2, Loader2, ArrowLeft, 
  AlertCircle, MicOff, Video as VideoIcon
} from 'lucide-react';
import { interviewsApi, Interview } from '@/app/api/interviews';
import { analyzeInterview, InterviewAnalysis, getMockAnalysis } from '@/app/services/groq-analysis';
import { useAuthStore } from '@/app/store/auth-store';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';
import Link from 'next/link';
import { UserCamera } from '@/components/interview/user-camera';
import { useVapi } from '@/hooks/use-vapi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewSkillCard } from '@/components/analytics/interview-skill-card';
import { GlowButton } from '@/components/premium-ui';
import { DemoFeedback } from '@/components/interview/demo-feedback';

// Dynamically import components to avoid SSR issues
import { VapiVisualizer } from '@/components/interview/vapi-visualizer';
import { TranscriptionDisplay } from '@/components/interview/vapi-transcription-display';

const CameraView = dynamic(
  () => import('@/components/interview/user-camera').then((mod) => ({ default: mod.UserCamera })),
  { ssr: false }
);

export default function InterviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = parseInt(params.id as string);
  const [isStarting, setIsStarting] = useState(false);
  const [agentReady, setAgentReady] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<InterviewAnalysis | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const {
    isCallActive,
    isThinking,
    isSpeaking,
    volumeLevel,
    lastTranscript,
    messages: vapiMessages,
    startCall,
    endCall,
    toggleCall,
    error: vapiError,
  } = useVapi();

  const isConnected = isCallActive;
  const isConnecting = false;

  // Standalone mode: Mock interview fetch
  const { data: interview = {
    id: interviewId,
    title: 'Practice Interview',
    status: 'pending',
    type: 'Behavioral',
    turn_count: 0,
    created_at: new Date().toISOString(),
    conversation_history: []
  } as Interview, isLoading } = useQuery<Interview>({
    queryKey: ['interview', interviewId],
    queryFn: () => interviewsApi.get(interviewId).catch(() => ({
       id: interviewId,
       title: 'Practice Interview',
       status: 'pending',
       type: 'Behavioral',
       turn_count: 0,
       created_at: new Date().toISOString(),
       conversation_history: []
    } as Interview)),
    enabled: !!interviewId,
  });

  const canRespond = interview?.status === 'in_progress' || interview?.status === 'pending';
  const isCompleted = interview?.status === 'completed';

  // Fetch skill breakdown from localStorage (Groq analysis) instead of backend
  const { data: skillBreakdown, isLoading: skillBreakdownLoading } = useQuery({
    queryKey: ['interview-skills', interviewId],
    queryFn: () => {
      // Read from localStorage where Groq analysis was saved
      const savedAnalyses = JSON.parse(localStorage.getItem('interview_analyses') || '{}');
      const savedData = savedAnalyses[interviewId];
      
      if (savedData?.analysis) {
        // Convert Groq analysis format to InterviewSkillBreakdown format
        return {
          interview_id: interviewId,
          interview_title: savedData.interview_title || interview?.title || 'Interview',
          completed_at: savedData.completed_at || new Date().toISOString(),
          skill_breakdown: {
            communication: {
              score: savedData.analysis.communication_score || 0.7,
              strengths: savedData.analysis.skill_breakdown?.communication?.strengths || [],
              weaknesses: savedData.analysis.skill_breakdown?.communication?.weaknesses || [],
              recommendations: savedData.analysis.skill_breakdown?.communication?.recommendations || [],
            },
            technical: {
              score: savedData.analysis.technical_score || 0.7,
              strengths: savedData.analysis.skill_breakdown?.technical?.strengths || [],
              weaknesses: savedData.analysis.skill_breakdown?.technical?.weaknesses || [],
              recommendations: savedData.analysis.skill_breakdown?.technical?.recommendations || [],
            },
            problem_solving: {
              score: savedData.analysis.problem_solving_score || 0.7,
              strengths: savedData.analysis.skill_breakdown?.problem_solving?.strengths || [],
              weaknesses: savedData.analysis.skill_breakdown?.problem_solving?.weaknesses || [],
              recommendations: savedData.analysis.skill_breakdown?.problem_solving?.recommendations || [],
            },
            code_quality: {
              score: savedData.analysis.code_quality_score || 0.7,
              strengths: savedData.analysis.skill_breakdown?.code_quality?.strengths || [],
              weaknesses: savedData.analysis.skill_breakdown?.code_quality?.weaknesses || [],
              recommendations: savedData.analysis.skill_breakdown?.code_quality?.recommendations || [],
            },
          },
          detected_issues: savedData.analysis.detected_issues || [],
        };
      }
      
      throw new Error('No analysis found in localStorage');
    },
    enabled: isCompleted && !!interviewId,
    retry: false,
  });

  // Mock start interview mutation (no backend version)
  const startMutation = useMutation({
    mutationFn: async () => {
      setIsStarting(true);
      try {
        const assistantOverrides = {
          variableValues: {
            userName: user?.full_name || 'Candidate',
            interviewTitle: interview?.title || 'Mock Interview',
          }
        };
        await startCall(assistantOverrides);
      } catch (error) {
        console.error('Vapi call failed to start:', error);
        toast.error('Failed to start voice call.');
        setIsStarting(false);
      }
      return interview;
    },
    onSuccess: () => {
      queryClient.setQueryData(['interview', interviewId], { 
        ...interview, 
        status: 'in_progress' 
      });
      setIsStarting(false);
      toast.success('Interview started (Local Mode)');
    },
  });

  // Complete mutation - calls Groq DIRECTLY from frontend
  const completeMutation = useMutation({
    mutationFn: async () => {
       // Build conversation from Vapi messages
       const conversationHistory = vapiMessages.map((msg: any) => ({
         role: msg.role || 'user',
         content: msg.content || msg.transcript || '',
         timestamp: msg.timestamp || new Date().toISOString(),
       }));
       
       // Call Groq directly for analysis
       try {
         toast.loading('AI is analyzing your interview...', { id: 'analysis' });
         const analysis = await analyzeInterview(conversationHistory, interview?.title);
         setFeedbackData(analysis);
         toast.success('Analysis complete!', { id: 'analysis' });
       } catch (err) {
         console.warn('Groq analysis failed, using mock:', err);
         toast.error('AI analysis failed, showing demo data', { id: 'analysis' });
         setFeedbackData(getMockAnalysis());
       }
       
       // Mark interview as completed and save analysis
       const completedInterview = { ...interview, status: 'completed', conversation_history: conversationHistory };
       
       // Save analysis to localStorage for analytics page
       if (feedbackData) {
         const savedAnalyses = JSON.parse(localStorage.getItem('interview_analyses') || '{}');
         savedAnalyses[interviewId] = {
           analysis: feedbackData,
           interview_title: interview?.title || 'Interview',
           completed_at: new Date().toISOString(),
           interview_id: interviewId,
         };
         localStorage.setItem('interview_analyses', JSON.stringify(savedAnalyses));
       }
       
       return { interview: completedInterview };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['interview', interviewId], data.interview);
      setShowFeedback(true);
    },
  });

  const handleToggleCall = async () => {
    console.log('handleToggleCall clicked', { isCallActive, interviewStatus: interview?.status, interviewId });
    if (isCallActive) {
      endCall();
    } else {
      // Permission pre-check for better UX
      try {
        console.log('Requesting mic permissions...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(t => t.stop());
        
        console.log('Starting call...', { interviewStatus: interview?.status });
        if (interview?.status === 'pending') {
          startMutation.mutate();
        } else {
          startCall();
        }
      } catch (err: any) {
        console.error('Mic error:', err);
        toast.error('Microphone access denied. Please enable it to start the interview.');
      }
    }
  };

  const handleQuit = () => {
    if (confirm('Are you sure you want to quit the interview? Progress will NOT be saved to analytics.')) {
      endCall();
      toast.info('Interview session ended.');
    }
  };

  const handleComplete = () => {
    if (confirm('Are you sure you want to complete and submit this interview?')) {
      endCall();
      completeMutation.mutate();
    }
  };


  // End call when leaving the page/tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      endCall();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        endCall();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      endCall();
    };
  }, [endCall]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-20 pb-8 px-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="brutalist-card p-8 animate-pulse bg-gray-100 h-96" />
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="brutalist-card p-12 text-center max-w-md">
          <div className="w-16 h-16 bg-rose-100 border-2 border-rose-900 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-2xl font-black mb-4">Interview not found</h2>
          <Link href="/dashboard/interviews" className="btn-brutalist-outline px-6 py-3 inline-block">
            Back to Interviews
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {showFeedback && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-full">
            <DemoFeedback 
              analysis={feedbackData}
              onRestart={() => {
                setShowFeedback(false);
                router.push('/dashboard/interviews');
              }}
              onViewAnalytics={() => {
                setShowFeedback(false);
              }}
            />
          </div>
        </div>
      )}
      <div className="min-h-screen bg-white pt-20 pb-8">
        {/* Header */}
        <div className="container mx-auto px-4 mb-6">
          <div className="brutalist-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/interviews">
                <motion.div 
                  className="w-12 h-12 bg-gray-100 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
              </Link>
              <div>
                <h1 className="text-2xl font-black">{interview.title}</h1>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                  <span className={`w-3 h-3 rounded-full border border-gray-900 ${
                    interview.status === 'completed' ? 'bg-emerald-500' :
                    interview.status === 'in_progress' ? 'bg-amber-500' : 'bg-gray-400'
                  }`} />
                  <span className="text-gray-600">{interview.status.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {canRespond && (
                <GlowButton 
                  variant={isCallActive ? "outline" : "primary"} 
                  onClick={handleToggleCall}
                >
                  {isCallActive ? (
                    <><MicOff className="w-4 h-4 mr-2" /> Stop Interview</>
                  ) : (
                    <><Play className="w-4 h-4 mr-2" /> Start Interview</>
                  )}
                </GlowButton>
              )}
              {isCallActive && (
                <Button
                  variant="destructive"
                  onClick={handleQuit}
                >
                  Quit
                </Button>
              )}
              {canRespond && (
                <Button
                  variant="outline"
                  onClick={handleComplete}
                  disabled={completeMutation.isPending}
                >
                  {completeMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Finish
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex min-h-0">
          {isCompleted ? (
            <Tabs defaultValue="skills" className="flex-1 flex flex-col min-h-0 w-full">
              <div className="border-b border-border px-4 pt-4">
                <TabsList>
                  <TabsTrigger value="skills">Skill Breakdown</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="skills" className="flex-1 overflow-y-auto p-4 mt-0">
                {skillBreakdownLoading ? (
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <Skeleton className="h-64 w-full" />
                      </CardContent>
                    </Card>
                  </div>
                ) : skillBreakdown ? (
                  <InterviewSkillCard breakdown={skillBreakdown} />
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">
                        Skill breakdown not available yet. The analysis may still be processing.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              <TabsContent value="transcript" className="flex-1 overflow-y-auto p-4 mt-0">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Interview Transcript</h3>
                    <div className="space-y-4">
                      {interview.conversation_history && interview.conversation_history.length > 0 ? (
                        interview.conversation_history
                          .filter(msg => (msg.role as string) !== 'system')
                          .map((msg, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg ${
                                msg.role === 'user'
                                  ? 'bg-primary/10 ml-8'
                                  : 'bg-muted mr-8'
                              }`}
                            >
                              <div className="font-semibold text-sm mb-1">
                                {msg.role === 'user' ? 'You' : 'Interviewer'}
                              </div>
                              <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                              {msg.timestamp && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {new Date(msg.timestamp).toLocaleString()}
                                </div>
                              )}
                            </div>
                          ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No transcript available.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-1 h-[calc(100vh-180px)]">
              {/* Left Side - Chat Area (Fixed height, internal scroll) */}
              <div className="w-1/2 h-full overflow-y-auto border-r border-border">
                {canRespond && isCallActive ? (
                  <>
                    {/* Visualizer Area - Fixed at top of chat */}
                    <div className="sticky top-0 bg-background z-10 p-4 border-b border-border">
                      <div className="flex items-center gap-4">
                        <div className="relative group">
                          <VapiVisualizer 
                            volumeLevel={volumeLevel} 
                            isSpeaking={isSpeaking} 
                            isCallActive={isCallActive} 
                          />
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                          {isSpeaking ? (
                            <span className="text-blue-400 animate-pulse">Interviewer is Talking</span>
                          ) : isThinking ? (
                            <span className="text-amber-400 animate-bounce">Interviewer is Thinking</span>
                          ) : (
                            <span className="text-emerald-400">Interviewer is Listening</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Scrollable Transcription */}
                    <div className="p-4">
                      <TranscriptionDisplay messages={vapiMessages} lastTranscript={lastTranscript} />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col h-full p-8 items-center justify-center text-center space-y-6">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <VideoIcon className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Ready for your interview?</h3>
                      <p className="text-muted-foreground max-w-xs mx-auto">
                        Click the "Start Interview" button above to begin your real-time voice conversation with our AI interviewer.
                      </p>
                    </div>
                    {!canRespond && isCompleted && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
                        This interview has been completed. Review your performance in the analytics tab.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side - Camera (Always visible) */}
              <div className="w-1/2 h-full p-4">
                <UserCamera isActive={true} enableAnalytics={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
