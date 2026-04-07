'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle2, XCircle, Loader2, AlertCircle, Trash2, Brain, Plus, Sparkles } from 'lucide-react';
import { frontendResumeApi, simulateFileUpload, FrontendResume } from '@/app/resume-ats/actions/frontend-resume-api';
import { toast } from 'sonner';
import Link from 'next/link';
import { FadeIn, FadeInUp, StaggerContainer, StaggerItem } from '@/components/animations';

export default function ResumesPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumes, setResumes] = useState<FrontendResume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('software-engineer');

  // Load resumes from localStorage
  React.useEffect(() => {
    setResumes(frontendResumeApi.list());
  }, []);

  const refreshResumes = () => {
    setResumes(frontendResumeApi.list());
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are supported');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setIsLoading(true);
      toast.loading('Uploading resume...', { id: 'upload' });
      
      const uploadedResume = await simulateFileUpload(selectedFile, (progress) => {
        setUploadProgress(progress);
      });
      
      toast.success('Resume uploaded successfully!', { id: 'upload' });
      refreshResumes();
      setIsUploadOpen(false);
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (error) {
      toast.error('Failed to upload resume', { id: 'upload' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateResume = (templateId: string) => {
    try {
      const newResume = frontendResumeApi.create(templateId);
      toast.success('Resume created successfully!');
      refreshResumes();
      setIsCreateOpen(false);
      
      // Navigate to the resume builder with the new resume
      window.location.href = '/resume-builder';
    } catch (error) {
      toast.error('Failed to create resume');
    }
  };

  const handleDeleteResume = (id: string) => {
    try {
      const success = frontendResumeApi.delete(id);
      if (success) {
        toast.success('Resume deleted');
        refreshResumes();
      } else {
        toast.error('Resume not found');
      }
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  const handleDuplicateResume = (id: string) => {
    try {
      const duplicate = frontendResumeApi.duplicate(id);
      if (duplicate) {
        toast.success('Resume duplicated successfully!');
        refreshResumes();
      } else {
        toast.error('Resume not found');
      }
    } catch (error) {
      toast.error('Failed to duplicate resume');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-2 border-emerald-900';
      case 'processing': return 'bg-amber-100 text-amber-700 border-2 border-amber-900';
      case 'draft': return 'bg-blue-100 text-blue-700 border-2 border-blue-900';
      default: return 'bg-gray-100 text-gray-600 border-2 border-gray-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'processing': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'draft': return <Sparkles className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const templates = frontendResumeApi.getTemplates();

  return (
    <div className="min-h-screen bg-white pb-20 noise-overlay pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                Your <span className="text-primary">Resumes</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Create and manage resumes with AI-powered ATS analysis
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateOpen(true)}
                className="btn-brutalist-outline px-6 py-3 text-lg rounded-full inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Resume
              </button>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="btn-brutalist px-8 py-4 text-lg rounded-full inline-flex items-center gap-3 transform -rotate-1 hover:rotate-0"
              >
                <Upload className="w-5 h-5" />
                Upload Resume
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Create Resume Modal */}
        {isCreateOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="brutalist-card-primary p-8 rounded-funky max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Create New Resume</h2>
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="w-10 h-10 bg-gray-100 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black">Choose a Template</h3>
                <div className="grid gap-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 border-2 cursor-pointer rounded-lg transition-all ${
                        selectedTemplate === template.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-900 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-black text-lg">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-bold mt-2">
                            {template.category}
                          </span>
                        </div>
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => handleCreateResume(selectedTemplate)}
                  className="w-full btn-brutalist py-4 text-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Create Resume
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Upload Modal */}
        {isUploadOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="brutalist-card-primary p-8 rounded-funky max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black">Upload Resume</h2>
                <button 
                  onClick={() => setIsUploadOpen(false)}
                  className="w-10 h-10 bg-gray-100 border-2 border-gray-900 flex items-center justify-center hover:bg-gray-200"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-gray-900 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="font-black text-lg mb-1">{selectedFile ? selectedFile.name : 'Drop your PDF here'}</p>
                  <p className="text-sm text-gray-500 font-medium">
                    {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'or click to browse'}
                  </p>
                </div>

                {isLoading && (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 border-2 border-gray-900 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <p className="text-center text-sm font-bold text-gray-600">{uploadProgress}% uploaded</p>
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || isLoading}
                  className="w-full btn-brutalist py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</> : <><Upload className="w-5 h-5" /> Upload Resume</>}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Resume Grid */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="brutalist-card p-6 h-48 animate-pulse bg-gray-100" />)}
          </div>
        ) : resumes && resumes.length > 0 ? (
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {resumes.map((resume, index) => (
              <StaggerItem key={resume.id}>
                <motion.div
                  whileHover={{ y: -8, rotate: 0 }}
                  className={`brutalist-card p-6 rounded-funky ${index % 3 === 0 ? 'tilt-funky-1' : index % 3 === 1 ? 'tilt-funky-2' : 'tilt-funky-4'} tilt-hover-straighten`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 border-2 border-gray-900 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-lg truncate">{resume.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {resume.file_size ? `${(resume.file_size / 1024).toFixed(0)} KB` : 'Created'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDuplicateResume(resume.id)}
                        className="w-6 h-6 bg-blue-100 border border-gray-900 flex items-center justify-center hover:bg-blue-200 text-blue-600"
                        title="Duplicate"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteResume(resume.id)}
                        className="w-6 h-6 bg-gray-100 border border-gray-900 flex items-center justify-center hover:bg-rose-100 hover:border-rose-900 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1 ${getStatusStyle(resume.analysis_status)}`}>
                      {getStatusIcon(resume.analysis_status)}
                      {resume.analysis_status}
                    </span>
                  </div>

                  <Link href="/ats-scanner" className="block w-full py-3 bg-white font-black text-center border-2 border-gray-900 hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Brain className="w-4 h-4" /> Edit & Analyze
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeInUp>
            <div className="brutalist-card p-12 text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-200 border-2 border-gray-900 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-black mb-2">No resumes yet</h3>
              <p className="text-gray-500 font-medium mb-6">Create a new resume or upload an existing one to get started</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setIsCreateOpen(true)} className="btn-brutalist-outline px-6 py-3 text-lg inline-flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Create Resume
                </button>
                <button onClick={() => setIsUploadOpen(true)} className="btn-brutalist px-6 py-3 text-lg inline-flex items-center gap-2">
                  <Upload className="w-5 h-5" /> Upload Resume
                </button>
              </div>
            </div>
          </FadeInUp>
        )}
      </div>
    </div>
  );
}
