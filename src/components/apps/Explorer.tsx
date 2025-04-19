import React, { useState } from 'react';
import { 
  FolderOpen, 
  FileText, 
  FileImage,
  Link,
  ArrowLeft,
  ArrowRight
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
  files: ProjectFile[];
}

const Explorer: React.FC = () => {
  const { openWindow } = useStore();
  const { playSound } = useAudio();
  const [currentPath, setCurrentPath] = useState<string>('C:\\Projects');
  const [history, setHistory] = useState<string[]>(['C:\\Projects']);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Project data
  const projects: Project[] = [
    {
      id: 'ecommerce',
      name: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform',
      files: [
        {
          id: 'ecommerce-preview',
          name: 'Preview.png',
          type: 'file',
          icon: <FileImage className="w-4 h-4 text-purple-500" />,
          content: (
            <div className="p-4">
              <img 
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="E-Commerce Project"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold">E-Commerce Platform</h2>
                <p className="mt-2 text-gray-600">A full-featured online shopping platform built with modern technologies.</p>
                <div className="mt-4">
                  <h3 className="font-bold">Key Features:</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    <li>User authentication and profiles</li>
                    <li>Product catalog with search and filters</li>
                    <li>Shopping cart and checkout system</li>
                    <li>Order tracking and history</li>
                    <li>Admin dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          id: 'ecommerce-docs',
          name: 'Documentation.md',
          type: 'file',
          icon: <FileText className="w-4 h-4 text-blue-500" />,
          content: (
            <div className="p-4 prose">
              <h1>E-Commerce Platform Documentation</h1>
              <p>Technical documentation for the e-commerce platform implementation.</p>
              <h2>Architecture</h2>
              <ul>
                <li>Frontend: React with TypeScript</li>
                <li>Backend: Node.js with Express</li>
                <li>Database: PostgreSQL</li>
                <li>Authentication: JWT</li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      id: 'social-app',
      name: 'Social Network App',
      description: 'A modern social platform',
      files: [
        {
          id: 'social-preview',
          name: 'Preview.png',
          type: 'file',
          icon: <FileImage className="w-4 h-4 text-purple-500" />,
          content: (
            <div className="p-4">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Social Network Project"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold">Social Network Application</h2>
                <p className="mt-2 text-gray-600">A modern social platform with real-time features.</p>
                <div className="mt-4">
                  <h3 className="font-bold">Features:</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    <li>Real-time chat and notifications</li>
                    <li>News feed with infinite scroll</li>
                    <li>Photo and video sharing</li>
                    <li>Friend recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    },
    {
      id: 'fitness-app',
      name: 'Fitness Tracker',
      description: 'Mobile fitness tracking application',
      files: [
        {
          id: 'fitness-preview',
          name: 'Preview.png',
          type: 'file',
          icon: <FileImage className="w-4 h-4 text-purple-500" />,
          content: (
            <div className="p-4">
              <img 
                src="https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Fitness App"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-bold">Fitness Tracking App</h2>
                <p className="mt-2 text-gray-600">Mobile application for tracking workouts and nutrition.</p>
                <div className="mt-4">
                  <h3 className="font-bold">Features:</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    <li>Workout planning and tracking</li>
                    <li>Nutrition logging</li>
                    <li>Progress analytics</li>
                    <li>Social features</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ];
  
  // Navigation functions
  const navigateBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setCurrentPath(history[historyIndex - 1]);
      playSound('click');
    }
  };
  
  const navigateForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setCurrentPath(history[historyIndex + 1]);
      playSound('click');
    }
  };
  
  const navigateToProject = (projectId: string) => {
    const newPath = `C:\\Projects\\${projectId}`;
    setCurrentPath(newPath);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newPath]);
    setHistoryIndex(prev => prev + 1);
    playSound('click');
  };
  
  // Handle file click
  const handleFileClick = (file: ProjectFile) => {
    playSound('click');
    openWindow('viewer', {
      title: file.name,
      content: file.content
    });
  };
  
  // Render content based on current path
  const renderContent = () => {
    if (currentPath === 'C:\\Projects') {
      return (
        <div className="grid grid-cols-3 gap-4 p-4">
          {projects.map(project => (
            <div 
              key={project.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer"
              onClick={() => navigateToProject(project.id)}
            >
              <div className="flex items-center mb-2">
                <FolderOpen className="w-6 h-6 text-yellow-600 mr-2" />
                <div className="font-bold">{project.name}</div>
              </div>
              <div className="text-sm text-gray-600">{project.description}</div>
            </div>
          ))}
        </div>
      );
    } else {
      const projectId = currentPath.split('\\')[2];
      const project = projects.find(p => p.id === projectId);
      
      if (!project) return <div>Project not found</div>;
      
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{project.name}</h2>
          <div className="grid grid-cols-4 gap-4">
            {project.files.map(file => (
              <div 
                key={file.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer"
                onClick={() => handleFileClick(file)}
              >
                <div className="flex items-center">
                  {file.icon}
                  <div className="ml-2 text-sm">{file.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
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
        <div className="mx-2 border-r border-gray-400 h-4"></div>
        <div className="text-sm flex-1">
          Address: {currentPath}
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
      
      {/* Status bar */}
      <div className="bg-gray-200 p-1 border-t border-gray-400 text-xs">
        {currentPath === 'C:\\Projects' ? '3 projects' : 'Project files'}
      </div>
    </div>
  );
};

export default Explorer;