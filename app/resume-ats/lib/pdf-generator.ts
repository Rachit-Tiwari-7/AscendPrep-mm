'use client';

import jsPDF from 'jspdf';

// Template-specific styling configs matching resume-preview templates
const templateStyles = {
  minimal: {
    nameSize: 22,
    nameBold: true,
    headingSize: 14,
    headingBold: true,
    bodySize: 10,
    titleColor: undefined,
    accentColor: undefined,
  },
  modern: {
    nameSize: 24,
    nameBold: true,
    headingSize: 14,
    headingBold: true,
    bodySize: 10,
    titleColor: [37, 99, 235], // Blue
    accentColor: [30, 64, 175],
  },
  professional: {
    nameSize: 20,
    nameBold: true,
    headingSize: 13,
    headingBold: true,
    bodySize: 10,
    titleColor: undefined,
    accentColor: undefined,
  },
  creative: {
    nameSize: 22,
    nameBold: true,
    headingSize: 14,
    headingBold: true,
    bodySize: 10,
    titleColor: [15, 23, 42], // Slate 900
    accentColor: [51, 65, 85],
  },
  minimalist: {
    nameSize: 20,
    nameBold: false,
    headingSize: 12,
    headingBold: false,
    bodySize: 10,
    titleColor: undefined,
    accentColor: undefined,
  },
  bold: {
    nameSize: 26,
    nameBold: true,
    headingSize: 16,
    headingBold: true,
    bodySize: 11,
    titleColor: [234, 88, 12], // Orange 600
    accentColor: [220, 38, 38],
  },
  compact: {
    nameSize: 18,
    nameBold: true,
    headingSize: 12,
    headingBold: true,
    bodySize: 9,
    titleColor: undefined,
    accentColor: undefined,
  },
};

interface GeneratePDFOptions {
  filename?: string;
  template?: 'minimal' | 'modern' | 'professional' | 'creative' | 'minimalist' | 'bold' | 'compact';
}

export async function generatePDF(
  resumeData: any,
  options: GeneratePDFOptions = {}
): Promise<Blob> {
  const { template = 'minimal' } = options;

  const doc = new jsPDF();
  const templateConfig = templateStyles[template];

  switch (template) {
    case 'modern':
      renderModernTemplate(doc, resumeData, templateConfig);
      break;
    case 'professional':
      renderProfessionalTemplate(doc, resumeData, templateConfig);
      break;
    case 'creative':
      renderCreativeTemplate(doc, resumeData, templateConfig);
      break;
    case 'minimalist':
    case 'minimal':
      renderMinimalistTemplate(doc, resumeData, templateConfig);
      break;
    case 'bold':
      renderBoldTemplate(doc, resumeData, templateConfig);
      break;
    case 'compact':
      renderCompactTemplate(doc, resumeData, templateConfig);
      break;
    default:
      renderMinimalistTemplate(doc, resumeData, templateConfig);
      break;
  }

  return doc.output('blob');
}

