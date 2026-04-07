'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Trash2,
  Clock,
  RotateCcw,
  Loader2,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import { DSAQuestion } from './api';

interface DSAQuestionCardProps {
  question: DSAQuestion;
  expandedHints: Set<number>;
  showSolution: Set<number>;
  onToggleHint: (questionId: number) => void;
  onToggleSolution: (questionId: number) => void;
  onMarkComplete: (questionId: number) => void;
  onDelete: (questionId: number) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'bg-green-500/10 text-green-600 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  hard: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const TOPIC_ICONS: Record<string, string> = {
  arrays: '[]',
  strings: '""',
  linked_list: '→',
  trees: '🌳',
  graphs: '◎',
  dynamic_programming: '🔄',
  sorting: '⇅',
  searching: '🔍',
  hash_table: '{}',
  heap: '⛰️',
  stack: '📚',
  queue: '⏳',
  backtracking: '↩️',
  bit_manipulation: '01',
  math: '∑',
};

export function DSAQuestionCard({
  question,
  expandedHints,
  showSolution,
  onToggleHint,
  onToggleSolution,
  onMarkComplete,
  onDelete,
  isUpdating,
  isDeleting,
}: DSAQuestionCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isHintExpanded = expandedHints.has(question.id);
  const isSolutionVisible = showSolution.has(question.id);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this question?')) {
      onDelete(question.id);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Badge 
                variant="outline" 
                className={`capitalize ${DIFFICULTY_COLORS[question.difficulty] || ''}`}
              >
                {question.difficulty}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {TOPIC_ICONS[question.topic] && <span className="mr-1">{TOPIC_ICONS[question.topic]}</span>}
                {question.topic.replace('_', ' ')}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-tight">{question.title}</CardTitle>
            <CardDescription className="mt-1">
              Generated on {new Date(question.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkComplete(question.id)}
              disabled={isUpdating}
              className="text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <span className="ml-1 hidden sm:inline">Complete</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* LeetCode Link - Prominent Solve Button */}
        {question.leetCodeUrl && (
          <a 
            href={question.leetCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#FFA116] hover:bg-[#FF9100] text-white font-bold rounded-lg transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            Solve on LeetCode
          </a>
        )}

        {/* Problem Description */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Problem Description
          </h4>
          <div 
            className={`text-sm text-muted-foreground whitespace-pre-wrap ${
              !showFullDescription && question.problem_description?.length > 300 
                ? 'line-clamp-4' 
                : ''
            }`}
          >
            {question.problem_description || 'No description available.'}
          </div>
          {question.problem_description?.length > 300 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-xs"
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </div>

        {/* Constraints */}
        {(() => {
          // Normalize constraints to always be an array
          const constraints = Array.isArray(question.constraints) 
            ? question.constraints 
            : typeof question.constraints === 'string' 
              ? [question.constraints] 
              : [];
          
          return constraints.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Constraints</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                {constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          );
        })()}

        {/* Example */}
        {(question.example_input || question.example_output) && (
          <div className="space-y-3 bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-sm">Example</h4>
            {question.example_input && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Input:</span>
                <pre className="mt-1 text-sm bg-background rounded p-2 overflow-x-auto">
                  {question.example_input}
                </pre>
              </div>
            )}
            {question.example_output && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Output:</span>
                <pre className="mt-1 text-sm bg-background rounded p-2 overflow-x-auto">
                  {question.example_output}
                </pre>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Hints Section */}
        {question.hints && question.hints.length > 0 && (
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => onToggleHint(question.id)}
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Hints ({question.hints.length})
              </span>
              {isHintExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            
            {isHintExpanded && (
              <div className="space-y-2 bg-yellow-50/50 dark:bg-yellow-950/20 rounded-lg p-4">
                {question.hints.map((hint, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-700 text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Solution Section */}
        {question.solution_explanation && (
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => onToggleSolution(question.id)}
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                {isSolutionVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {isSolutionVisible ? 'Hide Solution' : 'Show Solution'}
              </span>
            </Button>
            
            {isSolutionVisible && (
              <div className="space-y-2 bg-green-50/50 dark:bg-green-950/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Solution Explanation
                </h4>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {question.solution_explanation}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
