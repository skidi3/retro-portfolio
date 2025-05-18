
// Enhanced Explorer.tsx (entire file)
import React, { useState } from 'react';
import {
  FolderOpen,
  FileImage,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Laptop2,
} from 'lucide-react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

interface ProjectFile {
  id: string;
  name: string;
  type: 'file';
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface Project {
  id: string;
  name: string;
  description: string;
  category: 'work' | 'personal';
  files: ProjectFile[];
  content: React.ReactNode;
}

const Explorer: React.FC = () => {
  const { openWindow } = useStore();
  const { playSound } = useAudio();
  const [currentPath, setCurrentPath] = useState<string>('C:\\Projects');
  const [history, setHistory] = useState<string[]>(['C:\\Projects']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'work' | 'personal'>('all');

  const projects: Project[] = [
    {
      id: 'logiclens',
      name: 'LogicLens',
      description: 'AI-based LeetCode analytics platform',
      category: 'personal',
      files: Array.from({ length: 6 }, (_, i) => ({
        id: `logiclens-image-${i + 1}`,
        name: `Screenshot${i + 1}.png`,
        type: 'file',
        icon: <FileImage className="w-4 h-4 text-purple-500" />,
        content: (
          <div className="p-4">
            <img
              src={`/images/logiclens/screenshot${i + 1}.png`}
              alt={`Screenshot ${i + 1}`}
              className="w-full rounded shadow-md"
            />
          </div>
        ),
      })),
      content: (
        <div className="p-4 prose max-w-none text-sm text-gray-800">
          <p>
            LogicLens is your AI-powered DSA coach. Designed to transform the way developers approach LeetCode and competitive coding,
            it analyzes your submission history and generates deep insights—making every session smarter, faster, and more efficient.
          </p>
          <p>
            What began as a side project quickly gained traction, with over <strong>1000+ users</strong> across Chrome and Web, and <strong>99.9% uptime</strong> tracked live via UptimeRobot.
            It now powers mock interviews, error analysis, and personalized prep paths.
          </p>
          <h3 className="text-lg font-bold mt-6">Key Features</h3>
          <ul>
            <li>📊 Radar Chart analysis of core DSA strengths</li>
            <li>💡 AI-generated summaries of your most common logic errors</li>
            <li>🎙️ Mock Interview Simulator with audio assistant</li>
            <li>🧠 Real-time code feedback on LeetCode via Chrome Extension</li>
            <li>📈 Submission timeline for tracking streaks, setbacks, and bouncebacks</li>
          </ul>
          <h3 className="text-lg font-bold mt-6">Image Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
            {[1,2,3,4,5,6].map(i => (
              <img
                key={i}
                src={`/images/logiclens/screenshot${i}.png`}
                alt={`Screenshot ${i}`}
                className="w-full rounded shadow-md"
              />
            ))}
          </div>
          <h3 className="mt-6 text-lg font-bold">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'Node.js', 'Python', 'LeetCode API', 'TRON (Web3)', 'Chrome Extension', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs font-mono shadow">
                {tech}
              </span>
            ))}
          </div>
          <h3 className="mt-6 text-lg font-bold">Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-3 shadow">
              <p className="font-semibold">📈 1000+ Users</p>
              <p className="text-xs text-gray-500">Across Chrome + Web</p>
            </div>
            <div className="border rounded p-3 shadow">
              <p className="font-semibold">🟢 99.9% Uptime</p>
              <p className="text-xs text-gray-500">UptimeRobot monitored</p>
            </div>
          </div>
          <a
            href="https://logiclens.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded shadow transition"
          >
            🔗 Visit logiclens.org
          </a>
        </div>
      ),
    },
    {
      id: 'component-library',
      name: 'Reusable Component Library',
      description: 'Centralized design system with Storybook',
      category: 'work',
      files: [],
      content: (
        <div className="p-4 prose text-sm text-gray-800 max-w-none">
          <p>
            Developed a Storybook-driven UI library to eliminate duplicated frontend efforts across teams. Components were designed with themeability, accessibility, and flexibility in mind.
          </p>
          <ul>
            <li>📦 40+ reusable UI primitives & widgets</li>
            <li>🖍️ Theming support via tokens + CSS vars</li>
            <li>🚥 WCAG-compliant accessible components</li>
            <li>📚 Rich docs + live playground for every component</li>
          </ul>
          <h3>Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['Angular', 'Storybook', 'SCSS', 'Figma Specs', 'Jest'].map((t) => (
              <span key={t} className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs font-mono shadow">
                {t}
              </span>
            ))}
          </div>
          <h3 className="mt-4">Impact</h3>
          <ul>
            <li>👨‍💻 Adopted by 3+ teams across verticals</li>
            <li>🔁 Consistent UI across complex flows like onboarding & payments</li>
            <li>📦 Published on internal registry with CI/CD automation</li>
          </ul>
        </div>
      )
    }