const renderMinimalistTemplate = (
  doc: jsPDF,
  data: any,
  template: any
) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  const addText = (
    text: string,
    fontSize: number = 10,
    isBold: boolean = false,
    align: 'left' | 'center' | 'right' = 'left'
  ) => {
    if (!text) return;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
    doc.text(lines, align === 'center' ? pageWidth / 2 : margin, yPos, { align });
    yPos += lines.length * fontSize * 0.4 + 3;
  };

  const addSection = (title: string) => {
    yPos += 3;
    doc.setFontSize(template.headingSize);
    doc.setFont('helvetica', template.headingBold ? 'bold' : 'normal');
    doc.text(title, margin, yPos);
    yPos += 2;
    doc.setLineWidth(0.5);
    doc.setDrawColor(100, 100, 100);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;
  };

  // Header - Centered
  addText(data.personalDetails?.fullName || 'Your Name', template.nameSize, true, 'center');

  // Contact info - centered
  const contact = [
    data.personalDetails?.email,
    data.personalDetails?.phone,
    data.personalDetails?.location,
  ].filter(Boolean).join(' | ');
  addText(contact, 10, false, 'center');

  // Links
  const links = [
    data.personalDetails?.linkedin,
    data.personalDetails?.github,
    data.personalDetails?.portfolio,
  ].filter(Boolean).join(' | ');
  if (links) {
    addText(links, 9, false, 'center');
  }
  yPos += 8;

  // Summary
  if (data.summary) {
    addSection('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(template.bodySize);
    const lines = doc.splitTextToSize(data.summary, pageWidth - margin * 2);
    doc.text(lines, margin, yPos);
    yPos += lines.length * 4 + 6;
  }

  // Experience
  if (data.experience?.length > 0) {
    addSection('Experience');
    data.experience.forEach((exp: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(exp.position, margin, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const dateStr = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      doc.text(`${exp.company} | ${dateStr}`, margin, yPos);
      yPos += 5;

      doc.setFontSize(9);
      exp.description?.forEach((bullet: string) => {
        if (bullet?.trim()) {
          const bulletLines = doc.splitTextToSize(`• ${bullet}`, pageWidth - margin * 2 - 5);
          doc.text(bulletLines, margin + 3, yPos);
          yPos += bulletLines.length * 4 + 1;
        }
      });
      yPos += 4;
    });
  }

  // Education
  if (data.education?.length > 0) {
    addSection('Education');
    data.education.forEach((edu: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`${edu.degree}${edu.field ? ` - ${edu.field}` : ''}`, margin, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const dateStr = edu.endDate || `${edu.startDate} - ${edu.endDate}`;
      doc.text(`${edu.institution} | ${dateStr}`, margin, yPos);

      if (edu.gpa) {
        yPos += 5;
        doc.text(`GPA: ${edu.gpa}`, margin, yPos);
      }
      yPos += 8;
    });
  }

  // Projects
  if (data.projects?.length > 0) {
    addSection('Projects');
    data.projects.forEach((proj: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(proj.name, margin, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      if (proj.description) {
        const descLines = doc.splitTextToSize(proj.description, pageWidth - margin * 2);
        doc.text(descLines, margin, yPos);
        yPos += descLines.length * 4 + 2;
      }

      if (proj.technologies?.length > 0) {
        doc.setFont('helvetica', 'italic');
        doc.text(`Tech: ${proj.technologies.join(', ')}`, margin, yPos);
        yPos += 5;
      }
      yPos += 4;
    });
  }

  // Skills
  if (data.skills?.length > 0) {
    addSection('Skills');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    const skillsByCategory: Record<string, string[]> = {};
    data.skills.forEach((skill: any) => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill.name);
    });

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${category}: `, margin, yPos);
      const categoryWidth = doc.getTextWidth(`${category}: `);

      doc.setFont('helvetica', 'normal');
      const skillsText = skills.join(', ');
      const skillsLines = doc.splitTextToSize(skillsText, pageWidth - margin * 2 - categoryWidth);
      doc.text(skillsLines, margin + categoryWidth, yPos);
      yPos += skillsLines.length * 4 + 4;
    });
  }
};

const renderModernTemplate = (
  doc: jsPDF,
  data: any,
  template: any
) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Header with colored accent
  const accentColor = template.titleColor || [37, 99, 235];
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(template.nameSize);
  doc.text((data.personalDetails?.fullName || 'Your Name').toUpperCase(), margin, yPos);
  yPos += 8;

  // Accent line
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setLineWidth(1);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 6;

  // Contact info
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const contact = [
    data.personalDetails?.email,
    data.personalDetails?.phone,
    data.personalDetails?.location,
  ].filter(Boolean).join('  •  ');
  doc.text(contact, margin, yPos);
  yPos += 5;

  const links = [data.personalDetails?.linkedin, data.personalDetails?.github].filter(Boolean).join('  •  ');
  if (links) {
    doc.text(links, margin, yPos);
    yPos += 5;
  }
  yPos += 8;

  doc.setTextColor(0, 0, 0);

  // Summary
  if (data.summary) {
    const lines = doc.splitTextToSize(data.summary, pageWidth - margin * 2);
    doc.text(lines, margin, yPos);
    yPos += lines.length * 5 + 10;
  }

  // Two column layout
  const colGap = 15;
  const leftColWidth = (pageWidth - margin * 2) * 0.65;
  const rightColX = margin + leftColWidth + colGap;
  const rightColWidth = (pageWidth - margin * 2) * 0.35;

  let leftY = yPos;
  let rightY = yPos;

  // LEFT COLUMN: Experience & Education
  if (data.experience?.length > 0) {
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setFontSize(template.headingSize);
    doc.setFont('helvetica', 'bold');
    doc.text('EXPERIENCE', margin, leftY);
    leftY += 6;
    doc.setTextColor(0, 0, 0);

    data.experience.forEach((exp: any) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.position, margin, leftY);
      leftY += 5;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text(
        `${exp.company} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
        margin,
        leftY
      );
      leftY += 5;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      exp.description?.forEach((bullet: string) => {
        if (bullet?.trim()) {
          const lines = doc.splitTextToSize(`• ${bullet}`, leftColWidth - 5);
          doc.text(lines, margin + 3, leftY);
          leftY += lines.length * 4 + 1;
        }
      });
      leftY += 4;
    });
  }

  if (data.education?.length > 0) {
    leftY += 5;
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setFontSize(template.headingSize);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', margin, leftY);
    leftY += 6;
    doc.setTextColor(0, 0, 0);

    data.education.forEach((edu: any) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(edu.institution, margin, leftY);
      leftY += 5;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.degree}${edu.field ? ` - ${edu.field}` : ''}`, margin, leftY);
      leftY += 5;
      doc.setTextColor(80, 80, 80);
      const dateStr = edu.endDate || `${edu.startDate} - ${edu.endDate}`;
      doc.text(dateStr, margin, leftY);
      leftY += 8;
      doc.setTextColor(0, 0, 0);
    });
  }

  // RIGHT COLUMN: Skills
  if (data.skills?.length > 0) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS', rightColX, rightY);
    rightY += 6;

    const skillsByCategory: Record<string, string[]> = {};
    data.skills.forEach((skill: any) => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill.name);
    });

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(category, rightColX, rightY);
      rightY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const skillsText = skills.join(', ');
      const lines = doc.splitTextToSize(skillsText, rightColWidth);
      doc.text(lines, rightColX, rightY);
      rightY += lines.length * 4 + 6;
    });
  }

  // Projects
  if (data.projects?.length > 0 && leftY < 250) {
    leftY += 5;
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setFontSize(template.headingSize);
    doc.setFont('helvetica', 'bold');
    doc.text('PROJECTS', margin, leftY);
    leftY += 6;
    doc.setTextColor(0, 0, 0);

    data.projects.forEach((proj: any) => {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(proj.name, margin, leftY);
      leftY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      if (proj.description) {
        const lines = doc.splitTextToSize(proj.description, leftColWidth);
        doc.text(lines, margin, leftY);
        leftY += lines.length * 4 + 2;
      }
      leftY += 4;
    });
  }
};

const renderCompactTemplate = (
  doc: jsPDF,
  data: any,
  template: any
) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let yPos = 15;

  // Compact header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(template.nameSize);
  doc.text(data.personalDetails?.fullName || 'Your Name', margin, yPos);
  yPos += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const contact = [
    data.personalDetails?.email,
    data.personalDetails?.phone,
    data.personalDetails?.location,
  ].filter(Boolean).join(' | ');
  doc.text(contact, margin, yPos);
  yPos += 4;

  const links = [data.personalDetails?.linkedin, data.personalDetails?.github].filter(Boolean).join(' | ');
  if (links) {
    doc.text(links, margin, yPos);
    yPos += 4;
  }

  doc.setLineWidth(0.3);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 6;

  // Two column layout
  const colGap = 10;
  const colWidth = (pageWidth - margin * 2 - colGap) / 2;
  const leftColX = margin;
  const rightColX = margin + colWidth + colGap;

  let leftY = yPos;
  let rightY = yPos;

  // LEFT COLUMN
  if (data.experience?.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.text('Experience', leftColX, leftY);
    leftY += 5;

    data.experience.forEach((exp: any) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(exp.position, leftColX, leftY);
      leftY += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(exp.company, leftColX, leftY);
      leftY += 4;

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text(
        `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
        leftColX,
        leftY
      );
      leftY += 4;
      doc.setTextColor(0, 0, 0);

      doc.setFontSize(8);
      exp.description?.slice(0, 2).forEach((bullet: string) => {
        if (bullet?.trim()) {
          const lines = doc.splitTextToSize(`• ${bullet}`, colWidth - 3);
          doc.text(lines, leftColX + 2, leftY);
          leftY += lines.length * 3 + 1;
        }
      });
      leftY += 3;
    });
  }

  // RIGHT COLUMN
  if (data.education?.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.text('Education', rightColX, rightY);
    rightY += 5;

    data.education.forEach((edu: any) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, rightColX, rightY);
      rightY += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(edu.institution, rightColX, rightY);
      rightY += 4;

      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      const dateStr = edu.endDate || `${edu.startDate} - ${edu.endDate}`;
      doc.text(dateStr, rightColX, rightY);
      rightY += 6;
      doc.setTextColor(0, 0, 0);
    });
  }

  // Skills at bottom (full width)
  const bottomY = Math.max(leftY, rightY) + 5;
  if (data.skills?.length > 0 && bottomY < 270) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.text('Skills', margin, bottomY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const skillsText = data.skills.map((s: any) => s.name).join(' • ');
    const lines = doc.splitTextToSize(skillsText, pageWidth - margin * 2);
    doc.text(lines, margin, bottomY + 5);
  }
};

