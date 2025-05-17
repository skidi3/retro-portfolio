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
            LogicLens is an AI-powered personal LeetCode coach. It analyzes your submissions, detects patterns,
            and builds a radar chart of your DSA skills across key topics.
          </p>
          <ul>
            <li>📊 Radar-based strength analysis</li>
            <li>💡 AI-generated error breakdowns</li>
            <li>🎙️ Mock interview pad with voice assistant</li>
            <li>🌐 Chrome extension for real-time feedback</li>
          </ul>

          <h3 className="mt-6 text-lg font-bold">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'Node.js', 'Python', 'LeetCode API', 'TRON (Web3)', 'Chrome Extension', 'Tailwind CSS'].map((t) => (
              <span key={t} className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs font-mono shadow">
                {t}
              </span>
            ))}
          </div>

          <h3 className="mt-6 text-lg font-bold">Stats</h3>
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
      id: 'retro-portfolio',
      name: 'Retro Portfolio OS',
      description: 'Windows 98-style interactive portfolio',
      category: 'personal',
      files: [],
      content: (
        <div className="p-4 prose text-sm text-gray-800 max-w-none">
          <p>
            This website itself is a portfolio disguised as a retro OS. Built using React + Zustand, it simulates
            draggable windows, boot screens, sound effects, and retro wallpaper with pixel icons.
          </p>
          <ul>
            <li>🖼️ Icon-based launcher system</li>
            <li>📁 File explorer + project viewer</li>
            <li>🎮 Built-in Pac-Man, Notepad, and Resume Viewer</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'horizontal-surveys',
      name: 'Horizontal Surveys – Bajaj Finserv',
      description: 'No-code distributed survey platform (5M+ hits/day)',
      category: 'work',
      files: [],
      content: (
        <div className="p-4 prose text-sm text-gray-800 max-w-none">
          <p>
            An internal no-code tool for business teams to deploy multilingual NPS surveys via Excel sheets. Surveys
            deployed in under 10 seconds using a distributed folder-based system.
          </p>
          <ul>
            <li>⚡ Upload-to-live in 10 seconds</li>
            <li>🌐 Multilingual support (vernacular Excel)</li>
            <li>📦 5M+ daily hits handled with zero downtime</li>
            <li>🧩 Built using Angular + Node.js</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'microfrontends-bajaj',
      name: 'Microfrontend Architecture',
      description: 'Webpack 5 + Angular-based modular platform',
      category: 'work',
      files: [],
      content: (
        <div className="p-4 prose text-sm text-gray-800 max-w-none">
          <p>
            Implemented module federation across teams at Bajaj Finserv to decouple releases, speed up deployment,
            and reduce bugs.
          </p>
          <ul>
            <li>🚀 40% faster deployment cycles</li>
            <li>🔩 Shell-remote MFE setup with version control</li>
            <li>📉 65% drop in release failures</li>
          </ul>
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
            Internal component library built for reuse across frontend teams. Documented in Storybook, with theme
            support and accessibility baked in.
          </p>
          <ul>
            <li>📦 40+ reusable components</li>
            <li>🖍️ Theming and accessibility support</li>
            <li>📚 Used across 3+ teams via npm publish</li>
          </ul>
        </div>
      ),
    },
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
              className={`px-3 py-1 text-xs rounded ${
                filter === 'all' ? 'bg-black text-white' : 'bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('personal')}
              className={`px-3 py-1 text-xs rounded ${
                filter === 'personal' ? 'bg-yellow-500 text-black' : 'bg-gray-300'
              }`}
            >
              <Laptop2 className="inline-block w-4 h-4 mr-1" />
              Personal
            </button>
            <button
              onClick={() => setFilter('work')}
              className={`px-3 py-1 text-xs rounded ${
                filter === 'work' ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
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
      {/* Top Toolbar */}
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

      {/* Main */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>

      {/* Bottom bar */}
      <div className="bg-gray-200 p-1 border-t border-gray-400 text-xs">
        {currentPath === 'C:\\Projects'
          ? `${filteredProjects.length} project(s)`
          : 'Project details'}
      </div>
    </div>
  );
};

export default Explorer;
