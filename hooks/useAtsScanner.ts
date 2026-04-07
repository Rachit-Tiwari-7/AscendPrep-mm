'use client';

import { useState, useCallback, useEffect } from 'react';

let pdfjs: any = null;

// Initialize PDF.js with local worker
const initializePdfJs = async () => {
  if (typeof window !== 'undefined' && !pdfjs) {
    const pdfjsModule = await import('pdfjs-dist');
    pdfjs = pdfjsModule;
    
    if (pdfjs && pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
    }
  }
  return pdfjs;
};

export interface ATSResult {
  score: number;
  matching_skills: string[];
  missing_skills: string[];
  verdict: string;
  suggestions: string[];
}

export interface ATSState {
  isExtracting: boolean;
  isAnalyzing: boolean;
  results: ATSResult | null;
  error: string | null;
  apiKey: string;
  extractedText: string;
}

export const useAtsScanner = () => {
  const [state, setState] = useState<ATSState>({
    isExtracting: false,
    isAnalyzing: false,
    results: null,
    error: null,
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || '',
    extractedText: '',
  });

  const cleanText = useCallback((text: string): string => {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s@.-]/g, ' ')
      .trim();
  }, []);

  const extractTextFromPDF = useCallback(async (file: File): Promise<string> => {
    try {
      const pdfjsLib = await initializePdfJs();
      if (!pdfjsLib) {
        throw new Error('PDF.js library not available');
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      let fullText = '';
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + ' ';
      }
      
      return cleanText(fullText);
    } catch (error) {
      throw new Error('Failed to extract text from PDF: ' + (error as Error).message);
    }
  }, [cleanText]);

  const analyzeWithLLM = useCallback(async (
    resumeText: string, 
    jobDescription: string, 
    apiKey: string
  ): Promise<ATSResult> => {
    const prompt = `You are an expert ATS (Applicant Tracking System) simulator. Analyze the following Resume Text against the Job Description.

Calculate a match percentage (0-100).

Identify missing technical and soft skills.

Provide a 'Verdict' on whether the candidate is a strong fit.

Return the response ONLY in a valid JSON format with the keys: score, matching_skills, missing_skills, verdict, and suggestions.

Resume Text:
${resumeText}

Job Description:
${jobDescription}`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.3,
          max_tokens: 1024,
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.choices?.[0]?.message?.content;
      
      if (!textResponse) {
        throw new Error('No response received from API');
      }

      // Extract JSON from response
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from API');
      }

      const result = JSON.parse(jsonMatch[0]);
      
      // Validate response structure
      if (typeof result.score !== 'number' || 
          !Array.isArray(result.matching_skills) ||
          !Array.isArray(result.missing_skills) ||
          typeof result.verdict !== 'string' ||
          !Array.isArray(result.suggestions)) {
        throw new Error('Invalid response structure from API');
      }

      return result;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse API response as JSON');
      }
      throw error;
    }
  }, []);

  const scanResume = useCallback(async (
    file: File,
    jobDescription: string
  ): Promise<void> => {
    if (!state.apiKey) {
      setState(prev => ({ ...prev, error: 'Groq API key not configured. Please check your environment variables.' }));
      return;
    }

    if (!jobDescription.trim()) {
      setState(prev => ({ ...prev, error: 'Please provide a job description' }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isExtracting: true, 
      isAnalyzing: false, 
      error: null, 
      results: null 
    }));

    try {
      // Extract text from PDF
      const extractedText = await extractTextFromPDF(file);
      
      setState(prev => ({ 
        ...prev, 
        extractedText, 
        isExtracting: false, 
        isAnalyzing: true 
      }));

      // Analyze with LLM
      const results = await analyzeWithLLM(extractedText, jobDescription, state.apiKey);
      
      setState(prev => ({ 
        ...prev, 
        results, 
        isAnalyzing: false 
      }));
      
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: (error as Error).message, 
        isExtracting: false, 
        isAnalyzing: false 
      }));
    }
  }, [state.apiKey, extractTextFromPDF, analyzeWithLLM]);

  const reset = useCallback(() => {
    setState({
      isExtracting: false,
      isAnalyzing: false,
      results: null,
      error: null,
      apiKey: state.apiKey,
      extractedText: '',
    });
  }, [state.apiKey]);

  return {
    ...state,
    scanResume,
    reset,
  };
};
