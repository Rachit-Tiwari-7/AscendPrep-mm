'use client';

import React, { useState } from 'react';
import { useResumeStore, Experience } from '@/store/resume-ats/use-resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: [''],
  });

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      addExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [''],
      });
    }
  };

  const handleUpdateExperience = (id: string, field: keyof Experience, value: any) => {
    updateExperience(id, { [field]: value });
  };

  const handleAddBulletPoint = (id: string) => {
    const experience = resumeData.experience.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, {
        description: [...experience.description, '']
      });
    }
  };

  const handleUpdateBulletPoint = (id: string, index: number, value: string) => {
    const experience = resumeData.experience.find(exp => exp.id === id);
    if (experience) {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      updateExperience(id, { description: newDescription });
    }
  };

  const handleRemoveBulletPoint = (id: string, index: number) => {
    const experience = resumeData.experience.find(exp => exp.id === id);
    if (experience) {
      const newDescription = experience.description.filter((_, i) => i !== index);
      updateExperience(id, { description: newDescription });
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Experience */}
      <div className="space-y-4">
        {resumeData.experience.map((exp) => (
          <Card key={exp.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{exp.position}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{exp.company}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => handleUpdateExperience(exp.id, 'current', checked)}
                />
                <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
              </div>

              <div className="space-y-2">
                <Label>Responsibilities & Achievements</Label>
                {exp.description.map((bullet, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={bullet}
                      onChange={(e) => handleUpdateBulletPoint(exp.id, index, e.target.value)}
                      placeholder="• Led a team of 5 developers to launch a new product..."
                      className="min-h-15"
                    />
                    {exp.description.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveBulletPoint(exp.id, index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddBulletPoint(exp.id)}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bullet Point
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Position *</Label>
              <Input
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                placeholder="Senior Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label>Company *</Label>
              <Input
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                placeholder="Tech Company Inc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                disabled={newExperience.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current-new"
              checked={newExperience.current}
              onCheckedChange={(checked: boolean) => setNewExperience({ ...newExperience, current: checked })}
            />
            <Label htmlFor="current-new">Currently working here</Label>
          </div>

          <div className="space-y-2">
            <Label>Responsibilities & Achievements</Label>
            <Textarea
              value={newExperience.description[0]}
              onChange={(e) => setNewExperience({ 
                ...newExperience, 
                description: [e.target.value] 
              })}
              placeholder="• Led a team of 5 developers to launch a new product..."
              className="min-h-25"
            />
          </div>

          <Button 
            onClick={handleAddExperience}
            disabled={!newExperience.company || !newExperience.position}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
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
          <p>• Use action verbs: Led, Developed, Implemented, Increased, Reduced</p>
          <p>• Quantify achievements: "Increased revenue by 25%" instead of "Increased revenue"</p>
          <p>• Focus on impact and results, not just responsibilities</p>
          <p>• Include 3-5 bullet points per experience</p>
        </CardContent>
      </Card>
    </div>
  );
};
