'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  Brain,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Code2,
  Briefcase,
  GraduationCap,
  Zap,
  ChevronRight,
  Upload,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { resumesApi } from '@/app/api/resumes';
import { resumeIntelligenceApi, ResumeInsight } from './api';
import { toast } from 'sonner';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';

interface Resume {
  id: number;
  file_name: string;
  file_size: number;
  file_type: string;
  analysis_status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export default function ResumeIntelligencePage() {
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [targetRole, setTargetRole] = useState('');
  const queryClient = useQueryClient();
  
  // Get local resume from store
  const { resumeData } = useResumeStore();
  const hasLocalResume = resumeData.personalDetails.fullName && 
    (resumeData.experience.length > 0 || resumeData.education.length > 0 || resumeData.skills.length > 0);

  // Fetch resumes from API
  const { data: apiResumes, isLoading: resumesLoading } = useQuery<Resume[]>({
    queryKey: ['resumes'],
    queryFn: () => resumesApi.list(),
  });

  // Fetch latest insight
  const { data: latestInsight, isLoading: insightLoading } = useQuery<ResumeInsight>({
    queryKey: ['resume-insight', selectedResumeId],
    queryFn: () => {
      if (selectedResumeId) {
        return resumeIntelligenceApi.getByResumeId(selectedResumeId);
      }
      return resumeIntelligenceApi.list().then((insights) => insights[0]);
    },
    enabled: !!apiResumes && apiResumes.length > 0,
  });

  // Analyze mutation
  const analyzeMutation = useMutation({
    mutationFn: async (resumeId: number) => {
      return resumeIntelligenceApi.analyze({
        resume_id: resumeId,
        target_role: targetRole || undefined,
      });
    },
    onSuccess: () => {
      toast.success('Resume analysis completed!');
      queryClient.invalidateQueries({ queryKey: ['resume-insight'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to analyze resume');
    },
  });

  const handleAnalyze = (resumeId: number) => {
    setSelectedResumeId(resumeId);
    analyzeMutation.mutate(resumeId);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Resume Intelligence</h1>
        </div>
        <p className="text-muted-foreground">
          AI-powered resume analysis to extract skills, detect gaps, and personalize your interview preparation.
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="skills">Skills & Gaps</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {/* Resume Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Select Resume to Analyze
              </CardTitle>
              <CardDescription>
                Choose a resume to extract skills and generate insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resumesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (apiResumes && apiResumes.length > 0) || hasLocalResume ? (
                <div className="space-y-2">
                  {/* Local Resume from Builder */}
                  {hasLocalResume && (
                    <div
                      className={`flex items-center justify-between p-3 rounded-lg border-2 border-dashed border-primary/50 cursor-pointer transition-colors bg-primary/5`}
                      onClick={() => toast.info('Upload this resume to analyze it')}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{resumeData.personalDetails.fullName} - Resume (Local)</p>
                          <p className="text-sm text-muted-foreground">
                            Created from Resume Builder • Not yet uploaded
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Upload className="mr-1 h-3 w-3" />
                          Upload to Analyze
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link href="/resume-ats">
                            Edit in Builder
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* API Resumes */}
                  {apiResumes?.map((resume) => (
                    <div
                      key={resume.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedResumeId === resume.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedResumeId(resume.id)}
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{resume.file_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(resume.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {resume.analysis_status === 'completed' && (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Analyzed
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAnalyze(resume.id);
                          }}
                          disabled={analyzeMutation.isPending}
                        >
                          {analyzeMutation.isPending && selectedResumeId === resume.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Analyze
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No resumes found.{' '}
                    <Link href="/dashboard/resumes" className="underline">
                      Upload a resume
                    </Link>{' '}
                    or{' '}
                    <Link href="/resume-ats" className="underline">
                      create one in the Resume Builder
                    </Link>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Overall Score */}
          {latestInsight && latestInsight.analysis_status === 'completed' && (
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Resume Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(latestInsight.resume_score)}`}>
                      {latestInsight.resume_score}
                    </div>
                    <p className="text-muted-foreground mt-2">Overall Score</p>
                  </div>
                  <div className="flex-1 ml-8 space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Technical Depth</span>
                        <span>{latestInsight.technical_depth_score}%</span>
                      </div>
                      <Progress value={latestInsight.technical_depth_score} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Experience Quality</span>
                        <span>{latestInsight.experience_quality_score}%</span>
                      </div>
                      <Progress value={latestInsight.experience_quality_score} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Education</span>
                        <span>{latestInsight.education_score}%</span>
                      </div>
                      <Progress value={latestInsight.education_score} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Presentation</span>
                        <span>{latestInsight.presentation_score}%</span>
                      </div>
                      <Progress value={latestInsight.presentation_score} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Skills & Gaps Tab */}
        <TabsContent value="skills" className="space-y-6">
          {latestInsight && latestInsight.analysis_status === 'completed' ? (
            <>
              {/* Technical Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {latestInsight.technical_skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Programming Languages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Programming Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {latestInsight.programming_languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-sm py-1 px-3">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skill Gaps */}
              {latestInsight.missing_skills.length > 0 && (
                <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      Detected Skill Gaps
                    </CardTitle>
                    <CardDescription>
                      Skills recommended for your experience level ({latestInsight.experience_level})
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {latestInsight.missing_skills.map((skill) => (
                        <Badge key={skill} variant="destructive" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Analysis Available</h3>
                <p className="text-muted-foreground mb-4">
                  Select a resume in the Analysis tab to view your skills.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          {latestInsight && latestInsight.analysis_status === 'completed' ? (
            <>
              {/* Suggested Roles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Suggested Roles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {latestInsight.suggested_roles.map((role) => (
                      <div
                        key={role}
                        className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* DSA Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recommended DSA Topics
                  </CardTitle>
                  <CardDescription>
                    Based on your skill profile and experience level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {latestInsight.recommended_dsa_topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="justify-center py-2">
                        {topic.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interview Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Recommended Interview Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {latestInsight.recommended_interview_topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-sm py-1 px-3">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Recommendations Available</h3>
                <p className="text-muted-foreground mb-4">
                  Analyze your resume to get personalized recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
