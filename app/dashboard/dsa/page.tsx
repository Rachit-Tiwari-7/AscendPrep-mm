'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Code2, Play, CheckCircle2, BookOpen, BarChart3, Target,
  ChevronDown, ChevronUp, Loader2, Trash2, Sparkles,
  Brain, Zap, Trophy, Flame, Hexagon
} from 'lucide-react';
import { toast } from 'sonner';
import { DSAQuestion, DSAQuestionCard } from './question-card';
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from '@/components/animations';
import { getRandomQuestion, ALL_QUESTIONS, PATTERN_CATEGORIES } from './question-bank';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const TOPIC_ICONS: Record<string, string> = {
  arrays: '[]', strings: '""', linked_list: '→', trees: '🌳', graphs: 'G',
  dynamic_programming: 'DP', sorting: '⇅', searching: '🔍', hash_table: '{}',
  heap: 'H', stack: 'ST', queue: 'Q', backtracking: 'BK', bit_manipulation: 'BM', 
  math: '∑', bfs: '🌊', dfs: '🔍', two_pointers: '👆', sliding_window: '🪟',
  binary_search: '🔎', linked_list_pattern: '⛓️'
};

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'bg-emerald-100 text-emerald-700 border-2 border-emerald-900',
  medium: 'bg-amber-100 text-amber-700 border-2 border-amber-900',
  hard: 'bg-rose-100 text-rose-700 border-2 border-rose-900',
};

