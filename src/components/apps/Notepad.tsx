import React, { useState, useEffect } from 'react';

const Notepad: React.FC = () => {
  const [content, setContent] = useState<string>('');
  
  useEffect(() => {
    const resumeContent = `
SENIOR SOFTWARE DEVELOPER

PROFILE
--------------------------------------
Creative and detail-oriented Software Developer with extensive experience in building interactive and responsive web applications. Passionate about creating intuitive user interfaces and solving complex problems through clean, efficient code.

<img src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" style="max-width: 100%; margin: 20px 0;" />

TECHNICAL SKILLS
--------------------------------------
• Programming Languages: JavaScript, TypeScript, Python, Java
• Frontend: React.js, Vue.js, Angular, HTML5, CSS3/SCSS
• Backend: Node.js, Express, Django, Flask
• Databases: PostgreSQL, MongoDB, MySQL, Redis
• Tools: Git, Docker, Webpack, Jest, Cypress
• Cloud: AWS, Google Cloud, Azure, Netlify

<img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Skills" style="max-width: 100%; margin: 20px 0;" />

PROFESSIONAL EXPERIENCE
--------------------------------------
SENIOR FRONTEND DEVELOPER
TechCorp | 2023 - Present

<img src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company 1" style="max-width: 100%; margin: 20px 0;" />

• Architected and built a React-based dashboard that processed and visualized terabytes of data in real-time
• Implemented advanced state management using Redux and Context API
• Reduced application bundle size by 40% through code splitting and lazy loading
• Mentored junior developers and conducted code reviews

FULL STACK DEVELOPER
InnovateTech | 2020 - 2023

<img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Company 2" style="max-width: 100%; margin: 20px 0;" />

• Developed RESTful APIs with Node.js and Express that served 10M+ requests daily
• Designed and implemented microservices architecture using Docker and Kubernetes
• Created a real-time chat application using WebSockets and Redis pub/sub
• Automated deployment process reducing deployment time from hours to minutes

EDUCATION
--------------------------------------
Bachelor of Science in Computer Science
University of Technology | 2020

<img src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Education" style="max-width: 100%; margin: 20px 0;" />

AWARDS & CERTIFICATIONS
--------------------------------------
• Best Innovation Award - TechCorp (2023)
• AWS Certified Solutions Architect
• Google Cloud Professional Developer
• Microsoft Certified: Azure Developer Associate

<img src="https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Awards" style="max-width: 100%; margin: 20px 0;" />

CONTACT
--------------------------------------
Email: developer@example.com
LinkedIn: linkedin.com/in/developer
GitHub: github.com/developer
Portfolio: example.com

<img src="https://images.pexels.com/photos/193003/pexels-photo-193003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Contact" style="max-width: 100%; margin: 20px 0;" />
`;
    
    setContent(resumeContent);
  }, []);

  return (
    <div className="h-full bg-white flex flex-col">
      <div 
        className="flex-1 p-4 font-mono text-sm overflow-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Notepad;