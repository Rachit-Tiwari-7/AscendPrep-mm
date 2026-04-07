'use client';

import React from 'react';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Target } from 'lucide-react';
import { enhanceResumeWithAI } from '@/app/resume-ats/actions/frontend-ats';
import { toast } from 'sonner';

export const SummaryForm: React.FC = () => {
  const { resumeData, setSummary, setTargetJobRole } = useResumeStore();

  const handleEnhanceSummary = async () => {
    if (!resumeData.summary.trim()) {
      toast.error('Please write a summary first before enhancing it.');
      return;
    }

    if (!resumeData.targetJobRole.trim()) {
      toast.error('Please specify a target job role first.');
      return;
    }

    try {
      toast.loading('Enhancing your summary with AI...', { id: 'enhance-summary' });
      const enhancedResume = await enhanceResumeWithAI(resumeData);
      setSummary(enhancedResume.summary);
      toast.success('Summary enhanced successfully!', { id: 'enhance-summary' });
    } catch (error) {
      toast.error('Failed to enhance summary. Please try again.', { id: 'enhance-summary' });
    }
  };

  const getSummaryLength = () => {
    return resumeData.summary.length;
  };

  const getSummaryWordCount = () => {
    return resumeData.summary.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getSummarySuggestions = () => {
    const suggestions = [];
    const wordCount = getSummaryWordCount();
    
    if (wordCount < 30) {
      suggestions.push('Consider adding more detail to your summary (aim for 50-100 words)');
    } else if (wordCount > 150) {
      suggestions.push('Your summary is quite long. Consider making it more concise (aim for 50-100 words)');
    }

    if (!resumeData.summary.toLowerCase().includes(resumeData.targetJobRole.toLowerCase()) && resumeData.targetJobRole) {
      suggestions.push(`Consider mentioning "${resumeData.targetJobRole}" in your summary`);
    }

    const actionVerbs = ['led', 'developed', 'implemented', 'created', 'managed', 'achieved'];
    const hasActionVerbs = actionVerbs.some(verb => 
      resumeData.summary.toLowerCase().includes(verb)
    );
    
    if (!hasActionVerbs) {
      suggestions.push('Include action verbs like "led", "developed", "implemented", etc.');
    }

    return suggestions;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Professional Summary
            </CardTitle>
            <Button
              onClick={handleEnhanceSummary}
              variant="outline"
              className="flex items-center gap-2"
              disabled={!resumeData.summary.trim() || !resumeData.targetJobRole.trim()}
            >
              <Sparkles className="w-4 h-4" />
              AI Enhance
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">
              Write a compelling summary that highlights your key achievements and career goals
            </Label>
            <Textarea
              id="summary"
              value={resumeData.summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Results-driven software engineer with 5+ years of experience developing scalable web applications. Proven track record of leading cross-functional teams to deliver high-impact projects that increase user engagement and revenue. Seeking to leverage technical expertise and leadership skills in a senior engineering role."
              className="min-h-32 resize-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{getSummaryWordCount()} words</span>
            <span>{getSummaryLength()} characters</span>
          </div>

          {resumeData.targetJobRole && (
            <div className="flex items-center gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <Target className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-800">
                Targeting: <strong>{resumeData.targetJobRole}</strong>
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Summary Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{getSummaryWordCount()}</div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {getSummaryWordCount() >= 30 && getSummaryWordCount() <= 150 ? '✓' : '!'}
              </div>
              <div className="text-sm text-gray-600">Length</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {resumeData.summary.toLowerCase().includes(resumeData.targetJobRole.toLowerCase()) && resumeData.targetJobRole ? '✓' : '!'}
              </div>
              <div className="text-sm text-gray-600">Target Role</div>
            </div>
          </div>

          {getSummarySuggestions().length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Suggestions</Label>
              <div className="space-y-1">
                {getSummarySuggestions().map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-amber-700">
                    <span className="text-amber-500">•</span>
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-blue-900">
            💡 Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>• Keep your summary between 50-100 words for optimal readability</p>
          <p>• Start with your years of experience and key specialization</p>
          <p>• Include 2-3 major achievements with quantifiable results</p>
          <p>• Mention your target role or career goals</p>
          <p>• Use action verbs and industry-specific keywords</p>
        </CardContent>
      </Card>
    </div>
  );
};
