'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';
import { PersonalDetailsForm } from './forms/personal-details-form';
import { ExperienceForm } from './forms/experience-form';
import { EducationForm } from './forms/education-form';
import { ProjectsForm } from './forms/projects-form';
import { SkillsForm } from './forms/skills-form';
import { SummaryForm } from './forms/summary-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Sparkles, FileText } from 'lucide-react';

const steps = [
  { id: 0, title: 'Personal Details', icon: FileText },
  { id: 1, title: 'Experience', icon: FileText },
  { id: 2, title: 'Education', icon: FileText },
  { id: 3, title: 'Projects', icon: FileText },
  { id: 4, title: 'Skills', icon: FileText },
  { id: 5, title: 'Summary', icon: FileText },
];

export const ResumeEditor: React.FC = () => {
  const { currentStep, setCurrentStep, resumeData, setTargetJobRole } = useResumeStore();
  const [targetJobRole, setLocalTargetJobRole] = useState(resumeData.targetJobRole);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTargetJobRoleChange = (role: string) => {
    setLocalTargetJobRole(role);
    setTargetJobRole(role);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetailsForm />;
      case 1:
        return <ExperienceForm />;
      case 2:
        return <EducationForm />;
      case 3:
        return <ProjectsForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <SummaryForm />;
      default:
        return <PersonalDetailsForm />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">AI-Powered</span>
          </div>
        </div>

        {/* Target Job Role Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Job Role
          </label>
          <input
            type="text"
            value={targetJobRole}
            onChange={(e) => handleTargetJobRoleChange(e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mt-6">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="text-xs text-gray-600 mt-1 text-center hidden sm:block">
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(steps[currentStep].icon, {
                    className: 'w-5 h-5',
                  })}
                  {steps[currentStep].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                {renderStepContent()}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <FileText className="w-4 h-4" />
                Export Resume
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
