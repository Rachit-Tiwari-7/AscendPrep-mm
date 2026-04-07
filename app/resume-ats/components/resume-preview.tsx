'use client';

import React from 'react';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText } from 'lucide-react';
import { generatePDF, downloadPDF } from '@/app/resume-ats/lib/pdf-generator';
import { toast } from 'sonner';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import BoldTemplate from './templates/BoldTemplate';

export const ResumePreview: React.FC = () => {
  const { resumeData, selectedTemplate } = useResumeStore();

  const handleDownloadPDF = async () => {
    try {
      const name = resumeData.personalDetails.fullName?.trim() || 'My_Resume';
      const blob = await generatePDF(resumeData, {
        template: selectedTemplate,
      });
      downloadPDF(blob, `${name.replace(/\s+/g, '_')}_resume.pdf`);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to download resume. Please try again.');
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} />;
      case 'bold':
        return <BoldTemplate data={resumeData} />;
      case 'minimal':
      case 'compact':
      default:
        return <MinimalistTemplate data={resumeData} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
          </div>
          <Button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div id="resume-preview" className="print:shadow-none">
            {renderTemplate()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <FileText className="w-4 h-4 mr-2" />
          Template: <span className="font-medium ml-1 capitalize">{selectedTemplate}</span>
        </div>
      </div>
    </div>
  );
};
