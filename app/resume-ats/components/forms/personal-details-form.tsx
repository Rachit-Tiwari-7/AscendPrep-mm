'use client';

import React from 'react';
import { useResumeStore } from '@/store/resume-ats/use-resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export const PersonalDetailsForm: React.FC = () => {
  const { resumeData, setPersonalDetails } = useResumeStore();

  const handleInputChange = (field: string, value: string) => {
    setPersonalDetails({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={resumeData.personalDetails.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={resumeData.personalDetails.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone *
          </Label>
          <Input
            id="phone"
            value={resumeData.personalDetails.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location *
          </Label>
          <Input
            id="location"
            value={resumeData.personalDetails.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            value={resumeData.personalDetails.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </Label>
          <Input
            id="github"
            value={resumeData.personalDetails.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            placeholder="https://github.com/johndoe"
            className="w-full"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="portfolio" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Portfolio Website
          </Label>
          <Input
            id="portfolio"
            value={resumeData.personalDetails.portfolio}
            onChange={(e) => handleInputChange('portfolio', e.target.value)}
            placeholder="https://johndoe.dev"
            className="w-full"
          />
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-blue-900">
            💡 Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-1">
          <p>• Use a professional email address (preferably your name)</p>
          <p>• Include your LinkedIn URL - it's often checked by recruiters</p>
          <p>• Add your GitHub if you're in tech - it showcases your work</p>
          <p>• Keep your location simple: City, State or City, Country</p>
        </CardContent>
      </Card>
    </div>
  );
};
