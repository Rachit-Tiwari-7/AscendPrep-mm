'use client';

import React, { useState } from 'react';
import { useResumeStore, Education } from '@/store/resume-ats/use-resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap, Calendar } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
      });
    }
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Existing Education */}
      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <Card key={edu.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{edu.degree}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <span>{edu.institution}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => handleUpdateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => handleUpdateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => handleUpdateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => handleUpdateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Education */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Education</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institution *</Label>
              <Input
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                placeholder="University of California, Berkeley"
              />
            </div>
            <div className="space-y-2">
              <Label>Degree *</Label>
              <Input
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                placeholder="Bachelor of Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Field of Study</Label>
              <Input
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                placeholder="Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label>GPA</Label>
              <Input
                value={newEducation.gpa}
                onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                placeholder="3.8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
              />
            </div>
          </div>

          <Button 
            onClick={handleAddEducation}
            disabled={!newEducation.institution || !newEducation.degree}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-blue-900">
            💡 Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>• Include your most recent education first</p>
          <p>• Add GPA only if it's 3.0 or higher</p>
          <p>• Include relevant coursework for recent graduates</p>
          <p>• Mention honors, awards, or distinctions</p>
        </CardContent>
      </Card>
    </div>
  );
};