const renderProfessionalTemplate = (
  doc: jsPDF,
  data: any,
  template: any
) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Centered Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(template.nameSize);
  doc.text(data.personalDetails?.fullName || 'Your Name', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;

  // Contact info - centered
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const contact = [
    data.personalDetails?.email,
    data.personalDetails?.phone,
    data.personalDetails?.location,
  ].filter(Boolean).join(' | ');
  doc.text(contact, pageWidth / 2, yPos, { align: 'center' });
  yPos += 5;

  if (data.personalDetails?.linkedin) {
    doc.text(data.personalDetails.linkedin, pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
  }

  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Summary
  if (data.summary) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.text('Professional Summary', margin, yPos);
    yPos += 2;
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(template.bodySize);
    const lines = doc.splitTextToSize(data.summary, pageWidth - margin * 2);
    doc.text(lines, margin, yPos);
    yPos += lines.length * 4 + 8;
  }

  // Experience
  if (data.experience?.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.text('Work Experience', margin, yPos);
    yPos += 2;
    doc.setLineWidth(0.3);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;

    data.experience.forEach((exp: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(exp.position, margin, yPos);
      
      // Date on right
      doc.setFont('helvetica', 'italic');
      doc.text(`${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`, pageWidth - margin, yPos, { align: 'right' });
      yPos += 5;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(exp.company, margin, yPos);
      yPos += 5;

      if (exp.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        exp.description.forEach((bullet: string) => {
          if (bullet?.trim()) {
            const lines = doc.splitTextToSize(`• ${bullet}`, pageWidth - margin * 2 - 5);
            doc.text(lines, margin + 3, yPos);
            yPos += lines.length * 3.5 + 1;
          }
        });
      }
      yPos += 4;
    });
  }

  // Education
  if (data.education?.length > 0) {
    yPos += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.text('Education', margin, yPos);
    yPos += 2;
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;

    data.education.forEach((edu: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(edu.institution, margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(edu.endDate || `${edu.startDate} - ${edu.endDate}`, pageWidth - margin, yPos, { align: 'right' });
      yPos += 5;

      doc.setFont('helvetica', 'italic');
      doc.text(`${edu.degree}${edu.field ? ` - ${edu.field}` : ''}`, margin, yPos);
      yPos += 5;

      if (edu.gpa) {
        doc.setFont('helvetica', 'normal');
        doc.text(`GPA: ${edu.gpa}`, margin, yPos);
        yPos += 5;
      }
      yPos += 4;
    });
  }

  // Skills
  if (data.skills?.length > 0) {
    yPos += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.text('Skills', margin, yPos);
    yPos += 2;
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const skillsByCategory: Record<string, string[]> = {};
    data.skills.forEach((skill: any) => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill.name);
    });

    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${category}: `, margin, yPos);
      const categoryWidth = doc.getTextWidth(`${category}: `);

      doc.setFont('helvetica', 'normal');
      const skillsText = (skills as string[]).join(', ');
      const lines = doc.splitTextToSize(skillsText, pageWidth - margin * 2 - categoryWidth);
      doc.text(lines, margin + categoryWidth, yPos);
      yPos += lines.length * 3.5 + 4;
    });
  }
};

const renderCreativeTemplate = (
  doc: jsPDF,
  data: any,
  template: any
) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const sidebarWidth = pageWidth * 0.35;
  
  // Sidebar background
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, sidebarWidth, pageHeight, 'F');

  // Sidebar content
  doc.setTextColor(255, 255, 255);
  let sideY = 30;
  const sideMargin = 15;

  // Initial circle
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(1);
  doc.circle(sidebarWidth / 2, sideY + 15, 20, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  const initial = data.personalDetails?.fullName ? data.personalDetails.fullName.charAt(0) : 'U';
  doc.text(initial, sidebarWidth / 2, sideY + 22, { align: 'center' });
  sideY += 50;

  // Name in sidebar
  doc.setFontSize(16);
  doc.text(data.personalDetails?.fullName || 'Your Name', sideMargin, sideY, { maxWidth: sidebarWidth - sideMargin * 2 });
  sideY += 15;

  // Contact section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('Contact', sideMargin, sideY);
  sideY += 8;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.setFontSize(9);
  
  if (data.personalDetails?.email) {
    doc.text(data.personalDetails.email, sideMargin, sideY);
    sideY += 5;
  }
  if (data.personalDetails?.phone) {
    doc.text(data.personalDetails.phone, sideMargin, sideY);
    sideY += 5;
  }
  if (data.personalDetails?.location) {
    doc.text(data.personalDetails.location, sideMargin, sideY);
    sideY += 5;
  }
  sideY += 15;

  // Skills in sidebar
  if (data.skills?.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.text('Skills', sideMargin, sideY);
    sideY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(203, 213, 225);
    doc.setFontSize(9);
    
    data.skills.slice(0, 10).forEach((skill: any) => {
      doc.text(`• ${skill.name}`, sideMargin, sideY);
      sideY += 5;
    });
    sideY += 10;
  }

  // Main content area
  const mainMargin = sidebarWidth + 20;
  const mainWidth = pageWidth - mainMargin - 20;
  let mainY = 30;
  doc.setTextColor(15, 23, 42);

  // Summary
  if (data.summary) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Profile', mainMargin, mainY);
    mainY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(data.summary, mainWidth);
    doc.text(lines, mainMargin, mainY);
    mainY += lines.length * 4 + 15;
  }

  // Experience
  if (data.experience?.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Experience', mainMargin, mainY);
    mainY += 8;

    data.experience.forEach((exp: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(exp.position, mainMargin, mainY);
      mainY += 6;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(10);
      doc.text(`${exp.company} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, mainMargin, mainY);
      mainY += 6;

      doc.setTextColor(15, 23, 42);
      if (exp.description) {
        doc.setFontSize(9);
        exp.description.forEach((bullet: string) => {
          if (bullet?.trim()) {
            const lines = doc.splitTextToSize(`• ${bullet}`, mainWidth - 5);
            doc.text(lines, mainMargin + 3, mainY);
            mainY += lines.length * 3.5 + 1;
          }
        });
      }
      mainY += 8;
    });
  }

  // Education
  if (data.education?.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Education', mainMargin, mainY);
    mainY += 8;

    data.education.forEach((edu: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(edu.institution, mainMargin, mainY);
      mainY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(10);
      doc.text(`${edu.degree}${edu.field ? ` - ${edu.field}` : ''}`, mainMargin, mainY);
      mainY += 5;
      doc.text(edu.endDate || `${edu.startDate} - ${edu.endDate}`, mainMargin, mainY);
      mainY += 5;
      
      if (edu.gpa) {
        doc.text(`GPA: ${edu.gpa}`, mainMargin, mainY);
        mainY += 5;
      }
      mainY += 8;
      doc.setTextColor(15, 23, 42);
    });
  }

  // Projects
  if (data.projects?.length > 0 && mainY < 250) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Projects', mainMargin, mainY);
    mainY += 8;

    data.projects.forEach((proj: any) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(proj.name, mainMargin, mainY);
      mainY += 5;

      if (proj.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(proj.description, mainWidth);
        doc.text(lines, mainMargin, mainY);
        mainY += lines.length * 3.5 + 2;
      }
      mainY += 6;
    });
  }
};

