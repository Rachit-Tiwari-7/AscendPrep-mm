'use client';

import React, { useState } from 'react';
import { useResumeStore, Skill } from '@/store/resume-ats/use-resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Star, Code, Heart, Wrench, Languages } from 'lucide-react';

const skillCategories = [
  { value: 'Technical', label: 'Technical Skills', icon: Code },
  { value: 'Soft', label: 'Soft Skills', icon: Heart },
  { value: 'Tool', label: 'Tools', icon: Wrench },
  { value: 'Language', label: 'Languages', icon: Languages },
];

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Intermediate' as const,
    category: 'Technical' as const,
  });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({
        name: '',
        level: 'Intermediate',
        category: 'Technical',
      });
    }
  };

  const getSkillsByCategory = (category: Skill['category']) => {
    return resumeData.skills.filter(skill => skill.category === category);
  };

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Beginner':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelStars = (level: Skill['level']) => {
    const levels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    const index = levels.indexOf(level);
    return Array.from({ length: 4 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i <= index ? 'fill-current text-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Skills by Category */}
      {skillCategories.map((category) => {
        const Icon = category.icon;
        const categorySkills = getSkillsByCategory(category.value as Skill['category']);
        
        return (
          <Card key={category.value}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {category.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {categorySkills.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No {category.label.toLowerCase()} added yet
                </p>
              ) : (
                <div className="space-y-2">
                  {categorySkills.map((skill, index) => {
                    const globalIndex = resumeData.skills.findIndex(s => s === skill);
                    return (
                      <div
                        key={globalIndex}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-1">
                            {getLevelStars(skill.level)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSkill(globalIndex)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Skill Name *</Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="JavaScript, Project Management, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) => 
                  setNewSkill({ ...newSkill, category: value as 'Technical' | 'Soft' | 'Tool' | 'Language' })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Proficiency Level</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value) => 
                  setNewSkill({ ...newSkill, level: value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {getLevelStars(level)}
                        </div>
                        {level}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAddSkill}
            disabled={!newSkill.name.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
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
          <p>• Include both technical and soft skills relevant to your target role</p>
          <p>• Be honest about your proficiency level</p>
          <p>• Focus on skills mentioned in the job description</p>
          <p>• Include tools and technologies you've actually used</p>
        </CardContent>
      </Card>
    </div>
  );
};