export default function DSAPage() {
  const [activeTab, setActiveTab] = useState<'practice' | 'questions' | 'patterns' | 'analytics'>('practice');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [expandedHints, setExpandedHints] = useState<Set<number>>(new Set());
  const [showSolution, setShowSolution] = useState<Set<number>>(new Set());
  
  const queryClient = useQueryClient();

  // Get unique topics and difficulties from question bank
  const topics = Array.from(new Set(ALL_QUESTIONS.map(q => q.topic)));
  const difficultyLevels = ['easy', 'medium', 'hard'];

  // Questions query from localStorage
  const { data: questions, isLoading: questionsLoading } = useQuery<DSAQuestion[]>({
    queryKey: ['dsa-questions'],
    queryFn: () => {
      return JSON.parse(localStorage.getItem('dsa-generated-questions') || '[]');
    },
  });

  // Calculate stats from questions
  const stats = {
    total_questions_attempted: questions?.length || 0,
    total_questions_completed: questions?.filter(q => q.is_completed).length || 0,
    topics_practiced: Array.from(new Set(questions?.map(q => q.topic) || [])) as string[],
    difficulty_distribution: {
      easy: questions?.filter(q => q.difficulty === 'easy').length || 0,
      medium: questions?.filter(q => q.difficulty === 'medium').length || 0,
      hard: questions?.filter(q => q.difficulty === 'hard').length || 0,
    },
    current_streak: questions?.filter(q => q.is_completed).length || 0,
    longest_streak: Math.max(questions?.filter(q => q.is_completed).length || 0, 0),
    patterns_mastered: new Set(questions?.filter(q => q.is_completed).map(q => q.pattern)).size,
  };

  // Calculate topic breakdown
  const topicBreakdown = stats.topics_practiced.map(topic => {
    const count = questions?.filter(q => q.topic === topic && q.is_completed).length || 0;
    const percentage = stats.total_questions_completed > 0 ? (count / stats.total_questions_completed) * 100 : 0;
    return { topic, count, percentage };
  }).sort((a, b) => b.count - a.count);

  const completionRate = stats.total_questions_attempted > 0
    ? Math.round((stats.total_questions_completed / stats.total_questions_attempted) * 100)
    : 0;

  // Generate mutation using question bank
  const generateMutation = useMutation({
    mutationFn: async (data: { topic: string; difficulty: string }) => {
      const question = getRandomQuestion(data.topic, data.difficulty);
      
      const dsaQuestion: DSAQuestion = {
        id: Date.now(),
        title: question.title,
        difficulty: question.difficulty as 'easy' | 'medium' | 'hard',
        topic: question.topic,
        pattern: question.pattern,
        problem_description: question.problem_description,
        constraints: question.constraints,
        example_input: question.example_input,
        example_output: question.example_output,
        hints: question.hints,
        solution_explanation: question.solution_explanation,
        leetCodeUrl: question.leetCodeUrl,
        is_completed: false,
        created_at: new Date().toISOString(),
      };
      
      const existing = JSON.parse(localStorage.getItem('dsa-generated-questions') || '[]');
      existing.unshift(dsaQuestion);
      localStorage.setItem('dsa-generated-questions', JSON.stringify(existing.slice(0, 50)));
      
      return dsaQuestion;
    },
    onSuccess: () => {
      toast.success('New question generated!');
      queryClient.invalidateQueries({ queryKey: ['dsa-questions'] });
      setActiveTab('questions' as const);
    },
    onError: (error: any) => toast.error(error.message || 'Failed to generate'),
  });

  // Complete mutation
  const completeMutation = useMutation({
    mutationFn: (id: number) => {
      const questions = JSON.parse(localStorage.getItem('dsa-generated-questions') || '[]');
      const updated = questions.map((q: any) => 
        q.id === id ? { ...q, is_completed: true, completed_at: new Date().toISOString() } : q
      );
      localStorage.setItem('dsa-generated-questions', JSON.stringify(updated));
      return Promise.resolve({ id, is_completed: true });
    },
    onSuccess: () => {
      toast.success('Question marked as complete!');
      queryClient.invalidateQueries({ queryKey: ['dsa-questions'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      const questions = JSON.parse(localStorage.getItem('dsa-generated-questions') || '[]');
      const filtered = questions.filter((q: any) => q.id !== id);
      localStorage.setItem('dsa-generated-questions', JSON.stringify(filtered));
      return Promise.resolve({ id });
    },
    onSuccess: () => {
      toast.success('Question removed');
      queryClient.invalidateQueries({ queryKey: ['dsa-questions'] });
    },
  });

  const handleGenerate = () => {
    if (!selectedTopic || !selectedDifficulty) {
      toast.error('Please select both topic and difficulty');
      return;
    }
    generateMutation.mutate({ topic: selectedTopic, difficulty: selectedDifficulty });
  };

  const statCards = [
    { label: 'Attempted', value: stats.total_questions_attempted, icon: Target, color: 'bg-primary/10' },
    { label: 'Completed', value: stats.total_questions_completed, icon: CheckCircle2, color: 'bg-emerald-100' },
    { label: 'Topics', value: stats.topics_practiced.length, icon: BookOpen, color: 'bg-amber-100' },
    { label: 'Success Rate', value: `${completionRate}%`, icon: Trophy, color: 'bg-rose-100' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 noise-overlay pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                DSA <span className="text-primary">Practice</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Master 95 patterns with curated LeetCode problems
              </p>
            </div>
            <div className="flex items-center gap-2 brutalist-card p-3 rounded-xl transform rotate-1">
              <Flame className="w-6 h-6 text-orange-500" />
              <span className="font-black text-lg">{stats.total_questions_completed} Solved</span>
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8" staggerDelay={0.05}>
          {statCards.map((stat, index) => (
            <StaggerItem key={index}>
              <motion.div whileHover={{ y: -6 }} className="brutalist-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500">{stat.label}</span>
                  <div className={`w-10 h-10 ${stat.color} border-2 border-gray-900 flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
                <div className="text-3xl font-black">{stat.value}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Tabs */}
        <div className="brutalist-card p-2 rounded-xl mb-6">
          <div className="flex gap-2">
            {['practice', 'questions', 'patterns', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-3 px-4 font-black uppercase text-sm tracking-wider transition-all ${
                  activeTab === tab 
                    ? 'bg-primary text-white border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000]' 
                    : 'bg-white border-2 border-gray-200 hover:border-gray-900'
                }`}
              >
                {tab === 'practice' && <Play className="w-4 h-4 inline mr-2" />}
                {tab === 'questions' && <Code2 className="w-4 h-4 inline mr-2" />}
                {tab === 'patterns' && <Target className="w-4 h-4 inline mr-2" />}
                {tab === 'analytics' && <BarChart3 className="w-4 h-4 inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <FadeInUp>
            <div className="brutalist-card p-8 rounded-xl">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Brain className="w-8 h-8 text-primary" />
                Generate Question
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider mb-3">Topic</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`p-3 border-2 font-bold text-sm transition-all text-left ${
                          selectedTopic === topic
                            ? 'bg-primary text-white border-gray-900 shadow-[3px_3px_0px_0px_#000]'
                            : 'bg-white border-gray-200 hover:border-gray-900'
                        }`}
                      >
                        <span className="mr-2">{TOPIC_ICONS[topic] || '•'}</span>
                        {topic.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-wider mb-3">Difficulty</label>
                  <div className="grid grid-cols-3 gap-2">
                    {difficultyLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        className={`p-4 border-2 font-black uppercase text-sm transition-all ${
                          selectedDifficulty === level
                            ? 'bg-primary text-white border-gray-900 shadow-[3px_3px_0px_0px_#000]'
                            : 'bg-white border-gray-200 hover:border-gray-900'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generateMutation.isPending || !selectedTopic || !selectedDifficulty}
                className="w-full btn-brutalist py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {generateMutation.isPending ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                ) : (
                  <><Zap className="w-5 h-5" /> Generate Question</>
                )}
              </button>
            </div>
          </FadeInUp>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <FadeInUp>
            {questionsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => <div key={i} className="brutalist-card h-32 animate-pulse bg-gray-100" />)}
              </div>
            ) : questions && questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((question) => (
                  <DSAQuestionCard
                    key={question.id}
                    question={question}
                    expandedHints={expandedHints}
                    showSolution={showSolution}
                    onToggleHint={(id) => {
                      setExpandedHints(prev => {
                        const next = new Set(prev);
                        if (next.has(id)) next.delete(id);
                        else next.add(id);
                        return next;
                      });
                    }}
                    onToggleSolution={(id) => {
                      setShowSolution(prev => {
                        const next = new Set(prev);
                        if (next.has(id)) next.delete(id);
                        else next.add(id);
                        return next;
                      });
                    }}
                    onMarkComplete={(id) => completeMutation.mutate(id)}
                    onDelete={(id) => deleteMutation.mutate(id)}
                    isUpdating={completeMutation.isPending}
                    isDeleting={deleteMutation.isPending}
                  />
                ))}
              </div>
            ) : (
              <div className="brutalist-card p-12 text-center">
                <div className="w-20 h-20 bg-gray-200 border-2 border-gray-900 flex items-center justify-center mx-auto mb-6">
                  <Code2 className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-black mb-2">No questions yet</h3>
                <p className="text-gray-500 font-medium mb-6">Generate your first DSA question to start practicing</p>
                <button 
                  onClick={() => setActiveTab('practice')} 
                  className="btn-brutalist px-8 py-4 text-lg bg-primary text-white"
                >
                  Generate Your First Question
                </button>
              </div>
            )}
          </FadeInUp>
        )}

        {/* Patterns Tab - 95 Patterns Browser */}
        {activeTab === 'patterns' && (
          <FadeInUp>
            <div className="space-y-6">
              {/* Header */}
              <div className="brutalist-card p-6 rounded-xl">
                <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" />
                  95 DSA Patterns
                </h2>
                <p className="text-gray-600 font-medium">
                  Master these fundamental patterns to solve any coding interview problem. 
                  Click on a pattern to see related questions.
                </p>
              </div>

              {/* Pattern Categories Grid */}
              <div className="grid gap-6">
                {PATTERN_CATEGORIES.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="brutalist-card p-6 rounded-xl"
                    style={{ borderLeft: `4px solid ${category.color}` }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="text-xl font-black">{category.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{category.description}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <span className="text-2xl font-black" style={{ color: category.color }}>
                          {category.patterns.length}
                        </span>
                        <p className="text-xs text-gray-500 font-bold uppercase">patterns</p>
                      </div>
                    </div>

                    {/* Patterns Grid */}
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {category.patterns.map((pattern) => (
                        <motion.div
                          key={pattern.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-[3px_3px_0px_0px_#000] transition-all cursor-pointer bg-white"
                          onClick={() => {
                            // Find a question with this pattern and generate it
                            const patternQuestions = ALL_QUESTIONS.filter(q => q.pattern === pattern.id);
                            if (patternQuestions.length > 0) {
                              const randomQ = patternQuestions[Math.floor(Math.random() * patternQuestions.length)];
                              generateMutation.mutate({ 
                                topic: randomQ.topic, 
                                difficulty: randomQ.difficulty 
                              });
                              setActiveTab('questions' as const);
                            }
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-sm">{pattern.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                              pattern.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-700' :
                              pattern.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                              'bg-rose-100 text-rose-700'
                            }`}>
                              {pattern.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{pattern.description}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <BookOpen className="w-3 h-3" />
                            <span>{pattern.questionCount} questions</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="brutalist-card p-4 text-center">
                  <div className="text-3xl font-black text-primary">{PATTERN_CATEGORIES.length}</div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Categories</p>
                </div>
                <div className="brutalist-card p-4 text-center">
                  <div className="text-3xl font-black text-primary">
                    {PATTERN_CATEGORIES.reduce((acc, cat) => acc + cat.patterns.length, 0)}
                  </div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Total Patterns</p>
                </div>
                <div className="brutalist-card p-4 text-center">
                  <div className="text-3xl font-black text-primary">{ALL_QUESTIONS.length}</div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Questions</p>
                </div>
              </div>
            </div>
          </FadeInUp>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <FadeInUp>
            {stats.total_questions_attempted === 0 ? (
              <div className="brutalist-card p-12 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-black mb-2">No Data Yet</h3>
                <p className="text-gray-500 mb-6">Complete your first question to see analytics.</p>
                <button 
                  onClick={() => setActiveTab('practice')} 
                  className="btn-brutalist px-8 py-4 text-lg bg-primary text-white"
                >
                  Generate Your First Question
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Streak & Overview Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="brutalist-card p-4 text-center bg-gradient-to-br from-orange-50 to-amber-50">
                    <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                    <div className="text-2xl font-black text-orange-600">{stats.current_streak || 0}</div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Day Streak</p>
                  </div>
                  <div className="brutalist-card p-4 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-2xl font-black text-purple-600">{stats.longest_streak || 0}</div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Best Streak</p>
                  </div>
                  <div className="brutalist-card p-4 text-center bg-gradient-to-br from-blue-50 to-cyan-50">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-black text-blue-600">{stats.patterns_mastered || 0}</div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Patterns Mastered</p>
                  </div>
                  <div className="brutalist-card p-4 text-center bg-gradient-to-br from-green-50 to-emerald-50">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                    <div className="text-2xl font-black text-emerald-600">{completionRate}%</div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Success Rate</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Difficulty Distribution */}
                  <div className="brutalist-card p-6 rounded-xl">
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Difficulty Distribution
                    </h3>
                    <div className="space-y-3">
                      {['easy', 'medium', 'hard'].map((diff) => {
                        const count = stats.difficulty_distribution[diff as keyof typeof stats.difficulty_distribution];
                        const percentage = stats.total_questions_attempted > 0 ? (count / stats.total_questions_attempted) * 100 : 0;
                        return (
                          <div key={diff} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-black uppercase">{diff}</span>
                              <span className="font-bold text-gray-500">{count} ({Math.round(percentage)}%)</span>
                            </div>
                            <div className="h-4 bg-gray-100 border-2 border-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                className={`h-full ${
                                  diff === 'easy' ? 'bg-emerald-400' :
                                  diff === 'medium' ? 'bg-amber-400' :
                                  'bg-rose-400'
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Topic Breakdown */}
                  <div className="brutalist-card p-6 rounded-xl">
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Topic Breakdown
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {topicBreakdown.map(({ topic, count, percentage }) => (
                        <div key={topic} className="flex items-center gap-3">
                          <span className="w-8 text-center text-lg">{TOPIC_ICONS[topic] || '•'}</span>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-bold capitalize">{topic.replace(/_/g, ' ')}</span>
                              <span className="text-gray-500 font-medium">{count}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pattern Mastery Progress */}
                <div className="brutalist-card p-6 rounded-xl">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Pattern Mastery Progress
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {PATTERN_CATEGORIES.map((category) => {
                      const practicedCount = stats.topics_practiced.filter(t => 
                        category.patterns.some(p => p.id.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(p.id.toLowerCase()))
                      ).length;
                      const progress = Math.min(100, (practicedCount / Math.max(1, category.patterns.length)) * 100);
                      return (
                        <div key={category.id} className="text-center p-3 border-2 border-gray-200 rounded-lg">
                          <div className="text-2xl mb-1">{category.icon}</div>
                          <p className="text-xs font-bold truncate">{category.name}</p>
                          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ width: `${progress}%`, backgroundColor: category.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pattern Mastery Radar Chart */}
                <div className="brutalist-card p-6 rounded-xl">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Hexagon className="w-5 h-5" />
                    Pattern Mastery Radar
                  </h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={
                        PATTERN_CATEGORIES.map(cat => {
                          const practicedCount = stats.topics_practiced.filter(t => 
                            cat.patterns.some(p => p.id.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(p.id.toLowerCase()))
                          ).length;
                          return {
                            category: cat.name,
                            fullMark: 100,
                            progress: Math.min(100, (practicedCount / Math.max(1, cat.patterns.length)) * 100),
                            solved: questions?.filter(q => q.is_completed && cat.patterns.some(p => p.id === q.pattern)).length || 0
                          };
                        })
                      }>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="category" tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                        <Radar
                          name="Mastery Progress (%)"
                          dataKey="progress"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white border-2 border-gray-900 p-3 rounded-lg shadow-lg">
                                  <p className="font-bold text-gray-900">{data.category}</p>
                                  <p className="text-sm text-gray-600">{Math.round(data.progress)}% explored</p>
                                  <p className="text-sm text-blue-600 font-semibold">{data.solved} questions solved</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Hexagonal radar showing your mastery across all 10 pattern categories
                  </p>
                </div>

                {/* Recent Activity */}
                <div className="brutalist-card p-6 rounded-xl">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Recent Activity
                  </h3>
                  {questions && questions.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {questions.slice(0, 10).map((q, index) => (
                        <div key={q.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            q.is_completed ? 'bg-emerald-400' : 'bg-amber-400'
                          }`} />
                          <div className="flex-1">
                            <p className="font-bold text-sm truncate">{q.title}</p>
                            <p className="text-xs text-gray-500">
                              {q.topic.replace(/_/g, ' ')} • {q.difficulty}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {q.completed_at ? new Date(q.completed_at).toLocaleDateString() : 
                             new Date(q.created_at).toLocaleDateString()}
                          </span>
                          {q.is_completed && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No recent activity</p>
                  )}
                </div>
              </div>
            )}
          </FadeInUp>
        )}
      </div>
    </div>
  );
}
