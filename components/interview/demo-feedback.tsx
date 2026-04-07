'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Target, Zap, MessageSquare, Brain, TrendingUp, 
  Star, CheckCircle2, AlertCircle, ArrowRight, RotateCcw,
  ChevronRight, Award, Lightbulb, BarChart3, Play, Clock,
  UserX, Mic, HelpCircle, Frown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { InterviewReplay } from './interview-replay';

import { InterviewAnalysis } from '@/app/services/groq-analysis';

interface DemoFeedbackProps {
  onRestart: () => void;
  onViewAnalytics: () => void;
  analysis?: InterviewAnalysis | null;
}

// Mock interview timeline data
const mockTimelineNodes = [
  {
    id: '1',
    timestamp: 45,
    question: "Tell me about yourself and your background in software development.",
    answer: "I'm a full-stack developer with 3 years of experience building web applications using React and Node.js. I started my career at a startup where I worked on...",
    quality: 'strong' as const,
    score: 88,
    analysis: "Excellent introduction with clear structure. You provided specific technologies and experience level upfront. The mention of startup experience adds credibility.",
    duration: 85,
    aiFeedback: "Consider quantifying your impact more (e.g., 'improved performance by 40%'). Also mention a specific achievement to make it memorable."
  },
  {
    id: '2',
    timestamp: 180,
    question: "Describe a challenging project you worked on. What made it difficult?",
    answer: "The most challenging was migrating our legacy codebase to TypeScript. It was difficult because we had to maintain functionality while...",
    quality: 'strong' as const,
    score: 92,
    analysis: "Strong use of the STAR method. You clearly explained the technical challenge, your approach, and the outcome. Good balance of technical and soft skills.",
    duration: 120,
    aiFeedback: "This was excellent! You could make it even stronger by mentioning specific metrics about the migration (lines of code, time saved)."
  },
  {
    id: '3',
    timestamp: 320,
    question: "How do you handle tight deadlines and pressure?",
    answer: "Um, I try to prioritize tasks and communicate with the team. Sometimes it's stressful but I manage to get things done...",
    quality: 'weak' as const,
    score: 62,
    analysis: "Your answer lacked specific examples and came across as hesitant. 'Um' and vague responses signal uncertainty under pressure.",
    duration: 45,
    aiFeedback: "Use a specific example of a deadline you met. Try: 'In my last role, we had a 2-week deadline reduced to 5 days. I implemented daily standups and focused on MVP features, delivering on time.'"
  },
  {
    id: '4',
    timestamp: 450,
    question: "What are your strengths and weaknesses?",
    answer: "My strength is debugging complex issues - I enjoy the puzzle-solving aspect. For weakness, I sometimes get too focused on details and lose sight of the big picture, but I'm working on it by...",
    quality: 'okay' as const,
    score: 75,
    analysis: "Good authentic answer with a genuine weakness that won't hurt your candidacy. You showed self-awareness and proactive improvement.",
    duration: 95,
    aiFeedback: "Good balance! For the weakness, emphasize more how you've improved. Consider: 'I've implemented code review checklists to ensure I step back and review architecture before diving into implementation.'"
  },
  {
    id: '5',
    timestamp: 600,
    question: "Where do you see yourself in 5 years?",
    answer: "I hope to grow into a technical lead role where I can mentor junior developers while still coding. I want to deepen my expertise in cloud architecture...",
    quality: 'strong' as const,
    score: 85,
    analysis: "Excellent alignment with career progression. Shows ambition balanced with realism. Mentioning mentoring adds leadership potential.",
    duration: 70,
    aiFeedback: "Great vision! To strengthen, connect it to the company: 'I noticed your team is expanding cloud infrastructure - I'd love to grow with that initiative and eventually lead similar projects.'"
  }
];

