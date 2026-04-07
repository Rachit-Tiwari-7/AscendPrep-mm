'use client';

import { ResumeData, ATSReport, ATSInsight, ATSScore } from '@/store/resume-ats/use-resume-store';

// Common technical skills and keywords for matching
const TECHNICAL_SKILLS = [
  'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'c++', 'c#', 'sql',
  'html', 'css', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'mongodb', 'postgresql',
  'mysql', 'redis', 'graphql', 'rest api', 'api', 'microservices', 'devops', 'ci/cd',
  'machine learning', 'ai', 'data science', 'analytics', 'tensorflow', 'pytorch',
  'angular', 'vue.js', 'express', 'django', 'flask', 'spring', 'laravel', 'rails',
  'mobile', 'ios', 'android', 'react native', 'flutter', 'swift', 'kotlin',
  'blockchain', 'web3', 'smart contracts', 'security', 'testing', 'unit testing',
  'agile', 'scrum', 'jenkins', 'terraform', 'ansible', 'linux', 'ubuntu'
];

// Common action verbs for impact analysis
const ACTION_VERBS = [
  'led', 'developed', 'implemented', 'created', 'designed', 'built', 'launched',
  'improved', 'optimized', 'increased', 'reduced', 'managed', 'coordinated',
  'achieved', 'delivered', 'deployed', 'maintained', 'supported', 'trained',
  'mentored', 'guided', 'solved', 'fixed', 'resolved', 'automated', 'streamlined'
];

// Common metrics words
const METRICS_WORDS = [
  '%', 'percent', 'increase', 'decrease', 'growth', 'reduction', 'saved', 'generated',
  'users', 'customers', 'revenue', 'sales', 'time', 'hours', 'days', 'months',
  'million', 'billion', 'thousand', 'hundred', 'score', 'rating', 'improvement'
];

export function extractKeywordsFromText(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);

  const keywords = new Set<string>();
  
  // Extract technical skills
  TECHNICAL_SKILLS.forEach(skill => {
    if (text.toLowerCase().includes(skill)) {
      keywords.add(skill);
    }
  });

  // Extract other important words (filter common words)
  const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'our', 'their', 'a', 'an']);
  
  words.forEach(word => {
    if (!commonWords.has(word) && word.length >= 3) {
      keywords.add(word);
    }
  });

  return Array.from(keywords);
}

export function extractJobKeywords(jobDescription: string) {
  const text = jobDescription.toLowerCase();
  const keywords = extractKeywordsFromText(text);
  
  // Categorize keywords
  const skills = keywords.filter(keyword => 
    TECHNICAL_SKILLS.some(skill => keyword.includes(skill) || skill.includes(keyword))
  );
  
  const qualifications = keywords.filter(keyword => 
    ['year', 'years', 'experience', 'degree', 'bachelor', 'master', 'phd', 'certification', 'certified'].some(q => keyword.includes(q))
  );
  
  const experience = keywords.filter(keyword => 
    ['senior', 'junior', 'lead', 'principal', 'staff', 'manager', 'director', 'vp', 'head'].some(level => keyword.includes(level))
  );

  return {
    keywords,
    skills,
    qualifications,
    experience
  };
}

export function calculateSkillsMatch(resumeData: ResumeData, jobSkills: string[]): number {
  const resumeText = [
    resumeData.summary,
    ...resumeData.experience.map(exp => exp.description.join(' ')),
    ...resumeData.projects.map(proj => proj.description),
    ...resumeData.skills.map(skill => skill.name.toLowerCase())
  ].join(' ').toLowerCase();

  const resumeSkills = extractKeywordsFromText(resumeText);
  const matchedSkills = jobSkills.filter(skill => 
    resumeSkills.some(resumeSkill => 
      resumeSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(resumeSkill)
    )
  );

  return jobSkills.length > 0 ? Math.round((matchedSkills.length / jobSkills.length) * 100) : 0;
}

