'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, CheckCircle2, AlertCircle, XCircle, 
  MessageSquare, Clock, ChevronRight, ChevronLeft,
  Trophy, Target, Brain, Zap, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineNode {
  id: string;
  timestamp: number;
  question: string;
  answer: string;
  quality: 'strong' | 'okay' | 'weak';
  score: number;
  analysis: string;
  duration: number;
  aiFeedback: string;
}

interface InterviewReplayProps {
  nodes: TimelineNode[];
  overallScore: number;
  onClose: () => void;
  onRetry: () => void;
}

const getQualityConfig = (quality: string) => {
  switch (quality) {
    case 'strong':
      return {
        color: 'bg-emerald-500',
        borderColor: 'border-emerald-500',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        icon: CheckCircle2,
        label: 'Strong Answer',
        description: 'Clear, structured, and comprehensive'
      };
    case 'okay':
      return {
        color: 'bg-amber-500',
        borderColor: 'border-amber-500',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        icon: AlertCircle,
        label: 'Good Effort',
        description: 'Decent but could be improved'
      };
    case 'weak':
      return {
        color: 'bg-rose-500',
        borderColor: 'border-rose-500',
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-700',
        icon: XCircle,
        label: 'Needs Work',
        description: 'Lacks depth or clarity'
      };
    default:
      return {
        color: 'bg-gray-500',
        borderColor: 'border-gray-500',
        bgColor: 'bg-gray-50',
        textColor: 'text-gray-700',
        icon: MessageSquare,
        label: 'Unknown',
        description: ''
      };
  }
};

export const InterviewReplay: React.FC<InterviewReplayProps> = ({ 
  nodes, 
  overallScore, 
  onClose,
  onRetry 
}) => {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNodeClick = (node: TimelineNode, index: number) => {
    setSelectedNode(node);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedNode(nodes[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < nodes.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedNode(nodes[newIndex]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  const strongCount = nodes.filter(n => n.quality === 'strong').length;
  const okayCount = nodes.filter(n => n.quality === 'okay').length;
  const weakCount = nodes.filter(n => n.quality === 'weak').length;

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
            <Play className="w-5 h-5 text-primary" />
            <span className="text-sm font-black uppercase tracking-wider text-primary">Interview Replay</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            Review Your Performance
          </h1>
          <p className="text-xl text-gray-600">
            Click any node to see detailed feedback
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="brutalist-card border-emerald-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-emerald-500">{strongCount}</div>
              <div className="text-sm font-bold text-gray-600">Strong</div>
            </CardContent>
          </Card>
          <Card className="brutalist-card border-amber-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-amber-500">{okayCount}</div>
              <div className="text-sm font-bold text-gray-600">Okay</div>
            </CardContent>
          </Card>
          <Card className="brutalist-card border-rose-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-black text-rose-500">{weakCount}</div>
              <div className="text-sm font-bold text-gray-600">Needs Work</div>
            </CardContent>
          </Card>
          <Card className="brutalist-card border-primary/30">
            <CardContent className="p-4 text-center">
              <div className={`text-3xl font-black ${getScoreColor(overallScore)}`}>{overallScore}%</div>
              <div className="text-sm font-bold text-gray-600">Overall</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="brutalist-card h-[600px] flex flex-col">
              <CardContent className="p-6 flex-1 overflow-hidden flex flex-col">
                <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Conversation Timeline
                </h3>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                  {nodes.map((node, index) => {
                    const config = getQualityConfig(node.quality);
                    const Icon = config.icon;
                    const isSelected = selectedNode?.id === node.id;
                    
                    return (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        onClick={() => handleNodeClick(node, index)}
                        className={`
                          relative p-4 rounded-xl border-2 cursor-pointer transition-all
                          ${isSelected ? 'border-primary shadow-lg bg-primary/5' : 'border-gray-200 hover:border-gray-300'}
                        `}
                      >
                        {/* Timeline connector */}
                        {index < nodes.length - 1 && (
                          <div className="absolute left-6 top-full w-0.5 h-4 bg-gray-200" />
                        )}
                        
                        <div className="flex items-start gap-4">
                          {/* Quality Node */}
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                            ${config.color} text-white shadow-lg
                          `}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`${config.bgColor} ${config.textColor} border-0`}>
                                {config.label}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {Math.floor(node.timestamp / 60)}:{(node.timestamp % 60).toString().padStart(2, '0')}
                              </span>
                            </div>
                            
                            <p className="text-gray-900 font-semibold line-clamp-2 mb-1">
                              Q{index + 1}: {node.question}
                            </p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className={`font-bold ${getScoreColor(node.score)}`}>
                                {node.score}%
                              </span>
                              <span>{Math.round(node.duration)}s response</span>
                            </div>
                          </div>
                          
                          <ChevronRight className={`
                            w-5 h-5 transition-transform
                            ${isSelected ? 'text-primary rotate-90' : 'text-gray-400'}
                          `} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detail View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <Card className="brutalist-card h-full flex flex-col">
                    <CardContent className="p-6 flex-1 overflow-y-auto">
                      {/* Navigation */}
                      <div className="flex items-center justify-between mb-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handlePrev}
                          disabled={currentIndex === 0}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </Button>
                        
                        <span className="text-sm font-bold text-gray-600">
                          Question {currentIndex + 1} of {nodes.length}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleNext}
                          disabled={currentIndex === nodes.length - 1}
                          className="flex items-center gap-1"
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quality Badge */}
                      <div className="mb-6">
                        {(() => {
                          const config = getQualityConfig(selectedNode.quality);
                          return (
                            <div className={`p-4 rounded-xl ${config.bgColor} border-2 ${config.borderColor}`}>
                              <div className="flex items-center gap-3">
                                <config.icon className={`w-8 h-8 ${config.textColor}`} />
                                <div>
                                  <div className={`font-black text-lg ${config.textColor}`}>
                                    {config.label} — {selectedNode.score}%
                                  </div>
                                  <div className="text-sm text-gray-600">{config.description}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Question */}
                      <div className="mb-6">
                        <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Interviewer's Question
                        </h4>
                        <div className="p-4 bg-gray-100 rounded-xl border-2 border-gray-200">
                          <p className="text-gray-900 font-semibold">{selectedNode.question}</p>
                        </div>
                      </div>

                      {/* Answer */}
                      <div className="mb-6">
                        <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Your Answer
                        </h4>
                        <div className="p-4 bg-white rounded-xl border-2 border-gray-200 max-h-40 overflow-y-auto">
                          <p className="text-gray-700">{selectedNode.answer || 'No answer recorded'}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Response time: {Math.round(selectedNode.duration)} seconds
                        </p>
                      </div>

                      {/* AI Analysis */}
                      <div className="mb-6">
                        <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          AI Analysis
                        </h4>
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
                          <p className="text-gray-800 leading-relaxed">{selectedNode.analysis}</p>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Improvement Tips
                        </h4>
                        <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
                          <p className="text-gray-800">{selectedNode.aiFeedback}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <Card className="brutalist-card p-12 text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      Select a Question
                    </h3>
                    <p className="text-gray-600 max-w-sm">
                      Click on any timeline node to see the detailed breakdown of your answer
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <Button
            onClick={onRetry}
            variant="outline"
            className="btn-brutalist-outline px-8 py-4 text-lg flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Try Again
          </Button>
          
          <Button
            onClick={onClose}
            className="btn-brutalist px-8 py-4 text-lg flex items-center gap-2"
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