const renderBoldTemplate = (
  doc: jsPDF,
  data: any,
  template: any
) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Bold orange header
  doc.setFillColor(234, 88, 12);
  doc.rect(0, 0, pageWidth, 70, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(template.nameSize);
  doc.text(data.personalDetails?.fullName || 'Your Name', margin, yPos + 15);
  
  yPos += 30;
  doc.setFontSize(11);
  const contact = [
    data.personalDetails?.email,
    data.personalDetails?.phone,
    data.personalDetails?.location,
  ].filter(Boolean).join(' | ');
  doc.text(contact, margin, yPos);
  yPos = 80;

  doc.setTextColor(0, 0, 0);

  // Summary with orange accent
  if (data.summary) {
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(3);
    doc.line(margin, yPos, margin + 5, yPos);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(234, 88, 12);
    doc.text('Profile', margin + 10, yPos + 1);
    yPos += 10;

    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(data.summary, pageWidth - margin * 2 - 10);
    doc.text(lines, margin + 10, yPos);
    yPos += lines.length * 4 + 15;
  }

  // Experience
  if (data.experience?.length > 0) {
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(2);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.setTextColor(234, 88, 12);
    doc.text('Work Experience', margin, yPos);
    yPos += 10;

    data.experience.forEach((exp: any) => {
      // Orange bullet
      doc.setFillColor(234, 88, 12);
      doc.circle(margin + 3, yPos + 2, 2, 'F');

      doc.setTextColor(17, 24, 39);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(exp.position, margin + 10, yPos + 3);
      
      // Date on right
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(75, 85, 99);
      doc.text(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, pageWidth - margin, yPos + 3, { align: 'right' });
      yPos += 8;

      doc.setTextColor(234, 88, 12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(exp.company, margin + 10, yPos);
      yPos += 6;

      if (exp.description) {
        doc.setTextColor(55, 65, 81);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        exp.description.forEach((bullet: string) => {
          if (bullet?.trim()) {
            const lines = doc.splitTextToSize(bullet, pageWidth - margin * 2 - 15);
            doc.text(lines, margin + 10, yPos);
            yPos += lines.length * 3.5 + 1;
          }
        });
      }
      yPos += 10;
    });
  }

  // Two column layout for Education and Skills
  const colY = yPos;
  const colGap = 15;
  const colWidth = (pageWidth - margin * 2 - colGap) / 2;

  // Education (left column)
  if (data.education?.length > 0) {
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(2);
    doc.line(margin, colY, margin + colWidth, colY);
    
    let eduY = colY + 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.setTextColor(234, 88, 12);
    doc.text('Education', margin, eduY);
    eduY += 10;

    data.education.forEach((edu: any) => {
      doc.setTextColor(17, 24, 39);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(edu.degree, margin, eduY);
      eduY += 6;

      doc.setTextColor(234, 88, 12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(edu.institution, margin, eduY);
      eduY += 5;

      doc.setTextColor(75, 85, 99);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(edu.endDate || `${edu.startDate} - ${edu.endDate}`, margin, eduY);
      eduY += 5;

      if (edu.gpa) {
        doc.text(`GPA: ${edu.gpa}`, margin, eduY);
        eduY += 5;
      }
      eduY += 6;
    });
  }

  // Skills (right column)
  if (data.skills?.length > 0) {
    const rightColX = margin + colWidth + colGap;
    
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(2);
    doc.line(rightColX, colY, rightColX + colWidth, colY);
    
    let skillY = colY + 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.setTextColor(234, 88, 12);
    doc.text('Skills', rightColX, skillY);
    skillY += 10;

    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    
    data.skills.forEach((skill: any) => {
      doc.setFillColor(254, 215, 170);
      doc.roundedRect(rightColX, skillY - 4, doc.getTextWidth(skill.name) + 8, 10, 2, 2, 'F');
      doc.setTextColor(194, 65, 12);
      doc.text(skill.name, rightColX + 4, skillY + 2);
      skillY += 12;
    });
  }

  // Projects at bottom
  if (data.projects?.length > 0) {
    let projY = Math.max(yPos, 220) + 10;
    if (projY > 250) {
      doc.addPage();
      projY = 30;
    }

    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(2);
    doc.line(margin, projY, pageWidth - margin, projY);
    projY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(template.headingSize);
    doc.setTextColor(234, 88, 12);
    doc.text('Projects', margin, projY);
    projY += 10;

    data.projects.forEach((proj: any) => {
      doc.setTextColor(17, 24, 39);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(proj.name, margin, projY);
      projY += 5;

      if (proj.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(proj.description, pageWidth - margin * 2);
        doc.text(lines, margin, projY);
        projY += lines.length * 3.5 + 2;
      }

      if (proj.technologies?.length > 0) {
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(proj.technologies.join(' • '), margin, projY);
        projY += 5;
      }
      projY += 6;
    });
  }
};

// Helper function for downloading
export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}