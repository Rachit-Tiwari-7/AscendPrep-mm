'use client';

import React, { useState } from 'react';
import { ResumeEditor } from '@/app/resume-ats/components/resume-editor';
import { ResumePreview } from '@/app/resume-ats/components/resume-preview';
import { ATSScreeningEngine } from '@/app/resume-ats/components/ats-screening-engine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Eye, 
  Target, 
  Sparkles, 
  Download, 
  Settings,
  Zap,
  BarChart3
} from 'lucide-react';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';

export default function ResumeATSSuite() {
  const { selectedTemplate, setSelectedTemplate, resumeData } = useResumeStore();
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'ats'>('editor');

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Blue accent header, two-column layout' },
    { id: 'professional', name: 'Professional', description: 'Traditional academic format' },
    { id: 'creative', name: 'Creative', description: 'Dark sidebar with modern design' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, elegant' },
    { id: 'bold', name: 'Bold', description: 'Orange accents, strong typography' },
    { id: 'compact', name: 'Compact', description: 'Space-efficient layout' },
    { id: 'minimal', name: 'Classic', description: 'Traditional centered layout' },
  ] as const;

  const handleDownloadPDF = async () => {
    if (!resumeData.personalDetails.fullName) {
      alert('Please complete your resume before downloading.');
      return;
    }

    try {
      const { generatePDF, downloadPDF } = await import('@/app/resume-ats/lib/pdf-generator');
      const blob = await generatePDF(resumeData, {
        template: selectedTemplate,
      });
      const name = resumeData.personalDetails.fullName?.trim() || 'My_Resume';
      downloadPDF(blob, `${name.replace(/\s+/g, '_')}_resume.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden noise-overlay">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b-2 border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900">Resume ATS Suite</h1>
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary text-white">
                  AI-Powered
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Template Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-600 hidden sm:inline">Template:</span>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value as typeof selectedTemplate)}
                  className="text-sm font-bold border-2 border-gray-900 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary bg-white max-w-[140px] cursor-pointer"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id} title={template.description}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownloadPDF}
                className="btn-brutalist px-6 py-2 text-sm flex items-center gap-2"
                size="sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="inline-flex bg-white border-2 border-gray-900 rounded-lg p-1 shadow-[4px_4px_0px_0px_#000]">
              {[
                { id: 'editor', icon: FileText, label: 'Resume Builder', shortLabel: 'Builder' } as const,
                { id: 'preview', icon: Eye, label: 'Live Preview', shortLabel: 'Preview' } as const,
                { id: 'ats', icon: Target, label: 'ATS Analysis', shortLabel: 'ATS' } as const
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-black text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </div>
            
            {/* Template Selector - Mobile Friendly */}
            <div className="flex items-center gap-2 bg-white border-2 border-gray-900 rounded-lg p-2 shadow-[4px_4px_0px_0px_#000]">
              <span className="text-sm font-bold text-gray-600">Template:</span>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value as typeof selectedTemplate)}
                className="text-sm font-bold border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              >
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === 'editor' && (
            <div className="col-span-1 lg:col-span-2">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[800px]">
                {/* Resume Editor */}
                <div className="h-full min-h-[600px]">
                  <div className="brutalist-card p-6 rounded-xl h-full overflow-auto">
                    <ResumeEditor />
                  </div>
                </div>

                {/* Resume Preview */}
                <div className="h-full hidden xl:block min-h-[600px]">
                  <div className="brutalist-card p-6 rounded-xl h-full overflow-hidden">
                    <ResumePreview />
                  </div>
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="xl:hidden mt-6">
                <div className="brutalist-card p-6 rounded-xl">
                  <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Resume Preview
                  </h3>
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-4 max-h-96 overflow-auto">
                    <div id="resume-preview">
                      <ResumePreview />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="col-span-1 lg:col-span-2">
              <div className="brutalist-card p-6 rounded-xl min-h-[800px] overflow-hidden">
                <ResumePreview />
              </div>
            </div>
          )}

          {activeTab === 'ats' && (
            <div className="col-span-1 lg:col-span-2">
              <div className="brutalist-card p-6 rounded-xl min-h-[600px]">
                <ATSScreeningEngine />
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'AI-Powered Enhancement',
              description: 'Transform your resume with AI-powered suggestions, keyword optimization, and achievement-focused bullet points.',
              rotate: 'tilt-hover-1'
            },
            {
              icon: BarChart3,
              title: 'ATS Score Analysis',
              description: 'Get detailed ATS scoring with keyword analysis, formatting checks, and actionable recommendations to improve your resume.',
              rotate: 'tilt-hover-2'
            },
            {
              icon: Download,
              title: 'Professional PDF Export',
              description: 'Export your resume as a professional PDF with multiple templates to choose from, optimized for both ATS and human readers.',
              rotate: 'tilt-hover-3'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`brutalist-card p-6 rounded-xl ${feature.rotate} tilt-hover-straighten cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 border-2 border-gray-900 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-black text-lg mb-3">{feature.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed text-sm">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-gray-900 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary border-2 border-gray-900 shadow-[3px_3px_0px_0px_#000] flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-black">Resume ATS Suite</span>
            </div>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              Built with Next.js, Groq AI, and modern web technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
