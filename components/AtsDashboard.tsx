'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, FileText, Key, Target, TrendingUp, AlertCircle, 
  CheckCircle2, XCircle, Zap, Brain, BarChart3, RefreshCw
} from 'lucide-react';
import { useAtsScanner, ATSResult } from '@/hooks/useAtsScanner';

interface AtsDashboardProps {
  className?: string;
}

export const AtsDashboard: React.FC<AtsDashboardProps> = ({ className = '' }) => {
  const {
    isExtracting,
    isAnalyzing,
    results,
    error,
    extractedText,
    scanResume,
    reset,
  } = useAtsScanner();

  const [jobDescription, setJobDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }
    setSelectedFile(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleScan = useCallback(() => {
    if (selectedFile && jobDescription.trim()) {
      scanResume(selectedFile, jobDescription);
    }
  }, [selectedFile, jobDescription, scanResume]);

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getVerdictIcon = (verdict: string) => {
    const lowerVerdict = verdict.toLowerCase();
    if (lowerVerdict.includes('strong') || lowerVerdict.includes('excellent')) {
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    }
    if (lowerVerdict.includes('weak') || lowerVerdict.includes('poor')) {
      return <XCircle className="w-6 h-6 text-red-600" />;
    }
    return <AlertCircle className="w-6 h-6 text-yellow-600" />;
  };

  return (
    <div className={`min-h-screen bg-white noise-overlay ${className}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900">ATS Scanner</h1>
          </div>
          <p className="text-xl text-gray-600 font-medium">
            AI-Powered Resume Analysis Against Job Descriptions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* File Upload */}
            <div className="brutalist-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-black">Upload Resume</h3>
              </div>
              
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed border-gray-900 rounded-lg p-8 text-center transition-all cursor-pointer
                  ${isDragging ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'}
                  ${selectedFile ? 'bg-green-50 border-green-600' : ''}
                `}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-green-600" />
                      <div className="text-left">
                        <p className="font-black text-green-600">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="font-black text-gray-700 mb-1">Drop PDF here or click to browse</p>
                      <p className="text-sm text-gray-500">PDF files only</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div className="brutalist-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-black">Job Description</h3>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={8}
                className="w-full px-4 py-3 border-2 border-gray-900 font-medium focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleScan}
                disabled={!selectedFile || !jobDescription.trim() || isExtracting || isAnalyzing}
                className="flex-1 btn-brutalist px-6 py-4 font-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {(isExtracting || isAnalyzing) ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    {isExtracting ? 'Extracting...' : 'Analyzing...'}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Scan Resume
                  </>
                )}
              </button>
              
              {results && (
                <button
                  onClick={reset}
                  className="btn-brutalist-outline px-6 py-4 font-black"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="brutalist-card p-4 rounded-xl border-2 border-red-600 bg-red-50"
              >
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <p className="font-medium text-red-700">{error}</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {results ? (
              <>
                {/* Score Gauge */}
                <div className="brutalist-card p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-black">Match Score</h3>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <div className={`relative w-32 h-32 rounded-full border-8 border-gray-200 ${getScoreBgColor(results.score)} flex items-center justify-center`}>
                        <div className="text-center">
                          <div className={`text-3xl font-black ${getScoreColor(results.score)}`}>
                            {results.score}%
                          </div>
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Match
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verdict */}
                <div className="brutalist-card p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    {getVerdictIcon(results.verdict)}
                    <h3 className="text-lg font-black">Recruiter's Analysis</h3>
                  </div>
                  <p className="font-medium text-gray-700 leading-relaxed">
                    {results.verdict}
                  </p>
                </div>

                {/* Skills Analysis */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="brutalist-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <h4 className="font-black text-sm">Matching Skills</h4>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {results.matching_skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full" />
                          <span className="text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="brutalist-card p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <h4 className="font-black text-sm">Missing Skills</h4>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {results.missing_skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                          <span className="text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="brutalist-card p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-black">Improvement Suggestions</h3>
                  </div>
                  <div className="space-y-3">
                    {results.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shrink-0 text-xs font-black">
                          {index + 1}
                        </div>
                        <p className="text-sm font-medium text-gray-700 leading-relaxed">
                          {suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="brutalist-card p-12 rounded-xl text-center">
                <div className="w-16 h-16 bg-gray-100 border-2 border-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-black text-gray-700 mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-gray-500 font-medium">
                  Upload your resume and job description to get started with AI-powered ATS analysis
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
