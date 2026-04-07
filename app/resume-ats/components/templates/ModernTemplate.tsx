'use client';

import React from 'react';

interface TemplateProps {
  data: any;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white p-8 min-h-[1100px] font-sans text-gray-800">
      {/* Header */}
      <header className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {data.personalDetails?.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium text-gray-600">
          {data.personalDetails?.email && (
            <a href={`mailto:${data.personalDetails.email}`} className="hover:text-blue-600 hover:underline">
              {data.personalDetails.email}
            </a>
          )}
          {data.personalDetails?.phone && <span>• {data.personalDetails.phone}</span>}
          {data.personalDetails?.location && <span>• {data.personalDetails.location}</span>}
          {data.personalDetails?.linkedin && (
            <a href={data.personalDetails.linkedin.startsWith("http") ? data.personalDetails.linkedin : `https://${data.personalDetails.linkedin}`} 
               target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">
              • {data.personalDetails.linkedin}
            </a>
          )}
          {data.personalDetails?.portfolio && (
            <a href={data.personalDetails.portfolio.startsWith("http") ? data.personalDetails.portfolio : `https://${data.personalDetails.portfolio}`} 
               target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">
              • {data.personalDetails.portfolio}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
        </section>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {data.experience?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4 tracking-wide">Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp: any) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <div className="flex justify-between items-center text-gray-600 mb-2">
                      <span className="font-semibold">{exp.company}</span>
                      <span className="text-sm">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {exp.description.map((bullet: string, idx: number) => (
                          bullet?.trim() && <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4 capitalize tracking-wide">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu: any) => (
                  <div key={edu.id}>
                    <h3 className="text-lg font-bold text-gray-900">{edu.institution}</h3>
                    <div className="flex justify-between text-gray-600">
                      <span>{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</span>
                      <span>{edu.endDate || `${edu.startDate} - ${edu.endDate}`}</span>
                    </div>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4 tracking-wide">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((proj: any) => (
                  <div key={proj.id} className="relative pl-4 border-l-2 border-gray-200">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900">{proj.name}</h3>
                      <span className="text-sm text-gray-500">
                        {proj.startDate} - {proj.endDate}
                      </span>
                    </div>
                    {proj.description && <p className="text-gray-700 mt-1">{proj.description}</p>}
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
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 space-y-8 border-l border-gray-100 pl-8">
          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: any, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Coding Profiles */}
          {data.personalDetails?.github && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">Coding Profiles</h2>
              <ul className="space-y-2">
                {data.personalDetails.github && (
                  <li className="text-gray-700">
                    <span className="font-semibold text-sm">GitHub:</span>
                    <a href={data.personalDetails.github.startsWith("http") ? data.personalDetails.github : `https://${data.personalDetails.github}`}
                       target="_blank" rel="noreferrer" className="text-blue-600 text-xs hover:underline break-all block">
                      {data.personalDetails.github}
                    </a>
                  </li>
                )}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
