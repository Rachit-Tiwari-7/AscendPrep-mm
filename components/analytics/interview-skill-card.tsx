'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Lightbulb, AlertTriangle, Mic, Clock, HelpCircle, UserX, Frown } from 'lucide-react';
import { SkillRadarChart } from './skill-radar-chart';
import { InterviewSkillBreakdown } from '@/app/api/interviews';

interface InterviewSkillCardProps {
  breakdown: InterviewSkillBreakdown;
  showRadar?: boolean;
}

export function InterviewSkillCard({ breakdown, showRadar = true }: InterviewSkillCardProps) {
  const { skill_breakdown, interview_title, completed_at } = breakdown;

  // Build radar chart data
  const radarData = [
    { skill: 'Communication', score: Math.round(skill_breakdown.communication.score * 100) },
    { skill: 'Technical', score: Math.round(skill_breakdown.technical.score * 100) },
    { skill: 'Problem Solving', score: Math.round(skill_breakdown.problem_solving.score * 100) },
    { skill: 'Code Quality', score: Math.round(skill_breakdown.code_quality.score * 100) },
  ];

  const skills = [
    { key: 'communication' as const, label: 'Communication', icon: '💬' },
    { key: 'technical' as const, label: 'Technical', icon: '💻' },
    { key: 'problem_solving' as const, label: 'Problem Solving', icon: '🧩' },
    { key: 'code_quality' as const, label: 'Code Quality', icon: '📝' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent';
    if (score >= 0.6) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>{interview_title}</CardTitle>
          {completed_at && (
            <CardDescription>
              Completed on {new Date(completed_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          )}
        </CardHeader>
      </Card>

      {/* Radar Chart */}
      {showRadar && (
        <SkillRadarChart
          data={radarData}
          title="Skill Breakdown"
          description="Performance across different skill areas"
        />
      )}

      {/* Common Problems Section - REAL DATA from Groq */}
      {breakdown.detected_issues && breakdown.detected_issues.length > 0 && (
        <Card className="border-rose-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 border-2 border-rose-900 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <CardTitle>Issues Detected</CardTitle>
                <CardDescription>{breakdown.detected_issues.length} problem(s) found in this interview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {breakdown.detected_issues.map((issue, idx) => {
                const iconMap: Record<string, any> = {
                  filler_words: Mic,
                  rambling: Clock,
                  no_clarifying: HelpCircle,
                  poor_posture: UserX,
                  low_confidence: Frown,
                  weak_intro: Lightbulb,
                  other: AlertTriangle,
                };
                const IssueIcon = iconMap[issue.issue_type] || AlertTriangle;
                const colorMap: Record<string, string> = {
                  high: 'rose',
                  medium: 'amber',
                  low: 'blue',
                };
                const color = colorMap[issue.severity] || 'gray';
                
                return (
                  <div 
                    key={idx}
                    className={`p-3 rounded-lg border-2 bg-${color}-50 border-${color}-200`}
                  >
                    <div className="flex items-start gap-2">
                      <IssueIcon className={`w-4 h-4 mt-0.5 text-${color}-500`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`font-bold text-sm text-${color}-700`}>
                            {issue.issue_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase bg-${color}-100 text-${color}-700`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{issue.description}</p>
                        {issue.count > 1 && (
                          <p className="text-xs text-gray-500">Detected {issue.count} times</p>
                        )}
                        {issue.context && (
                          <p className="text-xs text-gray-400 italic mt-1">"{issue.context}"</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Breakdown per Skill */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => {
          const skillData = skill_breakdown[skill.key];
          const score = skillData.score;
          const percentage = Math.round(score * 100);

          return (
            <Card key={skill.key}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>{skill.icon}</span>
                    <span>{skill.label}</span>
                  </CardTitle>
                  <Badge className={getScoreColor(score)}>
                    {percentage}% - {getScoreLabel(score)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Score Bar */}
                <div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Score</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getScoreColor(score)} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Strengths */}
                {skillData.strengths && skillData.strengths.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-semibold text-sm">Strengths</span>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {skillData.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground list-disc">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {skillData.weaknesses && skillData.weaknesses.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="font-semibold text-sm">Areas for Improvement</span>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {skillData.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground list-disc">
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {skillData.recommendations && skillData.recommendations.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold text-sm">Recommendations</span>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {skillData.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground list-disc">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}





