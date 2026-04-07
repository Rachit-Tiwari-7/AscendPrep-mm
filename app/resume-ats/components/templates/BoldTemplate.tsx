'use client';

import React from 'react';

interface TemplateProps {
  data: any;
}

const BoldTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white min-h-[1100px] font-sans">
      {/* Bold Header with Accent */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8">
        <h1 className="text-4xl font-black capitalize mb-3 tracking-tight">
          {data.personalDetails?.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm font-medium opacity-95">
          {data.personalDetails?.email && <span>{data.personalDetails.email}</span>}
          {data.personalDetails?.phone && <span>|</span>}
          {data.personalDetails?.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails?.location && <span>|</span>}
          {data.personalDetails?.location && <span>{data.personalDetails.location}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
            <h2 className="text-lg font-black capitalize text-orange-600 mb-3">Profile</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-black capitalize text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp: any) => (
                <div key={exp.id} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-md font-semibold text-orange-600">{exp.company}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-600 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education?.length > 0 && (
            <div>
              <h2 className="text-lg font-black capitalize text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu: any) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-orange-600 font-semibold">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.endDate || `${edu.startDate} - ${edu.endDate}`}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <div>
              <h2 className="text-lg font-black capitalize text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: any, index: number) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {data.projects?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-black capitalize text-orange-600 mb-4 pb-2 border-b-4 border-orange-500">
              Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((proj: any) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-gray-900">{proj.name}</h3>
                  {proj.description && <p className="text-gray-700 text-sm mt-1">{proj.description}</p>}
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.technologies.map((tech: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoldTemplate;