export function calculateExperienceRelevance(resumeData: ResumeData, jobRequirements: string[]): number {
  const experienceText = resumeData.experience.map(exp => 
    `${exp.position} ${exp.company} ${exp.description.join(' ')}`
  ).join(' ').toLowerCase();

  let relevanceScore = 0;
  const totalRequirements = jobRequirements.length;

  jobRequirements.forEach(req => {
    if (experienceText.includes(req.toLowerCase())) {
      relevanceScore += 1;
    }
  });

  // Bonus for years of experience
  const totalExperience = resumeData.experience.reduce((total, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.current ? new Date() : new Date(exp.endDate);
    const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return total + years;
  }, 0);

  const experienceBonus = Math.min(totalExperience * 5, 25); // Max 25 points for experience
  
  return Math.min(Math.round((relevanceScore / totalRequirements) * 75 + experienceBonus), 100);
}

export function calculateFormattingScore(resumeData: ResumeData): number {
  let score = 100;
  
  // Deductions for common ATS issues
  if (!resumeData.personalDetails.email) score -= 10;
  if (!resumeData.personalDetails.phone) score -= 10;
  if (!resumeData.summary || resumeData.summary.length < 50) score -= 15;
  if (resumeData.experience.length === 0) score -= 20;
  if (resumeData.education.length === 0) score -= 15;
  if (resumeData.skills.length === 0) score -= 10;
  
  // Bonus for good structure
  if (resumeData.experience.length >= 2) score += 5;
  if (resumeData.projects.length > 0) score += 5;
  if (resumeData.skills.length >= 5) score += 5;
  
  return Math.max(0, Math.min(100, score));
}

export function calculateKeywordDensity(resumeData: ResumeData, jobKeywords: string[]): number {
  const resumeText = [
    resumeData.summary,
    ...resumeData.experience.map(exp => exp.description.join(' ')),
    ...resumeData.projects.map(proj => proj.description),
    resumeData.targetJobRole
  ].join(' ').toLowerCase();

  const resumeKeywords = extractKeywordsFromText(resumeText);
  const matchedKeywords = jobKeywords.filter(keyword => 
    resumeKeywords.some(resumeKeyword => 
      resumeKeyword.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(resumeKeyword)
    )
  );

  return jobKeywords.length > 0 ? Math.round((matchedKeywords.length / jobKeywords.length) * 100) : 0;
}

export function calculateImpactScore(resumeData: ResumeData): number {
  const experienceText = resumeData.experience.map(exp => exp.description.join(' ')).join(' ').toLowerCase();
  
  let score = 0;
  const totalPoints = resumeData.experience.length * 20; // 20 points per experience max
  
  resumeData.experience.forEach(exp => {
    const descriptions = exp.description.join(' ').toLowerCase();
    
    // Check for action verbs
    const actionVerbCount = ACTION_VERBS.filter(verb => descriptions.includes(verb)).length;
    score += Math.min(actionVerbCount * 3, 10); // Max 10 points for action verbs
    
    // Check for metrics
    const metricCount = METRICS_WORDS.filter(metric => descriptions.includes(metric)).length;
    score += Math.min(metricCount * 2, 10); // Max 10 points for metrics
  });

  return totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
}

export function generateATSInsights(resumeData: ResumeData, jobKeywords: string[]): ATSInsight[] {
  const resumeText = [
    resumeData.summary,
    ...resumeData.experience.map(exp => exp.description.join(' ')),
    ...resumeData.projects.map(proj => proj.description),
    ...resumeData.skills.map(skill => skill.name)
  ].join(' ').toLowerCase();

  return jobKeywords.map(keyword => {
    const found = resumeText.includes(keyword.toLowerCase());
    
    // Determine importance based on common technical skills and seniority terms
    let importance: 'high' | 'medium' | 'low' = 'low';
    
    if (TECHNICAL_SKILLS.some(skill => keyword.toLowerCase().includes(skill))) {
      importance = 'high';
    } else if (['senior', 'lead', 'principal', 'manager', 'director'].some(level => keyword.toLowerCase().includes(level))) {
      importance = 'high';
    } else if (['experience', 'years', 'degree', 'bachelor', 'master'].some(q => keyword.toLowerCase().includes(q))) {
      importance = 'medium';
    }

    return {
      keyword,
      found,
      importance
    };
  });
}

