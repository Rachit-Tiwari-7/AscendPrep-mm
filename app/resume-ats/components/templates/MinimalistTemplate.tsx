'use client';

import React from 'react';

interface TemplateProps {
  data: any;
}

const MinimalistTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white min-h-[1100px] p-12 font-sans">
      {/* Header - Clean and Simple */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-2">
          {data.personalDetails?.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {data.personalDetails?.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails?.phone && <span>•</span>}
          {data.personalDetails?.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails?.location && <span>•</span>}
          {data.personalDetails?.location && <span>{data.personalDetails.location}</span>}
        </div>
        {data.personalDetails?.linkedin && (
          <div className="text-sm text-gray-500 mt-1">{data.personalDetails.linkedin}</div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm capitalize tracking-widest text-gray-500 mb-6 font-medium">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp: any) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <ul className="list-disc list-inside text-sm text-gray-700 leading-relaxed space-y-1">
                    {exp.description.map((bullet: string, idx: number) => (
                      bullet?.trim() && <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm capitalize tracking-widest text-gray-500 mb-6 font-medium">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu: any) => (
              <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {edu.endDate || `${edu.startDate} - ${edu.endDate}`}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                {edu.gpa && <p className="text-sm text-gray-500 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm capitalize tracking-widest text-gray-500 mb-6 font-medium">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((proj: any) => (
              <div key={proj.id} className="border-l-2 border-gray-200 pl-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{proj.name}</h3>
                  <span className="text-xs text-gray-500">
                    {proj.startDate} - {proj.endDate}
                  </span>
                </div>
                {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
                {proj.technologies?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">{proj.technologies.join(" • ")}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div>
          <h2 className="text-sm capitalize tracking-widest text-gray-500 mb-6 font-medium">Skills</h2>
          <div className="space-y-3">
            {(() => {
              const skillsByCategory: Record<string, string[]> = {};
              data.skills.forEach((skill: any) => {
                if (!skillsByCategory[skill.category]) {
                  skillsByCategory[skill.category] = [];
                }
                skillsByCategory[skill.category].push(skill.name);
              });
              return Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <span className="text-xs text-gray-500 capitalize tracking-wider">{category}:</span>
                  <p className="text-sm text-gray-700 mt-1">{(skills as string[]).join(" • ")}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate;
