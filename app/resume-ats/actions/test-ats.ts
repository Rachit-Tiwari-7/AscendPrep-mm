// Test data for frontend ATS functionality
export const testResumeData = {
  personalDetails: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev"
  },
  experience: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "2020-01",
      endDate: "2023-12",
      current: false,
      description: [
        "Developed and maintained React applications serving 1M+ users",
        "Improved application performance by 40% through optimization",
        "Led a team of 5 engineers on critical projects"
      ]
    },
    {
      id: "2", 
      company: "StartupXYZ",
      position: "Software Engineer",
      startDate: "2018-06",
      endDate: "2019-12",
      current: false,
      description: [
        "Built RESTful APIs using Node.js and Express",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ]
    }
  ],
  education: [
    {
      id: "1",
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-05",
      gpa: "3.8"
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://github.com/johndoe/ecommerce",
      startDate: "2023-01",
      endDate: "2023-06"
    }
  ],
  skills: [
    { name: "JavaScript", level: "Expert" as const, category: "Technical" as const },
    { name: "React", level: "Expert" as const, category: "Technical" as const },
    { name: "Node.js", level: "Advanced" as const, category: "Technical" as const },
    { name: "Python", level: "Intermediate" as const, category: "Technical" as const },
    { name: "AWS", level: "Intermediate" as const, category: "Technical" as const }
  ],
  summary: "Experienced Senior Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering scalable solutions.",
  targetJobRole: "Senior Full Stack Developer"
};

export const testJobDescription = `
We are looking for a Senior Full Stack Developer to join our growing team. 

Requirements:
- 5+ years of experience in software development
- Strong expertise in React, JavaScript, and Node.js
- Experience with cloud technologies (AWS preferred)
- Bachelor's degree in Computer Science or related field
- Experience with RESTful APIs and microservices
- Knowledge of Python is a plus

Responsibilities:
- Develop and maintain web applications using React and Node.js
- Design and implement RESTful APIs
- Lead development projects and mentor junior developers
- Optimize application performance and scalability
- Work with cloud infrastructure and DevOps practices

We offer competitive salary, benefits, and opportunities for growth.
`;

// Test function to verify ATS functionality
export const testATSFunctionality = () => {
  try {
    const { analyzeResumeWithATS } = require('./frontend-ats');
    
    console.log('Testing ATS analysis...');
    const result = analyzeResumeWithATS(testResumeData, testJobDescription);
    
    console.log('ATS Analysis Results:');
    console.log('Overall Score:', result.score.overall);
    console.log('Skills Match:', result.score.skillsMatch);
    console.log('Experience Relevance:', result.score.experienceRelevance);
    console.log('Formatting:', result.score.formatting);
    console.log('Keyword Density:', result.score.keywordDensity);
    console.log('Impact:', result.score.impact);
    console.log('Insights:', result.insights.length);
    console.log('Recommendations:', result.recommendations.length);
    
    return result;
  } catch (error) {
    console.error('ATS Test failed:', error);
    return null;
  }
};
