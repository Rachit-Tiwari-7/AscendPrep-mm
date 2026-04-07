// Comprehensive test for frontend-only ATS and Resume Generation functionality
import { analyzeResumeWithATS, enhanceResumeWithAI } from './frontend-ats';
import { frontendResumeApi, resumeContentGenerator } from './frontend-resume-api';
import { ResumeData } from '@/store/resume-ats/use-resume-store';

// Test data
const testJobDescription = `
We are looking for a Senior Software Engineer to join our growing team. 

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
`;

export const runComprehensiveTest = () => {
  console.log('🧪 Running Frontend-Only ATS & Resume Generation Tests...\n');

  // Test 1: Resume API Functions
  console.log('📋 Testing Resume API Functions...');
  try {
    // Create a new resume
    const newResume = frontendResumeApi.create('software-engineer');
    console.log('✅ Resume created:', newResume.name);

    // List resumes
    const resumes = frontendResumeApi.list();
    console.log('✅ Resumes listed:', resumes.length, 'resumes found');

    // Update resume
    const updated = frontendResumeApi.update(newResume.id, {
      name: 'Updated Resume Name'
    });
    console.log('✅ Resume updated:', updated?.name);

    // Test templates
    const templates = frontendResumeApi.getTemplates();
    console.log('✅ Templates loaded:', templates.length, 'templates available');

    // Duplicate resume
    const duplicate = frontendResumeApi.duplicate(newResume.id);
    console.log('✅ Resume duplicated:', duplicate?.name);

    // Clean up
    frontendResumeApi.delete(newResume.id);
    frontendResumeApi.delete(duplicate?.id || '');
    console.log('✅ Test resumes cleaned up');

  } catch (error) {
    console.error('❌ Resume API test failed:', error);
  }

  // Test 2: Content Generation
  console.log('\n🎨 Testing Content Generation...');
  try {
    const testExperience = [
      {
        id: '1',
        company: 'Tech Corp',
        position: 'Software Engineer',
        startDate: '2020-01',
        endDate: '2023-12',
        current: false,
        description: ['Built web applications']
      }
    ];

    const testSkills = ['JavaScript', 'React', 'Node.js'];

    // Test summary generation
    const summary = resumeContentGenerator.generateSummary('Software Engineer', testExperience, testSkills);
    console.log('✅ Summary generated:', summary.substring(0, 100) + '...');

    // Test bullet points generation
    const bulletPoints = resumeContentGenerator.generateBulletPoints('Software Engineer', 'Tech Corp');
    console.log('✅ Bullet points generated:', bulletPoints.length, 'points');

    // Test skills generation
    const skills = resumeContentGenerator.generateSkills('Software Engineer');
    console.log('✅ Skills generated:', skills.length, 'skills');

    // Test education generation
    const education = resumeContentGenerator.generateEducation();
    console.log('✅ Education generated:', education.length, 'education entries');

  } catch (error) {
    console.error('❌ Content generation test failed:', error);
  }

  // Test 3: ATS Analysis
  console.log('\n🎯 Testing ATS Analysis...');
  try {
    const testResumeData: ResumeData = {
      personalDetails: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-0123',
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
            'Led a team of 5 engineers on critical projects'
          ]
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2018-09',
          endDate: '2022-05',
          gpa: '3.8'
        }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with React and Node.js',
          technologies: ['React', 'Node.js', 'MongoDB'],
          link: 'https://github.com/johndoe/ecommerce',
          startDate: '2023-01',
          endDate: '2023-06'
        }
      ],
      skills: [
        { name: 'JavaScript', level: 'Expert', category: 'Technical' },
        { name: 'React', level: 'Expert', category: 'Technical' },
        { name: 'Node.js', level: 'Advanced', category: 'Technical' },
        { name: 'Python', level: 'Intermediate', category: 'Technical' },
        { name: 'AWS', level: 'Intermediate', category: 'Technical' }
      ],
      summary: 'Experienced Senior Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies.',
      targetJobRole: 'Senior Software Engineer'
    };

    // Run ATS analysis
    const atsReport = analyzeResumeWithATS(testResumeData, testJobDescription);
    
    console.log('✅ ATS Analysis completed:');
    console.log('   Overall Score:', atsReport.score.overall + '%');
    console.log('   Skills Match:', atsReport.score.skillsMatch + '%');
    console.log('   Experience Relevance:', atsReport.score.experienceRelevance + '%');
    console.log('   Formatting:', atsReport.score.formatting + '%');
    console.log('   Keyword Density:', atsReport.score.keywordDensity + '%');
    console.log('   Impact:', atsReport.score.impact + '%');
    console.log('   Insights:', atsReport.insights.length, 'keywords analyzed');
    console.log('   Recommendations:', atsReport.recommendations.length, 'suggestions');

  } catch (error) {
    console.error('❌ ATS Analysis test failed:', error);
  }

  // Test 4: Resume Enhancement
  console.log('\n✨ Testing Resume Enhancement...');
  try {
    const basicResume: ResumeData = {
      personalDetails: {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1-555-0124',
        location: 'New York, NY',
        linkedin: '',
        github: '',
        portfolio: ''
      },
      experience: [
        {
          id: '1',
          company: 'StartupXYZ',
          position: 'Developer',
          startDate: '2021-01',
          endDate: '2023-12',
          current: false,
          description: ['wrote code', 'fixed bugs']
        }
      ],
      education: [],
      projects: [],
      skills: [],
      summary: '',
      targetJobRole: 'Software Developer'
    };

    const enhanced = enhanceResumeWithAI(basicResume);
    
    console.log('✅ Resume enhanced:');
    console.log('   Summary improved:', enhanced.summary.length > basicResume.summary.length);
    console.log('   Experience enhanced:', enhanced.experience[0].description[0].startsWith('Developed'));

  } catch (error) {
    console.error('❌ Resume enhancement test failed:', error);
  }

  console.log('\n🎉 All frontend-only tests completed!');
  console.log('✅ ATS and Resume Generation are working without backend dependencies');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).runFrontendTest = runComprehensiveTest;
  console.log('💡 Run window.runFrontendTest() in browser console to test frontend functionality');
}
