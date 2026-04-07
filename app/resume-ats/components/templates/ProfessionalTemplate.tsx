'use client';

import React from 'react';

interface TemplateProps {
  data: any;
}

const ProfessionalTemplate = ({ data }: TemplateProps) => {
  return (
    <div className="bg-white p-12 min-h-[1100px] font-serif text-gray-900 max-w-[850px] mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-900 pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {data.personalDetails?.fullName || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-700">
          {data.personalDetails?.email && (
            <a href={`mailto:${data.personalDetails.email}`} className="hover:text-blue-600 hover:underline">
              {data.personalDetails.email}
            </a>
          )}
          {data.personalDetails?.phone && <span>{data.personalDetails.phone}</span>}
          {data.personalDetails?.location && <span>{data.personalDetails.location}</span>}
          {data.personalDetails?.linkedin && (
            <a href={data.personalDetails.linkedin.startsWith("http") ? data.personalDetails.linkedin : `https://${data.personalDetails.linkedin}`}
               target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">
              {data.personalDetails.linkedin}
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-3 pb-1">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-4 pb-1">Work Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-sm italic text-gray-600">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <p className="text-sm italic text-gray-700 mb-2">{exp.company}</p>
                {exp.description && (
                  <ul className="list-disc list-inside text-sm leading-relaxed text-gray-800 space-y-1">
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
        <section className="mb-8">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-4 pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu: any) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">{edu.institution}</h3>
                  <span className="text-sm italic text-gray-600">
                    {edu.endDate || `${edu.startDate} - ${edu.endDate}`}
                  </span>
                </div>
                <p className="text-sm">{edu.degree}{edu.field ? ` - ${edu.field}` : ''}</p>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2 className="text-sm font-bold border-b border-gray-400 mb-3 pb-1">Skills</h2>
          <div className="text-sm leading-relaxed">
            {(() => {
              const skillsByCategory: Record<string, string[]> = {};
              data.skills.forEach((skill: any) => {
                if (!skillsByCategory[skill.category]) {
                  skillsByCategory[skill.category] = [];
                }
                skillsByCategory[skill.category].push(skill.name);
              });
              return Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} className="mb-2">
                  <span className="font-bold">{category}: </span>
                  <span>{(skills as string[]).join(", ")}</span>
                </div>
              ));
            })()}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
