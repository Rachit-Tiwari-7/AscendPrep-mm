'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/app/store/auth-store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, MessageSquare, Code, TrendingUp, CheckCircle2, 
  Clock, BarChart3, Target, Zap, Brain, ChevronRight,
  Sparkles, ArrowUpRight, Play, Eye, AlertTriangle,
  UserX, Mic, Lightbulb, HelpCircle, Frown, Activity,
  XCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import { SkillAveragesCard } from '@/components/analytics/skill-averages-card';
import { SkillProgressionChart } from '@/components/analytics/skill-progression-chart';
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from '@/components/animations';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, PieChart, Pie, Cell, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface Interview {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  completed_at?: string;
  turn_count: number;
  feedback?: any;
}

// Local storage helpers
const getStoredInterviews = (): Interview[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('interviews');
  return stored ? JSON.parse(stored) : [];
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [selectedInterviewIds] = useState<number[]>([]);

  // Use localStorage instead of backend APIs
  const { data: interviews, isLoading: interviewsLoading } = useQuery<Interview[]>({
    queryKey: ['interviews'],
    queryFn: () => getStoredInterviews(),
    initialData: [],
  });

  // Calculate skill averages from localStorage interviews
  const skillAverages = useMemo(() => {
    const completed = interviews?.filter(i => i.status === 'completed' && i.feedback) || [];
    if (completed.length === 0) return null;
    
    return {
      communication: completed.reduce((sum, i) => sum + (i.feedback?.communication_score || 0.5), 0) / completed.length,
      technical: completed.reduce((sum, i) => sum + (i.feedback?.technical_score || 0.5), 0) / completed.length,
      problem_solving: completed.reduce((sum, i) => sum + (i.feedback?.problem_solving_score || 0.5), 0) / completed.length,
      code_quality: completed.reduce((sum, i) => sum + (i.feedback?.code_quality_score || 0.5), 0) / completed.length,
    };
  }, [interviews]);

  const averagesLoading = interviewsLoading;

  const completedInterviews = interviews?.filter((i) => i.status === 'completed') || [];
  const totalTurns = interviews?.reduce((sum, i) => sum + i.turn_count, 0) || 0;

  const avgScore = completedInterviews.length > 0
    ? completedInterviews.reduce((sum, i) => {
        const score = i.feedback?.overall_score || 0;
        return sum + score;
      }, 0) / completedInterviews.length
    : 0;

  const recentInterviews = interviews
    ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'in_progress': return <Play className="w-4 h-4 text-amber-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100 border-2 border-emerald-900';
      case 'in_progress': return 'text-amber-600 bg-amber-100 border-2 border-amber-900';
      default: return 'text-gray-500 bg-gray-100 border-2 border-gray-900';
    }
  };

  const stats = [
    { value: 0, label: "Resumes", icon: FileText, rotate: "tilt-funky-1" },
    { value: interviews?.length || 0, label: "Interviews", icon: MessageSquare, rotate: "tilt-funky-2" },
    { value: completedInterviews.length, label: "Completed", icon: CheckCircle2, rotate: "tilt-funky-4" },
    { value: 0, label: "DSA", icon: Code, rotate: "tilt-funky-1" },
    { value: avgScore === 0 ? '--' : `${Math.round(avgScore * 100)}%`, label: "Score", icon: Target, rotate: "tilt-funky-3" },
    { value: totalTurns, label: "Turns", icon: TrendingUp, rotate: "tilt-funky-2" },
  ];

  const quickActions = [
    { title: "Start Interview", desc: "Practice with AI", icon: Play, href: "/dashboard/interviews/new", color: "bg-primary", rotate: "tilt-funky-1" },
    { title: "DSA Practice", desc: "Solve problems", icon: Code, href: "/dashboard/dsa", color: "bg-emerald-600", rotate: "tilt-funky-2" },
    { title: "Upload Resume", desc: "AI analysis", icon: FileText, href: "/dashboard/resumes", color: "bg-amber-600", rotate: "tilt-funky-4" },
    { title: "ATS Screening", desc: "AI analysis", icon: Eye, href: "/resume-ats", color: "bg-purple-600", rotate: "tilt-funky-3" },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 noise-overlay">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  Welcome back, <span className="text-primary">{user?.full_name?.split(' ')[0] || 'User'}</span>
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Track your progress and crush your next interview
                </p>
              </div>
              <Link href="/dashboard/interviews/new" className="btn-brutalist px-8 py-4 text-lg rounded-full inline-flex items-center gap-3 transform -rotate-1 hover:rotate-0">
                <Play className="w-5 h-5" />
                Start Interview
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" staggerDelay={0.05}>
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <motion.div 
                whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
                className={`brutalist-card p-4 ${stat.rotate} tilt-hover-straighten cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  {interviewsLoading ? (
                    <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                  )}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{stat.label}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <FadeInUp>
              <div className="brutalist-card p-6 rounded-funky">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Recent Activity</h2>
                      <p className="text-sm text-gray-500 font-bold uppercase">Latest sessions</p>
                    </div>
                  </div>
                  <Link href="/dashboard/interviews" className="text-sm font-black text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                    View All <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {interviewsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded animate-pulse border-2 border-gray-200" />
                    ))}
                  </div>
                ) : recentInterviews.length > 0 ? (
                  <div className="space-y-3">
                    {recentInterviews.map((interview, index) => (
                      <motion.div key={interview.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                        <Link href={`/dashboard/interviews/${interview.id}`}>
                          <div className="group flex items-center justify-between p-4 bg-gray-50 border-2 border-gray-200 hover:border-primary hover:bg-white transition-all brutalist-card">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 flex items-center justify-center ${getStatusColor(interview.status)}`}>
                                {getStatusIcon(interview.status)}
                              </div>
                              <div>
                                <h4 className="font-black text-gray-900 group-hover:text-primary transition-colors">{interview.title}</h4>
                                <p className="text-sm text-gray-500 font-medium">
                                  {format(new Date(interview.created_at), 'MMM d, yyyy')} • {interview.turn_count} turns
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 brutalist-card bg-gray-50">
                    <div className="w-16 h-16 bg-gray-200 border-2 border-gray-900 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-black text-gray-500">No interviews yet</p>
                    <p className="text-sm text-gray-400 font-medium">Start your first practice session</p>
                  </div>
                )}
              </div>
            </FadeInUp>

            {/* Performance Overview Charts */}
            {completedInterviews.length > 0 && (
              <FadeInUp delay={0.15}>
                <div className="brutalist-card p-6 rounded-funky">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Performance Overview</h2>
                      <p className="text-sm text-gray-500 font-bold uppercase">Interview analytics</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Interview Scores Bar Chart */}
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                      <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">Recent Interview Scores</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={completedInterviews.slice(0, 5).map((i, idx) => ({
                            name: `Int ${idx + 1}`,
                            score: Math.round((i.feedback?.overall_score || 0.5) * 100),
                            communication: Math.round((i.feedback?.communication_score || 0.5) * 100),
                            technical: Math.round((i.feedback?.technical_score || 0.5) * 100),
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: 'white', border: '2px solid #111827', borderRadius: '8px' }}
                              itemStyle={{ fontSize: 12, fontWeight: 600 }}
                            />
                            <Bar dataKey="score" fill="#3b82f6" name="Overall" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="communication" fill="#10b981" name="Communication" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="technical" fill="#f59e0b" name="Technical" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Skills Radar Chart */}
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                      <h3 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-4">Average Skills</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                            { skill: 'Communication', score: skillAverages ? Math.round(skillAverages.communication * 100) : 50, fullMark: 100 },
                            { skill: 'Technical', score: skillAverages ? Math.round(skillAverages.technical * 100) : 50, fullMark: 100 },
                            { skill: 'Problem Solving', score: skillAverages ? Math.round(skillAverages.problem_solving * 100) : 50, fullMark: 100 },
                            { skill: 'Code Quality', score: skillAverages ? Math.round(skillAverages.code_quality * 100) : 50, fullMark: 100 },
                          ]}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="skill" tick={{ fill: '#374151', fontSize: 10, fontWeight: 600 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                            <Radar name="Your Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            )}

            {/* Common Problems Section */}
            {completedInterviews.length > 0 && (
              <FadeInUp delay={0.2}>
                <div className="brutalist-card p-6 rounded-funky border-rose-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-rose-100 border-2 border-rose-900 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Common Problems</h2>
                      <p className="text-sm text-rose-600 font-bold uppercase">Issues to address</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { 
                        icon: UserX, 
                        title: "Poor Posture", 
                        desc: "Slouching detected in interviews",
                        count: completedInterviews.filter(i => i.feedback?.weaknesses?.some((w: string) => w.toLowerCase().includes('posture') || w.toLowerCase().includes('slouch'))).length,
                        color: "rose"
                      },
                      { 
                        icon: Mic, 
                        title: "Filler Words", 
                        desc: "Using 'um', 'uh', 'like' frequently",
                        count: completedInterviews.filter(i => i.feedback?.weaknesses?.some((w: string) => w.toLowerCase().includes('filler') || w.toLowerCase().includes('um') || w.toLowerCase().includes('uh'))).length,
                        color: "amber"
                      },
                      { 
                        icon: Lightbulb, 
                        title: "Weak Introduction", 
                        desc: "Not starting answers strongly",
                        count: completedInterviews.filter(i => i.feedback?.weaknesses?.some((w: string) => w.toLowerCase().includes('intro') || w.toLowerCase().includes('opening'))).length,
                        color: "orange"
                      },
                      { 
                        icon: HelpCircle, 
                        title: "No Clarifying Questions", 
                        desc: "Jumping straight to solution",
                        count: completedInterviews.filter(i => i.feedback?.weaknesses?.some((w: string) => w.toLowerCase().includes('clarif') || w.toLowerCase().includes('requirements'))).length,
                        color: "blue"
                      },
                      { 
                        icon: Clock, 
                        title: "Rambling Answers", 
                        desc: "Answers too long/unfocused",
                        count: completedInterviews.filter(i => i.feedback?.weaknesses?.some((w: string) => w.toLowerCase().includes('rambl') || w.toLowerCase().includes('concise') || w.toLowerCase().includes('long'))).length,
                        color: "purple"
                      },
                      { 
                        icon: Frown, 
                        title: "Low Confidence", 
                        desc: "Hesitant or unsure responses",
                        count: completedInterviews.filter(i => i.feedback?.weaknesses?.some((w: string) => w.toLowerCase().includes('confiden') || w.toLowerCase().includes('hesitant'))).length,
                        color: "cyan"
                      },
                    ].map((problem, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -4 }}
                        className={`p-4 bg-${problem.color}-50 border-2 border-${problem.color}-200 rounded-xl`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 bg-${problem.color}-100 border-2 border-${problem.color}-900 rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <problem.icon className={`w-5 h-5 text-${problem.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-gray-900">{problem.title}</h4>
                            <p className="text-xs text-gray-500 mb-2">{problem.desc}</p>
                            {problem.count > 0 ? (
                              <span className={`inline-flex items-center px-2 py-1 bg-${problem.color}-100 text-${problem.color}-700 text-xs font-bold rounded`}>
                                {problem.count} interview{problem.count !== 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded">
                                No issues
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            )}

            {/* Skill Analytics */}
            <FadeInUp delay={0.1}>
              <div className="brutalist-card p-6 rounded-funky-alt">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">Skill Analytics</h2>
                      <p className="text-sm text-gray-500 font-bold uppercase">Track performance</p>
                    </div>
                  </div>
                </div>

                {completedInterviews.length === 0 ? (
                  <div className="text-center py-12 brutalist-card bg-gray-50">
                    <div className="w-16 h-16 bg-gray-200 border-2 border-gray-900 flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-black text-gray-500 mb-4">Complete an interview to see analytics</p>
                    <Link href="/dashboard/interviews" className="btn-brutalist-outline px-6 py-3 text-sm inline-block">
                      Start Interview
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {averagesLoading ? (
                      <div className="h-64 bg-gray-100 rounded animate-pulse border-2 border-gray-200" />
                    ) : skillAverages ? (
                      <SkillAveragesCard averages={skillAverages} title="Average Skill Scores" description="Your performance across all completed interviews" />
                    ) : null}
                  </div>
                )}
              </div>
            </FadeInUp>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <FadeInUp>
              <div className="brutalist-card p-6 rounded-funky-tl">
                <h3 className="text-xl font-black mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <motion.div whileHover={{ x: 4, rotate: 0 }} className={`flex items-center gap-4 p-4 bg-gray-50 border-2 border-gray-900 hover:border-primary transition-all cursor-pointer ${action.rotate} tilt-hover-straighten`}>
                        <div className={`w-12 h-12 ${action.color} border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-gray-900">{action.title}</p>
                          <p className="text-xs text-gray-500 font-bold uppercase">{action.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeInUp>

            {/* DSA Progress - Simplified without backend */}
            <FadeInUp delay={0.1}>
              <div className="brutalist-card p-6 rounded-funky-br tilt-funky-1 tilt-hover-straighten">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 border-2 border-gray-900 flex items-center justify-center">
                    <Code className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">DSA Progress</h3>
                    <p className="text-sm text-gray-500 font-bold uppercase">Practice problems</p>
                  </div>
                </div>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 font-medium mb-3">Start practicing DSA problems</p>
                  <Link href="/dashboard/dsa" className="btn-brutalist-outline px-6 py-2 text-sm inline-block">Start Practice</Link>
                </div>
              </div>
            </FadeInUp>

          </div>
        </div>
      </div>
    </div>
  );
}
