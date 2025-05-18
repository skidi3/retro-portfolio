import React, { useState } from 'react';

const EXPERIENCE = [
  {
    type: 'fulltime',
    title: 'Senior Software Engineer',
    company: 'Bajaj Finserv',
    location: 'Pune, Maharashtra, India',
    date: 'Aug 2024 – Present',
    description: `• Architected and implemented a microfrontend architecture across internal platforms and shared modules (e.g., login components), leading to a 65% reduction in deployment failures and a 40% improvement in release cycles.
• Developed a Storybook-driven Blazor POC, transforming tightly coupled codebases into modular, reusable components for improved scalability and faster cross-team development.
• Integrated gRPC-web for latency-sensitive services, reducing average API response time from 300ms to 78ms, significantly enhancing frontend responsiveness and user satisfaction.`,
    tags: ['React.js', 'RabbitMQ', 'Apache Kafka', 'Angular', 'storybook', 'gRPC', 'Blazor', 'Microfrontend Architecture', 'Distributed Systems', 'TypeScript', 'Load Balancing']
  },
  {
    type: 'fulltime',
    title: 'Software Engineer',
    company: 'Bajaj Finserv',
    location: 'Pune, Maharashtra, India',
    date: 'Jul 2022 – Aug 2024',
    description: `• Refactored the legacy User Access Management Portal into a modern Angular application and rolled out key modules to production, improving performance and maintainability. 
• Automated the employee provisioning process, bringing down onboarding time from 48 hours to under 10 minutes, with 99.9% uptime.
• Built a highly scalable NPS feedback system processing ~5 million daily hits, enabling non-technical teams to launch surveys within 10 seconds using a no-code interface.
• Prototyped and implemented GraphQL APIs to replace REST-based integrations, reducing API payload by 40% and call frequency by 35%.`,
    tags: ['Redis', 'Angular', 'GraphQL', 'Azure', 'Material-UI', 'TypeScript', 'Performance Optimization', 'SQL']
  },
  {
    type: 'internship',
    title: 'SDE Intern',
    company: 'Bajaj Finserv',
    location: 'Pune, Maharashtra, India',
    date: 'Jan 2022 – Jun 2022',
    description: `• Contributed to multiple production features for the Experia Customer Portal (https://www.bajajfinserv.in), participating in full-cycle development and QA.
• Refactored a legacy jQuery codebase to modern JavaScript standards, improving maintainability and reducing DOM manipulation time by 38%.
• Designed and deployed .NET-based REST APIs on Microsoft Azure to support the customer onboarding workflow, improving backend scalability and frontend integration.`,
    tags: ['.NET Framework', 'REST APIs', 'JavaScript', 'jQuery', 'HTML', 'CSS']
  },
  {
    type: 'internship',
    title: 'Intern (Prism)',
    company: 'Samsung Electronics',
    location: 'India',
    date: 'Nov 2021 – Jan 2022',
    description: `• Designed and developed an AI-powered system to generate text captions from real-world audio. Worked on signal processing, model training, and app development to collect data and simulate real-time captioning on web and mobile platforms.
• Based on DCASE 2020 Task 6.`,
    tags: ['Python', 'FastAPI', 'Apollo GraphQL']
  },
  {
    type: 'internship',
    title: 'SDE Intern',
    company: 'PingSafe (Now part of SentinelOne)',
    location: 'India',
    date: 'Aug 2021 – Jan 2022',
    description: `• Worked on cloud security automation by developing Node.js scripts to detect vulnerabilities across AWS, GCP, and Azure environments.
• Focused on backend logic to scan for misconfigurations, exposed resources, and policy violations in multi-cloud infrastructures, enabling proactive threat detection and compliance monitoring.`,
    tags: ['Node.js', 'Cloud Security', 'Backend Development']
  },
  {
    type: 'internship',
    title: 'Cybersecurity Intern',
    company: 'Haryana Police',
    location: 'India',
    date: 'Jun 2021 – Jul 2021',
    description: `• Completed a Cyber Security Summer Internship at the Cyber Crime Cell, Gurugram, under the mentorship of Mr. Rakshit Tandon and the Haryana Police.
• Gained practical exposure by contributing to live case investigations and studying real-world cybercrime scenarios.
• Worked on a research project focused on women's safety in India, exploring tech-based preventive and reporting solutions using cybersecurity principles.`,
    tags: ['Cybercrime Prevention', 'React.js', 'Digital Forensics', 'Law Enforcement Collaboration']
  },
  {
    type: 'internship',
    title: 'Research Intern',
    company: 'Universiti Teknologi PETRONAS',
    location: 'Malaysia',
    date: 'Jun 2021 – Jul 2021',
    description: `• Contributed to the project titled "Development of Web Interface for Arduino Module".
• Built a secure, bidirectional web interface using React.js, Node.js, Socket.IO, and Firebase.
• Integrated real-time sensor data from MATLAB into the interface to build a dynamic analytics dashboard for live monitoring.
• Led the end-to-end project documentation process.`,
    tags: ['Socket.IO', 'React.js', 'Node.js', 'MATLAB', 'Firebase', 'WebSocket']
  },
  {
    type: 'internship',
    title: 'Web Development Intern',
    company: 'Wellsprings',
    location: 'India',
    date: 'Apr 2021 – Jul 2021',
    description: `• Worked on building and improving their landing page with a focus on responsive design, performance, and SEO.
• Created custom components, optimized the site for faster loading, and ensured cross-device compatibility.`,
    tags: ['React.js', 'SEO', 'User Interface', 'Performance Optimization']
  },
  {
    type: 'internship',
    title: 'Web Development Intern',
    company: 'Coacco',
    location: 'India',
    date: 'May 2020 – Dec 2020',
    description: `• Worked on multiple frontend features and maintained consistent styling across internal tools.`,
    tags: ['HTML', 'CSS', 'Frontend', 'JS']
  },
  {
    type: 'education',
    title: 'Bachelor of Technology - Information Technology',
    company: 'Vellore Institute of Technology',
    location: 'India',
    date: '2018 – 2022',
    description: `• CGPA: 8.34
• Team representative & member of the core team - Cybersecurity COE`,
    tags: ['BTech', 'Leadership', 'Cybersecurity COE']
  }
];

const Experience: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'fulltime' | 'internship' | 'education'>('all');

  const filtered = filter === 'all'
    ? EXPERIENCE
    : EXPERIENCE.filter((e) => e.type === filter);

  return (
    <div className="p-4 text-sm text-gray-800 font-['Perfect DOS VGA 437'] bg-white h-full overflow-auto window-content">
      <div className="flex gap-2 mb-4 items-center">
        <span className="text-base font-bold">📁 Experience</span>
        <div className="ml-auto flex gap-2 text-xs">
          {(['all', 'fulltime', 'internship', 'education'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter === f ? 'bg-black text-white' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {f === 'all' && 'All'}
              {f === 'fulltime' && 'Full-time'}
              {f === 'internship' && 'Internship'}
              {f === 'education' && 'Education'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((exp, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sm">
                {exp.title} @ {exp.company}
              </span>
              <span className="text-xs text-gray-500 font-mono">{exp.date}</span>
            </div>
            <div className="text-[11px] italic text-gray-500 mb-2">{exp.location}</div>
            <p className="text-[13px] text-gray-700 whitespace-pre-line mb-2">{exp.description}</p>
            <div className="flex flex-wrap gap-1">
              {exp.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-800 px-2 py-[2px] text-[10px] rounded font-mono border border-gray-300 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
