'use server';

import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateResumeAction(userInput: any, targetRole: string) {
  try {
    const prompt = `
      You are an expert resume writer. Transform the following raw resume data into a highly optimized, structured JSON format for a ${targetRole} position.
      
      RAW DATA:
      ${JSON.stringify(userInput, null, 2)}
      
      RULES:
      1. Role: ${targetRole}.
      2. Optimize all bullet points using action verbs and quantifiable metrics.
      3. Categorize skills into technical and soft skills.
      4. Ensure the summary is impactful.
      5. Return ONLY a JSON object matching this structure:
      {
        "full_name": "string",
        "email": "string",
        "phone": "string",
        "location": "string",
        "links": ["string"],
        "summary": "string",
        "experience": [{ "role": "string", "company": "string", "duration": "string", "description": "string (bullet points)" }],
        "education": [{ "degree": "string", "institution": "string", "duration": "string" }],
        "projects": [{ "name": "string", "description": "string", "technologies": ["string"] }],
        "skills": { "technical": ["string"], "soft": ["string"] },
        "certifications": ["string"]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a career expert. You respond ONLY with valid JSON.' },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) throw new Error('No content returned from Groq');
    
    return JSON.parse(content);
  } catch (error) {
    console.error('Groq Resume Generation Error:', error);
    throw new Error('Failed to generate resume');
  }
}

export async function analyzeATSAction(resumeData: any, jobDescription: string) {
  try {
    const prompt = `
      Analyze the following resume against the job description for ATS (Applicant Tracking System) compatibility.
      
      RESUME:
      ${JSON.stringify(resumeData, null, 2)}
      
      JOB DESCRIPTION:
      ${jobDescription}
      
      RETURN ONLY a JSON object with this structure:
      {
        "score": number (0-100),
        "breakdown": {
          "skills": number (0-100),
          "experience": number (0-100),
          "keywords": number (0-100),
          "formatting": number (0-100)
        },
        "keywords": {
          "found": ["string"],
          "missing": ["string"]
        },
        "suggestions": ["string"],
        "compliance": {
          "issues": ["string"],
          "is_ats_friendly": boolean
        }
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an ATS screening system. You respond ONLY with valid JSON.' },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) throw new Error('No content returned from Groq');
    
    return JSON.parse(content);
  } catch (error) {
    console.error('Groq ATS Analysis Error:', error);
    throw new Error('Failed to analyze resume');
  }
}