export function generateRecommendations(atsReport: ATSReport, resumeData: ResumeData): string[] {
  const recommendations: string[] = [];
  
  // Skills recommendations
  if (atsReport.score.skillsMatch < 70) {
    const missingSkills = atsReport.insights
      .filter(insight => !insight.found && insight.importance === 'high')
      .map(insight => insight.keyword)
      .slice(0, 3);
    
    if (missingSkills.length > 0) {
      recommendations.push(`Add these key skills to your resume: ${missingSkills.join(', ')}`);
    }
  }

  // Experience recommendations
  if (atsReport.score.experienceRelevance < 60) {
    recommendations.push('Tailor your experience descriptions to highlight relevant achievements for this role');
  }

  // Formatting recommendations
  if (atsReport.score.formatting < 80) {
    if (!resumeData.summary) recommendations.push('Add a professional summary section');
    if (resumeData.experience.length === 0) recommendations.push('Add your work experience');
    if (resumeData.education.length === 0) recommendations.push('Add your education details');
    if (resumeData.skills.length === 0) recommendations.push('Add a skills section');
  }

  // Keyword recommendations
  if (atsReport.score.keywordDensity < 60) {
    recommendations.push('Incorporate more relevant keywords from the job description naturally throughout your resume');
  }

  // Impact recommendations
  if (atsReport.score.impact < 60) {
    recommendations.push('Add quantifiable achievements and metrics to demonstrate impact');
    recommendations.push('Use stronger action verbs to start your bullet points');
  }

  return recommendations;
}

export function analyzeResumeWithATS(resumeData: ResumeData, jobDescription: string): ATSReport {
  const jobKeywords = extractJobKeywords(jobDescription);
  
  const score: ATSScore = {
    overall: 0,
    skillsMatch: calculateSkillsMatch(resumeData, jobKeywords.skills),
    experienceRelevance: calculateExperienceRelevance(resumeData, jobKeywords.keywords),
    formatting: calculateFormattingScore(resumeData),
    keywordDensity: calculateKeywordDensity(resumeData, jobKeywords.keywords),
    impact: calculateImpactScore(resumeData)
  };

  // Calculate overall score (weighted average)
  score.overall = Math.round(
    score.skillsMatch * 0.30 +
    score.experienceRelevance * 0.25 +
    score.formatting * 0.15 +
    score.keywordDensity * 0.20 +
    score.impact * 0.10
  );

  const insights = generateATSInsights(resumeData, jobKeywords.keywords);
  const recommendations = generateRecommendations({ score, insights, recommendations: [], lastAnalyzed: '' }, resumeData);

  return {
    score,
    insights,
    recommendations,
    lastAnalyzed: new Date().toISOString()
  };
}

export function enhanceResumeWithAI(resumeData: ResumeData): ResumeData {
  // Simple frontend enhancement without AI
  const enhanced = { ...resumeData };
  
  // Enhance summary if too short
  if (!enhanced.summary || enhanced.summary.length < 100) {
    enhanced.summary = `Experienced ${enhanced.targetJobRole || 'professional'} with strong technical skills and a proven track record of delivering results. Passionate about creating innovative solutions and driving business success through technology.`;
  }

  // Enhance experience descriptions to include more action verbs
  enhanced.experience = enhanced.experience.map(exp => ({
    ...exp,
    description: exp.description.map(desc => {
      if (!ACTION_VERBS.some(verb => desc.toLowerCase().startsWith(verb))) {
        return `Developed and ${desc.charAt(0).toLowerCase() + desc.slice(1)}`;
      }
      return desc;
    })
  }));

  return enhanced;
}
