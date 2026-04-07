'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BarChart3, Target, CheckCircle2, BookOpen, Trophy, TrendingUp, Brain } from 'lucide-react';
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from '@/components/animations';
import { dsaApi, DSAAnalytics } from '../dsa/api';

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'bg-emerald-500',
  medium: 'bg-amber-500',
  hard: 'bg-rose-500',
};

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery<DSAAnalytics>({
    queryKey: ['dsa-analytics'],
    queryFn: () => dsaApi.getAnalytics(),
  });

  const stats = analytics?.stats || {
    total_questions_attempted: 0,
    total_questions_completed: 0,
    topics_practiced: [],
    difficulty_distribution: { easy: 0, medium: 0, hard: 0 },
  };

  const completionRate = stats.total_questions_attempted > 0
    ? Math.round((stats.total_questions_completed / stats.total_questions_attempted) * 100)
    : 0;

  const statCards = [
    { label: 'Questions Attempted', value: stats.total_questions_attempted, icon: Target, color: 'bg-primary/20' },
    { label: 'Completed', value: stats.total_questions_completed, icon: CheckCircle2, color: 'bg-emerald-100' },
    { label: 'Topics Practiced', value: stats.topics_practiced.length, icon: BookOpen, color: 'bg-amber-100' },
    { label: 'Success Rate', value: `${completionRate}%`, icon: Trophy, color: 'bg-rose-100' },
  ];

  const hasData = stats.total_questions_attempted > 0;

  return (
    <div className="min-h-screen bg-white pb-20 noise-overlay pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                Your <span className="text-primary">Analytics</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Track your progress and identify areas for improvement
              </p>
            </div>
          </div>
        </FadeIn>

        {!hasData ? (
          <FadeInUp>
            <div className="brutalist-card p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-primary/10 border-2 border-gray-900 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-black mb-3">No Analytics Yet</h3>
              <p className="text-gray-600 mb-6">
                Complete your first interview or solve a DSA problem to see your analytics here.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="/dashboard/interviews" className="btn-brutalist px-6 py-3 inline-block">
                  Start Interview
                </a>
                <a href="/dashboard/dsa" className="btn-outline-brutalist px-6 py-3 inline-block border-2 border-gray-900 font-bold hover:bg-gray-100 transition-colors">
                  Practice DSA
                </a>
              </div>
            </div>
          </FadeInUp>
        ) : (
          <>
            {/* Stats Grid */}
            <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8" staggerDelay={0.05}>
              {statCards.map((stat, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="brutalist-card p-6 tilt-hover-1 tilt-hover-straighten"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-500">{stat.label}</span>
                      <div className={`w-10 h-10 ${stat.color} border-2 border-gray-900 flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                    <div className="text-3xl font-black">
                      {isLoading ? <div className="h-8 w-16 bg-gray-200 animate-pulse" /> : stat.value}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Difficulty Distribution */}
              <FadeInUp delay={0.2}>
                <div className="brutalist-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-black">Difficulty Distribution</h3>
                  </div>
                  <div className="space-y-4">
                    {['easy', 'medium', 'hard'].map((diff) => {
                      const count = stats.difficulty_distribution[diff as keyof typeof stats.difficulty_distribution];
                      const percent = stats.total_questions_attempted > 0 
                        ? Math.round((count / stats.total_questions_attempted) * 100) 
                        : 0;
                      return (
                        <div key={diff} className="space-y-2">
                          <div className="flex justify-between text-sm font-bold">
                            <span className="uppercase">{diff}</span>
                            <span>{count} ({percent}%)</span>
                          </div>
                          <div className="h-4 bg-gray-100 border-2 border-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percent}%` }}
                              className={`h-full ${DIFFICULTY_STYLES[diff]}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeInUp>

              {/* Topics Practiced */}
              <FadeInUp delay={0.3}>
                <div className="brutalist-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-black">Topics Practiced</h3>
                  </div>
                  {stats.topics_practiced.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {stats.topics_practiced.map((topic) => (
                        <span 
                          key={topic} 
                          className="px-3 py-2 bg-primary/10 border-2 border-gray-900 font-bold text-sm"
                        >
                          {topic.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No topics practiced yet</p>
                  )}
                </div>
              </FadeInUp>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
