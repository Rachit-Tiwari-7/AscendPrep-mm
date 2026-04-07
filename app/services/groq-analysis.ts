import Groq from 'groq-sdk';

// Initialize Groq client with API key from env
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true, // Required for browser usage
});

export interface DetectedIssue {
  issue_type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  count: number;
  context: string;
}

export interface InterviewAnalysis {
  overall_score: number;
  communication_score: number;
  technical_score: number;
  problem_solving_score: number;
  code_quality_score: number;
  summary: string;
  detailed_feedback: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  detected_issues: DetectedIssue[];
  skill_breakdown: {
    communication: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    };
    technical: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    };
    problem_solving: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    };
    code_quality: {
      score: number;
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    };
  };
}

const ANALYSIS_PROMPT = `You are an expert technical interviewer at Google/Meta/Amazon. Analyze this interview conversation and provide STRICT, CRITICAL feedback.

Analyze the conversation and return a JSON object with this exact structure:
{
  "overall_score": number (0-1, be strict!),
  "communication_score": number (0-1),
  "technical_score": number (0-1),
  "problem_solving_score": number (0-1),
  "code_quality_score": number (0-1, 0 if no code),
  "summary": "2-3 sentence honest assessment",
  "detailed_feedback": "4-5 sentences on what went wrong",
  "strengths": ["2-3 specific strengths"],
  "weaknesses": ["2-3 specific weaknesses"],
  "recommendations": ["3-5 actionable improvements"],
  "detected_issues": [
    {
      "issue_type": "filler_words|rambling|no_clarifying|poor_posture|low_confidence|weak_intro|other",
      "severity": "high|medium|low",
      "description": "Specific description of what was found",
      "count": number,
      "context": "Brief quote from conversation"
    }
  ],
  "skill_breakdown": {
    "communication": { "score": 0-1, "strengths": [], "weaknesses": [], "recommendations": [] },
    "technical": { "score": 0-1, "strengths": [], "weaknesses": [], "recommendations": [] },
    "problem_solving": { "score": 0-1, "strengths": [], "weaknesses": [], "recommendations": [] },
    "code_quality": { "score": 0-1, "strengths": [], "weaknesses": [], "recommendations": [] }
  }
}

SCORING RUBRIC (be strict!):
- 0.9-1.0: Truly exceptional, interview-ready
- 0.7-0.8: Good but notable flaws
- 0.5-0.6: Average, needs work
- Below 0.5: Poor, major issues

DETECTED ISSUES - Look for:
1. filler_words: Count "um", "uh", "like", "you know", "so", "basically"
2. rambling: Answers too long, unfocused, off-topic
3. no_clarifying: Jumped straight to solution without asking questions
4. poor_posture: Any mention of slouching or bad body language
5. low_confidence: "I guess", "maybe", "I'm not sure", hesitant tone
6. weak_intro: Poor opening statements

Be HONEST - only include issues you actually detect. Return realistic counts and actual quotes from the conversation.`;

export async function analyzeInterview(
  conversationHistory: Array<{ role: string; content: string; timestamp?: string }>,
  interviewTitle: string = 'Interview'
): Promise<InterviewAnalysis> {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY not set in .env.local');
  }

  // Format conversation for analysis
  const conversationText = conversationHistory
    .map((msg, i) => `${msg.role === 'user' ? 'Candidate' : 'Interviewer'}: ${msg.content}`)
    .join('\n\n');

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: ANALYSIS_PROMPT },
        { 
          role: 'user', 
          content: `Interview: ${interviewTitle}\n\nConversation:\n${conversationText}` 
        },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from Groq');
    }

    const analysis: InterviewAnalysis = JSON.parse(content);
    
    // Ensure detected_issues exists
    if (!analysis.detected_issues) {
      analysis.detected_issues = [];
    }

    return analysis;
  } catch (error) {
    console.error('Groq analysis failed:', error);
    throw error;
  }
}

// Fallback analysis when API fails or for testing
export function getMockAnalysis(): InterviewAnalysis {
  return {
    overall_score: 0.72,
    communication_score: 0.68,
    technical_score: 0.75,
    problem_solving_score: 0.80,
    code_quality_score: 0.65,
    summary: 'Good technical fundamentals but communication needs improvement.',
    detailed_feedback: 'You demonstrated solid problem-solving skills and technical knowledge. However, frequent filler words and occasional rambling detracted from your overall presentation.',
    strengths: ['Strong problem-solving approach', 'Good technical depth', 'Structured thinking'],
    weaknesses: ['Used filler words frequently', 'Answers sometimes too long', 'Could be more concise'],
    recommendations: ['Practice pausing instead of using filler words', 'Time your answers', 'Use STAR method more consistently'],
    detected_issues: [
      {
        issue_type: 'filler_words',
        severity: 'high',
        description: "Used 'um', 'uh', 'like' 12 times",
        count: 12,
        context: 'Um, I think the solution is... uh... like...'
      },
      {
        issue_type: 'rambling',
        severity: 'medium',
        description: 'Answer was 3 minutes long',
        count: 2,
        context: 'Started strong but went off-topic discussing...'
      },
      {
        issue_type: 'low_confidence',
        severity: 'medium',
        description: "Used hesitant language 'I guess'",
        count: 3,
        context: 'I guess maybe this could work...'
      }
    ],
    skill_breakdown: {
      communication: {
        score: 0.68,
        strengths: ['Clear articulation', 'Good pace'],
        weaknesses: ['Filler words', 'Occasional rambling'],
        recommendations: ['Practice pausing', 'Be more concise']
      },
      technical: {
        score: 0.75,
        strengths: ['Solid fundamentals', 'Good examples'],
        weaknesses: ['Could dive deeper'],
        recommendations: ['Study advanced concepts']
      },
      problem_solving: {
        score: 0.80,
        strengths: ['Structured approach', 'Good logic'],
        weaknesses: ['Missed one edge case'],
        recommendations: ['Practice more edge cases']
      },
      code_quality: {
        score: 0.65,
        strengths: ['Readable code'],
        weaknesses: ['Could optimize better'],
        recommendations: ['Learn more algorithms']
      }
    }
  };
}