export const DemoFeedback: React.FC<DemoFeedbackProps> = ({ onRestart, onViewAnalytics, analysis }) => {
  const [showReplay, setShowReplay] = useState(false);
  
  // Use real analysis data if available, otherwise fall back to mock
  const isRealData = !!analysis;
  
  // Real or mock skill data
  const skills = analysis ? [
    { name: 'Communication', score: Math.round(analysis.communication_score * 100), icon: MessageSquare, color: 'from-blue-500 to-cyan-400', tips: analysis.skill_breakdown?.communication?.recommendations?.slice(0, 2) || ['Practice clarity', 'Reduce filler words'] },
    { name: 'Technical Knowledge', score: Math.round(analysis.technical_score * 100), icon: Brain, color: 'from-purple-500 to-pink-400', tips: analysis.skill_breakdown?.technical?.recommendations?.slice(0, 2) || ['Study concepts', 'Practice problems'] },
    { name: 'Problem Solving', score: Math.round(analysis.problem_solving_score * 100), icon: Lightbulb, color: 'from-amber-500 to-orange-400', tips: analysis.skill_breakdown?.problem_solving?.recommendations?.slice(0, 2) || ['Use STAR method', 'Show thought process'] },
    { name: 'Code Quality', score: Math.round(analysis.code_quality_score * 100), icon: Trophy, color: 'from-emerald-500 to-teal-400', tips: analysis.skill_breakdown?.code_quality?.recommendations?.slice(0, 2) || ['Write clean code', 'Handle edge cases'] },
  ] : [
    { name: 'Communication', score: 85, icon: MessageSquare, color: 'from-blue-500 to-cyan-400', tips: ['Speak clearly and pace yourself', 'Use concise answers'] },
    { name: 'Technical Knowledge', score: 78, icon: Brain, color: 'from-purple-500 to-pink-400', tips: ['Review system design concepts', 'Practice coding problems'] },
    { name: 'Problem Solving', score: 92, icon: Lightbulb, color: 'from-amber-500 to-orange-400', tips: ['Structure answers with STAR method', 'Show your thought process'] },
    { name: 'Confidence', score: 88, icon: Trophy, color: 'from-emerald-500 to-teal-400', tips: ['Maintain good posture', 'Make eye contact'] },
  ];

  const overallScore = analysis ? Math.round(analysis.overall_score * 100) : Math.round(skills.reduce((acc, s) => acc + s.score, 0) / skills.length);
  
  const strengths = analysis?.strengths || [
    'Excellent problem-solving approach',
    'Clear and structured communication',
    'Strong technical fundamentals'
  ];
  
  const improvements = analysis?.weaknesses || [
    'Add more specific examples to answers',
    'Elaborate on technical trade-offs',
    'Practice behavioral questions'
  ];
  
  // Real detected issues from Groq
  const detectedIssues = analysis?.detected_issues || [];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getVerdict = (score: number) => {
    if (score >= 90) return { text: 'Outstanding!', subtext: 'You nailed it!', color: 'text-emerald-500', bg: 'bg-emerald-100 border-emerald-500' };
    if (score >= 80) return { text: 'Great Job!', subtext: 'Strong performance', color: 'text-blue-500', bg: 'bg-blue-100 border-blue-500' };
    if (score >= 70) return { text: 'Good Effort!', subtext: 'Room to grow', color: 'text-amber-500', bg: 'bg-amber-100 border-amber-500' };
    return { text: 'Keep Practicing!', subtext: 'You\'ll get there', color: 'text-rose-500', bg: 'bg-rose-100 border-rose-500' };
  };

  const verdict = getVerdict(overallScore);

  if (showReplay) {
    return (
      <InterviewReplay
        nodes={mockTimelineNodes}
        overallScore={overallScore}
        onClose={() => setShowReplay(false)}
        onRetry={() => {
          setShowReplay(false);
          onRestart();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary rounded-full mb-4">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-black uppercase tracking-wider text-primary">Interview Complete</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            Your Performance
          </h1>
          <p className="text-xl text-gray-600">
            Here's how you did in your practice interview
          </p>
        </motion.div>

        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className={`brutalist-card p-8 md:p-12 rounded-2xl ${verdict.bg}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className={`text-5xl md:text-7xl font-black ${verdict.color} mb-2`}>
                  {overallScore}%
                </h2>
                <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
                  {verdict.text}
                </p>
                <p className="text-lg text-gray-600">{verdict.subtext}</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Behavioral Interview</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  <span>4 Skills Assessed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="brutalist-card overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center`}>
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-3xl font-black ${getScoreColor(skill.score)}`}>
                      {skill.score}%
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">{skill.name}</h3>
                  
                  {/* Progress Bar */}
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className={`h-full ${getScoreBg(skill.score)}`}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    {skill.tips.map((tip, i) => (
                      <p key={i} className="text-xs text-gray-600 flex items-start gap-1">
                        <ChevronRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        {tip}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="brutalist-card border-emerald-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Your Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="brutalist-card border-amber-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Areas to Improve</h3>
                </div>
                <ul className="space-y-3">
                  {improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Common Problems Detected - REAL DATA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mb-8"
        >
          <div className="brutalist-card p-6 rounded-2xl border-rose-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-rose-100 border-2 border-rose-900 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">
                  {isRealData ? '🔍 Issues Detected by AI' : 'Issues Detected (Demo)'}
                </h3>
                <p className="text-sm text-rose-600 font-bold uppercase">
                  {detectedIssues.length > 0 ? `${detectedIssues.length} problem(s) found` : 'No major issues detected'}
                </p>
              </div>
            </div>

            {detectedIssues.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detectedIssues.map((issue, idx) => {
                  const iconMap: Record<string, any> = {
                    filler_words: Mic,
                    rambling: Clock,
                    no_clarifying: HelpCircle,
                    poor_posture: UserX,
                    low_confidence: Frown,
                    weak_intro: Lightbulb,
                  };
                  const IssueIcon = iconMap[issue.issue_type] || AlertCircle;
                  const color = issue.severity === 'high' ? 'rose' : issue.severity === 'medium' ? 'amber' : 'blue';
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.05 }}
                      className={`p-4 bg-${color}-50 border-2 border-${color}-200 rounded-xl`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-${color}-100 border-2 border-${color}-900 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IssueIcon className={`w-5 h-5 text-${color}-600`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-gray-900">
                              {issue.issue_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase bg-${color}-100 text-${color}-700`}>
                              {issue.severity}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{issue.description}</p>
                          {issue.count > 1 && (
                            <p className="text-xs text-gray-500">Count: {issue.count}</p>
                          )}
                          {issue.context && (
                            <p className="text-xs text-gray-400 italic mt-1">"{issue.context}"</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <p className="font-black text-emerald-700">No significant issues detected!</p>
                <p className="text-sm text-emerald-600">Great job on this interview.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onRestart}
            variant="outline"
            className="btn-brutalist-outline px-8 py-4 text-lg flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Another Interview
          </Button>
          
          <Button
            onClick={() => setShowReplay(true)}
            className="btn-brutalist bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Interview Replay
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            onClick={onViewAnalytics}
            className="btn-brutalist px-8 py-4 text-lg flex items-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            View Full Analytics
          </Button>
        </motion.div>

        {/* Upgrade CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 mb-2">
            Want detailed AI feedback on every answer?
          </p>
          <Link href="/dashboard/analytics">
            <span className="text-primary font-bold hover:underline inline-flex items-center gap-1">
              Upgrade to Pro
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
