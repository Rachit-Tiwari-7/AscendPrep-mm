'use client';

import React, { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';
import { ResumePreview } from '@/app/resume-ats/components/resume-preview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  Save,
  Eye,
  Target,
  FileText,
  GraduationCap,
  Briefcase,
  Code,
  Heart,
  Plus,
  X
} from 'lucide-react';
import { toast } from 'sonner';

type BuilderStep = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'hobbies' | 'coding';

export default function ResumeBuilderPage() {
  const { resumeData, setPersonalDetails, setExperience, setEducation, setSkills, setProjects, setSummary, setTargetJobRole, selectedTemplate, setSelectedTemplate } = useResumeStore();
  const [currentStep, setCurrentStep] = useState<BuilderStep>('personal');
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'minimalist', name: 'Minimalist' },
    { id: 'bold', name: 'Bold' },
    { id: 'compact', name: 'Compact' },
    { id: 'minimal', name: 'Classic' },
  ];

  const demoData = {
    personalDetails: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      portfolio: 'johndoe.dev'
    },
    experience: [
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020-01',
        endDate: '2023-12',
        current: false,
        description: [
          'Developed and maintained React applications serving 1M+ users',
          'Improved application performance by 40% through optimization',
          'Led a team of 5 engineers on critical projects',
          'Implemented CI/CD pipelines reducing deployment time by 60%'
        ]
      },
      {
        id: '2',
        company: 'StartupXYZ',
        position: 'Software Engineer',
        startDate: '2018-06',
        endDate: '2019-12',
        current: false,
        description: [
          'Built RESTful APIs using Node.js and Express',
          'Developed responsive front-end interfaces with React',
          'Collaborated with cross-functional teams to deliver features'
        ]
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of California',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2014-09',
        endDate: '2018-05',
        gpa: '3.8'
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript', level: 'Expert' as const, category: 'Technical' as const },
      { id: '2', name: 'React', level: 'Expert' as const, category: 'Technical' as const },
      { id: '3', name: 'Node.js', level: 'Advanced' as const, category: 'Technical' as const },
      { id: '4', name: 'TypeScript', level: 'Advanced' as const, category: 'Technical' as const },
      { id: '5', name: 'Python', level: 'Intermediate' as const, category: 'Technical' as const },
      { id: '6', name: 'AWS', level: 'Intermediate' as const, category: 'Technical' as const },
      { id: '7', name: 'Leadership', level: 'Advanced' as const, category: 'Soft' as const },
      { id: '8', name: 'Communication', level: 'Expert' as const, category: 'Soft' as const }
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://github.com/johndoe/ecommerce',
        startDate: '2023-01',
        endDate: '2023-06'
      },
      {
        id: '2',
        name: 'AI Chat Assistant',
        description: 'ChatGPT-like assistant using OpenAI API and React',
        technologies: ['React', 'OpenAI API', 'TypeScript'],
        link: 'https://github.com/johndoe/ai-chat',
        startDate: '2023-07',
        endDate: '2023-09'
      }
    ],
    summary: 'Experienced Senior Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering scalable solutions.',
    targetJobRole: 'Senior Software Engineer',
    hobbies: ['Photography', 'Hiking', 'Reading Tech Blogs', 'Open Source Contributions'],
    codingProfiles: [
      { platform: 'LeetCode', username: 'johndoe', stats: '300+ problems solved' },
      { platform: 'HackerRank', username: 'johndoe', stats: '5-star coder' },
      { platform: 'Codeforces', username: 'johndoe', stats: 'Expert rating' }
    ]
  };

  // Load demo data on mount
  useEffect(() => {
    // Auto-load demo data for testing
    setPersonalDetails(demoData.personalDetails);
    setExperience(demoData.experience);
    setEducation(demoData.education);
    setSkills(demoData.skills);
    setProjects(demoData.projects);
    setSummary(demoData.summary);
    setTargetJobRole(demoData.targetJobRole);
  }, []);

  const steps: { id: BuilderStep; title: string; icon: React.ReactNode }[] = [
    { id: 'personal', title: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { id: 'experience', title: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', title: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', title: 'Skills', icon: <Code className="w-4 h-4" /> },
    { id: 'projects', title: 'Projects', icon: <FileText className="w-4 h-4" /> },
    { id: 'hobbies', title: 'Hobbies', icon: <Heart className="w-4 h-4" /> },
    { id: 'coding', title: 'Coding Profiles', icon: <Github className="w-4 h-4" /> }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const canGoNext = currentStepIndex < steps.length - 1;
  const canGoPrev = currentStepIndex > 0;

  const handleAutoSave = async () => {
    setIsAutoSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAutoSaving(false);
    toast.success('Resume auto-saved');
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={resumeData.personalDetails.fullName}
            onChange={(e) => setPersonalDetails({ fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={resumeData.personalDetails.email}
            onChange={(e) => setPersonalDetails({ email: e.target.value })}
            placeholder="john.doe@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={resumeData.personalDetails.phone}
            onChange={(e) => setPersonalDetails({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={resumeData.personalDetails.location}
            onChange={(e) => setPersonalDetails({ location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={resumeData.personalDetails.linkedin}
            onChange={(e) => setPersonalDetails({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            value={resumeData.personalDetails.github}
            onChange={(e) => setPersonalDetails({ github: e.target.value })}
            placeholder="github.com/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Personal Portfolio</Label>
          <Input
            id="portfolio"
            value={resumeData.personalDetails.portfolio}
            onChange={(e) => setPersonalDetails({ portfolio: e.target.value })}
            placeholder="johndoe.dev"
          />
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button
          onClick={() => {
            const newExp = {
              id: Date.now().toString(),
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              current: false,
              description: ['']
            };
            setExperience([...resumeData.experience, newExp]);
          }}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {resumeData.experience.map((exp, index) => (
        <Card key={exp.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Experience {index + 1}</h4>
              {resumeData.experience.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const updated = resumeData.experience.filter((_, i) => i !== index);
                    setExperience(updated);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index].position = e.target.value;
                    setExperience(updated);
                  }}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index].company = e.target.value;
                    setExperience(updated);
                  }}
                  placeholder="Tech Corp"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index].startDate = e.target.value;
                    setExperience(updated);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => {
                    const updated = [...resumeData.experience];
                    updated[index].endDate = e.target.value;
                    setExperience(updated);
                  }}
                  disabled={exp.current}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => {
                      const updated = [...resumeData.experience];
                      updated[index].current = e.target.checked;
                      if (e.target.checked) {
                        updated[index].endDate = '';
                      }
                      setExperience(updated);
                    }}
                    className="mr-2"
                  />
                  Currently Working
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={exp.description.join('\n')}
                onChange={(e) => {
                  const updated = [...resumeData.experience];
                  updated[index].description = e.target.value.split('\n');
                  setExperience(updated);
                }}
                placeholder="• Developed and maintained React applications&#10;• Improved performance by 40%&#10;• Led a team of 5 engineers"
                rows={4}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button
          onClick={() => {
            const newEdu = {
              id: Date.now().toString(),
              institution: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
              gpa: ''
            };
            setEducation([...resumeData.education, newEdu]);
          }}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {resumeData.education.map((edu, index) => (
        <Card key={edu.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Education {index + 1}</h4>
              {resumeData.education.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const updated = resumeData.education.filter((_, i) => i !== index);
                    setEducation(updated);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].institution = e.target.value;
                    setEducation(updated);
                  }}
                  placeholder="University of California"
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].degree = e.target.value;
                    setEducation(updated);
                  }}
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].field = e.target.value;
                    setEducation(updated);
                  }}
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label>GPA</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].gpa = e.target.value;
                    setEducation(updated);
                  }}
                  placeholder="3.8"
                />
              </div>
              <div className="space-y-2">
                <Label>Graduation Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].endDate = e.target.value;
                    setEducation(updated);
                  }}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Skills</h3>
        <Button
          onClick={() => {
            const newSkill = {
              id: Date.now().toString(),
              name: '',
              level: 'Intermediate' as const,
              category: 'Technical' as const
            };
            setSkills([...resumeData.skills, newSkill]);
          }}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      <div className="grid gap-4">
        {resumeData.skills.map((skill, index) => (
          <Card key={skill.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Skill {index + 1}</h4>
                {resumeData.skills.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updated = resumeData.skills.filter((_, i) => i !== index);
                      setSkills(updated);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Skill Name</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => {
                      const updated = [...resumeData.skills];
                      updated[index].name = e.target.value;
                      setSkills(updated);
                    }}
                    placeholder="JavaScript"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Level</Label>
                  <select
                    value={skill.level}
                    onChange={(e) => {
                      const updated = [...resumeData.skills];
                      updated[index].level = e.target.value as any;
                      setSkills(updated);
                    }}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={skill.category}
                    onChange={(e) => {
                      const updated = [...resumeData.skills];
                      updated[index].category = e.target.value as any;
                      setSkills(updated);
                    }}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Soft">Soft</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Methodology">Methodology</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button
          onClick={() => {
            const newProject = {
              id: Date.now().toString(),
              name: '',
              description: '',
              technologies: [],
              link: '',
              startDate: '',
              endDate: ''
            };
            setProjects([...resumeData.projects, newProject]);
          }}
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4">
        {resumeData.projects.map((project, index) => (
          <Card key={project.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Project {index + 1}</h4>
                {resumeData.projects.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updated = resumeData.projects.filter((_, i) => i !== index);
                      setProjects(updated);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => {
                      const updated = [...resumeData.projects];
                      updated[index].name = e.target.value;
                      setProjects(updated);
                    }}
                    placeholder="E-commerce Platform"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project Link</Label>
                  <Input
                    value={project.link}
                    onChange={(e) => {
                      const updated = [...resumeData.projects];
                      updated[index].link = e.target.value;
                      setProjects(updated);
                    }}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => {
                    const updated = [...resumeData.projects];
                    updated[index].description = e.target.value;
                    setProjects(updated);
                  }}
                  placeholder="Full-stack e-commerce solution with React and Node.js"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Technologies</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => {
                      const updated = [...resumeData.projects];
                      updated[index].technologies = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                      setProjects(updated);
                    }}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={project.startDate}
                    onChange={(e) => {
                      const updated = [...resumeData.projects];
                      updated[index].startDate = e.target.value;
                      setProjects(updated);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={project.endDate}
                    onChange={(e) => {
                      const updated = [...resumeData.projects];
                      updated[index].endDate = e.target.value;
                      setProjects(updated);
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderHobbies = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Hobbies & Interests</h3>
      <p className="text-gray-600">Add your hobbies and personal interests to show your personality</p>
      
      <div className="space-y-4">
        <Label>Hobbies (comma separated)</Label>
        <Textarea
          value={demoData.hobbies.join(', ')}
          onChange={(e) => {
            // This would update hobbies in the store
            console.log('Hobbies:', e.target.value);
          }}
          placeholder="Photography, Hiking, Reading, Open Source"
          rows={4}
        />
        <p className="text-sm text-gray-500">
          Examples: Photography, Hiking, Reading Tech Blogs, Open Source Contributions, Gaming, Cooking
        </p>
      </div>
    </div>
  );

  const renderCoding = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Coding Profiles</h3>
      <p className="text-gray-600">Link to your coding platforms and competitive programming profiles</p>
      
      <div className="grid gap-4">
        {demoData.codingProfiles.map((profile, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Input
                  value={profile.platform}
                  onChange={(e) => {
                    console.log('Platform:', e.target.value);
                  }}
                  placeholder="LeetCode"
                />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={profile.username}
                  onChange={(e) => {
                    console.log('Username:', e.target.value);
                  }}
                  placeholder="johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label>Stats/Achievements</Label>
                <Input
                  value={profile.stats}
                  onChange={(e) => {
                    console.log('Stats:', e.target.value);
                  }}
                  placeholder="300+ problems solved"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return renderPersonalInfo();
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      case 'hobbies':
        return renderHobbies();
      case 'coding':
        return renderCoding();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Template Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-600 hidden sm:inline">Template:</span>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value as any)}
                  className="text-sm font-bold border-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="outline"
                onClick={handleAutoSave}
                disabled={isAutoSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isAutoSaving ? 'Saving...' : 'Auto-Save'}
              </Button>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                LIVE PREVIEW
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Step Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {step.icon}
                      <span className="hidden sm:inline">{step.title}</span>
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                  </button>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Step {currentStepIndex + 1} of {steps.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {steps[currentStepIndex].icon}
                  {steps[currentStepIndex].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Link href="/ats-scanner" className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold border-2 border-gray-900 hover:bg-red-700 transition-colors rounded-lg">
                <Target className="w-4 h-4" />
                ATS Analysis
              </Link>
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  LIVE PREVIEW
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-150">
                  <ResumePreview />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
