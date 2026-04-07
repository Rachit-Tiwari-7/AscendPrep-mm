'use client';

import React from 'react';

interface TemplateProps {
  data: any;
}

const CreativeTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white min-h-[1100px] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-slate-900 text-white p-8">
        <div className="mb-10 text-center">
          <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4 border-2 border-slate-500">
            {data.personalDetails?.fullName ? data.personalDetails.fullName.charAt(0) : "U"}
          </div>
          <h1 className="text-2xl font-bold leading-tight mb-2 break-words">
            {data.personalDetails?.fullName || "Your Name"}
          </h1>
        </div>

        <div className="space-y-8">
          {/* Contact */}
          <section>
            <h3 className="text-slate-400 capitalize tracking-wide text-xs font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-slate-300">
              {data.personalDetails?.email && (
                <a href={`mailto:${data.personalDetails.email}`} className="break-words block hover:text-blue-400 hover:underline">
                  {data.personalDetails.email}
                </a>
              )}
              {data.personalDetails?.phone && <div>{data.personalDetails.phone}</div>}
              {data.personalDetails?.location && <div>{data.personalDetails.location}</div>}
              {data.personalDetails?.linkedin && (
                <a href={data.personalDetails.linkedin.startsWith("http") ? data.personalDetails.linkedin : `https://${data.personalDetails.linkedin}`}
                   target="_blank" rel="noreferrer" className="text-xs break-all block hover:text-blue-400 hover:underline">
                  {data.personalDetails.linkedin}
                </a>
              )}
            </div>
          </section>

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h3 className="text-slate-400 capitalize tracking-wide text-xs font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: any, index: number) => (
                  <span key={index} className="bg-slate-800 px-2 py-1 rounded text-xs text-slate-200">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-2/3 p-6 md:p-10 bg-white">
        {/* Summary */}
        {data.summary && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-slate-800 pl-4">Profile</h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-slate-800 pl-4">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp: any) => (
                <div key={exp.id} className="relative">
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <div className="text-slate-500 font-medium mb-2">
                    {exp.company} | {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                  {exp.description && (
                    <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-1">
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
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-slate-800 pl-4">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu: any) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-bold text-gray-900">{edu.institution}</h3>
                  <div className="text-slate-500">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</div>
                  <div className="text-gray-400 text-sm">{edu.endDate || `${edu.startDate} - ${edu.endDate}`}</div>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-slate-800 pl-4">Projects</h2>
            <div className="space-y-6">
              {data.projects.map((proj: any) => (
                <div key={proj.id}>
                  <h3 className="text-lg font-bold text-gray-900">{proj.name}</h3>
                  {proj.description && <p className="text-gray-600 text-sm">{proj.description}</p>}
                  {proj.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.technologies.map((tech: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
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
      </main>
    </div>
  );
};

export default CreativeTemplate;
