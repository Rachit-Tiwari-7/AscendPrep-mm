'use server';

import { Groq } from 'groq-sdk';
import { ResumeData, ATSReport, ATSInsight, ATSScore } from '@/store/resume-ats/use-resume-store';

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function enhanceResumeWithAI(resumeData: ResumeData) {
  try {
    const prompt = `
    You are an expert resume writer and career coach. Enhance the following resume data to make it more impactful, ATS-friendly, and achievement-oriented.

    Current Resume Data:
    ${JSON.stringify(resumeData, null, 2)}

    Target Job Role: ${resumeData.targetJobRole}

    Please enhance the following sections:
    1. Rewrite experience bullet points to be achievement-focused with quantifiable metrics
    2. Improve the professional summary to highlight key achievements and skills
    3. Suggest relevant keywords for the target job role
    4. Enhance project descriptions to show impact and results

    Return the enhanced resume data in the same JSON format, but with improved content.
    Focus on:
    - Action verbs (Led, Developed, Implemented, Increased, Reduced, etc.)
    - Quantifiable metrics (%, numbers, timeframes)
    - Industry-specific keywords
    - Clear impact statements

    Only return the JSON object, no additional text.
    `;

    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 4000,
    });

    const enhancedContent = response.choices[0]?.message?.content;
    if (!enhancedContent) {
      throw new Error('No response from AI');
    }

    // Extract JSON from the response
    const jsonMatch = enhancedContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const enhancedResume = JSON.parse(jsonMatch[0]);
    return enhancedResume;
  } catch (error) {
    console.error('Error enhancing resume:', error);
    throw new Error('Failed to enhance resume with AI');
  }
}

export async function analyzeResumeWithATS(resumeData: ResumeData, jobDescription: string) {
  try {
    // Extract keywords from job description
    const keywordPrompt = `
    Analyze this job description and extract the most important keywords, skills, and qualifications:

    Job Description:
    ${jobDescription}

    Return a JSON object with:
    {
      "keywords": ["keyword1", "keyword2", ...],
      "skills": ["skill1", "skill2", ...],
      "qualifications": ["qualification1", "qualification2", ...],
      "experienceRequirements": ["req1", "req2", ...]
    }

    Only return the JSON object, no additional text.
    `;

    const keywordResponse = await client.chat.completions.create({
      messages: [{ role: 'user', content: keywordPrompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      max_tokens: 2000,
    });

    const keywordContent = keywordResponse.choices[0]?.message?.content;
    if (!keywordContent) {
      throw new Error('No response from AI for keyword extraction');
    }

    const keywordJsonMatch = keywordContent.match(/\{[\s\S]*\}/);
    if (!keywordJsonMatch) {
      throw new Error('No valid JSON found in keyword response');
    }

    const jobKeywords = JSON.parse(keywordJsonMatch[0]);

    // Analyze resume against job keywords
    const analysisPrompt = `
    Analyze this resume against the job requirements and provide an ATS score:

    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}

    Job Requirements:
    ${JSON.stringify(jobKeywords, null, 2)}

    Target Job Role: ${resumeData.targetJobRole}

    Provide a detailed ATS analysis with the following scoring breakdown:
    - Skills Match (30%): How well the resume skills match required skills
    - Experience Relevance (25%): Alignment of past experience with job requirements
    - Formatting (15%): ATS compliance (avoid images, columns, unusual fonts)
    - Keyword Density (20%): Semantic matching of core competencies
    - Impact (10%): Strength of metrics and action verbs

    Return a JSON object with:
    {
      "score": {
        "overall": 0-100,
        "skillsMatch": 0-100,
        "experienceRelevance": 0-100,
        "formatting": 0-100,
        "keywordDensity": 0-100,
        "impact": 0-100
      },
      "insights": [
        {
          "keyword": "keyword",
          "found": true/false,
          "importance": "high"|"medium"|"low"
        }
      ],
      "recommendations": ["recommendation1", "recommendation2", ...],
      "strengths": ["strength1", "strength2", ...],
      "weaknesses": ["weakness1", "weakness2", ...]
    }

    Only return the JSON object, no additional text.
    `;

    const analysisResponse = await client.chat.completions.create({
      messages: [{ role: 'user', content: analysisPrompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 3000,
    });

    const analysisContent = analysisResponse.choices[0]?.message?.content;
    if (!analysisContent) {
      throw new Error('No response from AI for ATS analysis');
    }

    const analysisJsonMatch = analysisContent.match(/\{[\s\S]*\}/);
    if (!analysisJsonMatch) {
      throw new Error('No valid JSON found in analysis response');
    }

    const atsAnalysis = JSON.parse(analysisJsonMatch[0]);

    // Convert to our ATS report format
    const atsReport: ATSReport = {
      score: atsAnalysis.score as ATSScore,
      insights: atsAnalysis.insights as ATSInsight[],
      recommendations: atsAnalysis.recommendations,
      lastAnalyzed: new Date().toISOString(),
    };

    return atsReport;
  } catch (error) {
    console.error('Error analyzing resume with ATS:', error);
    throw new Error('Failed to analyze resume with ATS');
  }
}

export async function generateResumeFixes(resumeData: ResumeData, atsReport: ATSReport) {
  try {
    const fixPrompt = `
    Based on this ATS analysis, generate specific improvements for the resume:

    Current Resume Data:
    ${JSON.stringify(resumeData, null, 2)}

    ATS Report:
    ${JSON.stringify(atsReport, null, 2)}

    Target Job Role: ${resumeData.targetJobRole}

    Please provide specific, actionable improvements to address the ATS issues:
    1. Add missing keywords naturally
    2. Improve weak bullet points with metrics and action verbs
    3. Enhance the summary for better keyword optimization
    4. Suggest skill additions or modifications

    Return the improved resume data in the same JSON format.
    Focus on addressing the specific issues mentioned in the ATS report while maintaining authenticity.

    Only return the JSON object, no additional text.
    `;

    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: fixPrompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 4000,
    });

    const fixContent = response.choices[0]?.message?.content;
    if (!fixContent) {
      throw new Error('No response from AI for resume fixes');
    }

    const fixJsonMatch = fixContent.match(/\{[\s\S]*\}/);
    if (!fixJsonMatch) {
      throw new Error('No valid JSON found in fix response');
    }

    const fixedResume = JSON.parse(fixJsonMatch[0]);
    return fixedResume;
  } catch (error) {
    console.error('Error generating resume fixes:', error);
    throw new Error('Failed to generate resume fixes');
  }
}

export async function extractKeywordsFromText(text: string) {
  try {
    const prompt = `
    Extract important keywords, skills, and qualifications from this text:

    Text:
    ${text}

    Return a JSON object with:
    {
      "keywords": ["keyword1", "keyword2", ...],
      "skills": ["skill1", "skill2", ...],
      "qualifications": ["qualification1", "qualification2", ...]
    }

    Focus on technical skills, soft skills, tools, technologies, and industry-specific terms.
    Only return the JSON object, no additional text.
    `;

    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI for keyword extraction');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in keyword extraction response');
    }

    const keywords = JSON.parse(jsonMatch[0]);
    return keywords;
  } catch (error) {
    console.error('Error extracting keywords:', error);
    throw new Error('Failed to extract keywords from text');
  }
}