,
{
  id: 'microfrontends-bajaj',
  name: 'Microfrontend Architecture',
  description: 'Webpack 5 + Angular-based modular platform',
  category: 'work',
  files: [],
  content: (
    <div className="p-4 prose text-sm text-gray-800 max-w-none">
      <p>
        Introduced and scaled a production-grade microfrontend architecture at Bajaj Finserv, enabling cross-team ownership and modular app releases.
      </p>
      <ul>
        <li>🔩 Shell/Remote architecture with independent deploys</li>
        <li>🧱 Shared UI & Auth modules served across 8+ apps</li>
        <li>⚙️ Version locking + rollout/rollback strategies</li>
      </ul>
      <h3>Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {['Angular', 'Webpack 5', 'Module Federation', 'Nx', 'TypeScript'].map((t) => (
          <span key={t} className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs font-mono shadow">
            {t}
          </span>
        ))}
      </div>
      <h3 className="mt-4">Impact</h3>
      <ul>
        <li>🚀 40% faster release cycles</li>
        <li>✅ 65% reduction in deployment failures</li>
        <li>📦 Modules published to internal registry for instant reuse</li>
      </ul>
    </div>
  )
}
,
{
  id: 'horizontal-surveys',
  name: 'Horizontal Surveys – Bajaj Finserv',
  description: 'No-code distributed survey platform (5M+ hits/day)',
  category: 'work',
  files: [],
  content: (
    <div className="p-4 prose text-sm text-gray-800 max-w-none">
      <p>
        Horizontal Surveys is a flagship internal platform at Bajaj Finserv built to empower PMO and business units to launch multilingual surveys at scale — without needing engineers.
      </p>
      <ul>
        <li>⚡ Upload-to-live NPS surveys in under 10 seconds</li>
        <li>🌐 Multi-language support via Excel ingestion</li>
        <li>📦 5M+ daily hits powered by a distributed Node.js backend</li>
        <li>🛡️ Load-balanced + fault-tolerant with zero downtime</li>
      </ul>
      <h3>Tech Stack</h3>
      <div className="flex flex-wrap gap-2">
        {['Angular', 'Node.js', 'Redis', 'Azure', 'Distributed Systems'].map((t) => (
          <span key={t} className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs font-mono shadow">
            {t}
          </span>
        ))}
      </div>
      <h3 className="mt-4">Impact</h3>
      <ul>
        <li>🧠 Reduced manual survey launch time from 1 day to 10 seconds</li>
        <li>📈 99.9% uptime across festive seasons</li>
        <li>💡 Enabled business teams to launch feedback campaigns with zero tech dependency</li>
      </ul>
    </div>
  )
}


  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const navigateBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setCurrentPath(history[historyIndex - 1]);
      playSound('click');
    }
  };

  const navigateForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setCurrentPath(history[historyIndex + 1]);
      playSound('click');
    }
  };

  const navigateToProject = (projectId: string) => {
    const newPath = `C:\\Projects\\${projectId}`;
    setCurrentPath(newPath);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newPath]);
    setHistoryIndex((prev) => prev + 1);
    playSound('click');
  };

  const renderContent = () => {
    if (currentPath === 'C:\\Projects') {
      return (
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs rounded \${filter === 'all' ? 'bg-black text-white' : 'bg-gray-300'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('personal')}
              className={`px-3 py-1 text-xs rounded \${filter === 'personal' ? 'bg-yellow-500 text-black' : 'bg-gray-300'}`}
            >
              <Laptop2 className="inline-block w-4 h-4 mr-1" />
              Personal
            </button>
            <button
              onClick={() => setFilter('work')}
              className={`px-3 py-1 text-xs rounded \${filter === 'work' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              <Briefcase className="inline-block w-4 h-4 mr-1" />
              Work
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer transition"
                onClick={() => navigateToProject(project.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <FolderOpen className="text-yellow-600" />
                  <span className="font-bold text-sm">{project.name}</span>
                </div>
                <p className="text-xs text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const projectId = currentPath.split('\\')[2];
    const project = projects.find((p) => p.id === projectId);
    if (!project) return <div className="p-4">Project not found</div>;

    return <div className="p-4">{project.content}</div>;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="bg-gray-200 p-2 border-b border-gray-400 flex items-center space-x-2">
        <button
          className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 flex items-center"
          onClick={navigateBack}
          disabled={historyIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <button
          className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 flex items-center"
          onClick={navigateForward}
          disabled={historyIndex === history.length - 1}
        >
          <ArrowRight className="w-4 h-4 mr-1" />
          Forward
        </button>
        <div className="mx-2 border-r border-gray-400 h-4" />
        <div className="text-sm flex-1">Address: {currentPath}</div>
      </div>

      <div className="flex-1 overflow-auto">{renderContent()}</div>

      <div className="bg-gray-200 p-1 border-t border-gray-400 text-xs">
        {currentPath === 'C:\\Projects'
          ? `${filteredProjects.length} project(s)`
          : 'Project details'}
      </div>
    </div>
  );
};

export default Explorer;
