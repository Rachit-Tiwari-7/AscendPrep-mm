'use client';

import React, { useState } from 'react';
import { useResumeStore, Project } from '@/store/resume-ats/use-resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Code, Calendar, ExternalLink } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    link: '',
    startDate: '',
    endDate: '',
  });

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      addProject({
        ...newProject,
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(t => t),
      });
      setNewProject({
        name: '',
        description: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleUpdateProject = (id: string, field: keyof Project, value: any) => {
    if (field === 'technologies' && typeof value === 'string') {
      updateProject(id, { technologies: value.split(',').map(t => t.trim()).filter(t => t) });
    } else {
      updateProject(id, { [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Projects */}
      <div className="space-y-4">
        {resumeData.projects.map((project) => (
          <Card key={project.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Code className="w-4 h-4" />
                <span>{project.technologies.join(', ')}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe the project, your role, and the impact..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={project.technologies.join(', ')}
                  onChange={(e) => handleUpdateProject(project.id, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => handleUpdateProject(project.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => handleUpdateProject(project.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Project Link
                  </Label>
                  <Input
                    value={project.link}
                    onChange={(e) => handleUpdateProject(project.id, 'link', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Project */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Project Name *</Label>
            <Input
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              placeholder="E-commerce Platform"
            />
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Describe the project, your role, and the impact..."
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label>Technologies (comma-separated)</Label>
            <Input
              value={newProject.technologies}
              onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="month"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="month"
                value={newProject.endDate}
                onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <Button 
            onClick={handleAddProject}
            disabled={!newProject.name || !newProject.description}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
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
          <p>• Focus on projects that demonstrate relevant skills</p>
          <p>• Include metrics and outcomes (e.g., "Reduced load time by 40%")</p>
          <p>• Provide live demos or GitHub repositories</p>
          <p>• Highlight your specific role and contributions</p>
        </CardContent>
      </Card>
    </div>
  );
};
