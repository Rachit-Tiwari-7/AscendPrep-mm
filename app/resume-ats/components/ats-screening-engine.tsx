'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Zap,
  FileText,
  BarChart3
} from 'lucide-react';
import { analyzeResumeWithATS, enhanceResumeWithAI } from '@/app/resume-ats/actions/frontend-ats';
import { toast } from 'sonner';

export const ATSScreeningEngine: React.FC = () => {
  const { resumeData, atsReport, setATSReport, setIsAnalyzing, isAnalyzing } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalyzeResume = () => {
    if (!jobDescription.trim()) {
      toast.error('Please enter a job description to analyze against.');
      return;
    }

    if (!resumeData.personalDetails.fullName) {
      toast.error('Please complete your resume before running ATS analysis.');
      return;
    }

    try {
      setIsAnalyzing(true);
      
      const report = analyzeResumeWithATS(resumeData, jobDescription);
      setATSReport(report);
      
      toast.success('ATS analysis completed!');
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast.error('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 space-y-6 min-h-[500px]">
      {/* Job Description Input */}
      <div className="brutalist-card p-6 rounded-xl">
        <h3 className="font-black text-xl mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Job Description
        </h3>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to analyze your resume against it..."
          className="w-full h-48 p-4 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white font-medium"
        />
        <Button
          onClick={handleAnalyzeResume}
          disabled={isAnalyzing || !jobDescription.trim()}
          className="mt-6 btn-brutalist w-full py-6 text-lg"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 animate-pulse" />
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analyze Resume
            </span>
          )}
        </Button>
      </div>

      {/* Results */}
      {atsReport && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="brutalist-card p-6 rounded-xl bg-primary text-white">
            <h3 className="font-black text-2xl mb-2">Overall Score</h3>
            <div className="text-6xl font-black">{atsReport.score.overall}%</div>
            <p className="mt-4 font-bold opacity-90">
              Your resume matches {atsReport.score.overall}% of the job requirements.
            </p>
          </div>

          <div className="brutalist-card p-6 rounded-xl">
            <h3 className="font-black text-xl mb-4">Score Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: 'Skills Match', value: atsReport.score.skillsMatch },
                { label: 'Experience Relevance', value: atsReport.score.experienceRelevance },
                { label: 'Formatting', value: atsReport.score.formatting },
                { label: 'Impact', value: atsReport.score.impact }
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-1000" 
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
