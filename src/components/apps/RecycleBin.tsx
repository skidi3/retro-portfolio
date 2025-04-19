import React from 'react';
import { Trash2 } from 'lucide-react';

interface FailedProject {
  id: string;
  name: string;
  date: string;
  description: string;
  reason: string;
  lesson: string;
  image: string;
}

const RecycleBin: React.FC = () => {
  const failedProjects: FailedProject[] = [
    {
      id: '1',
      name: 'Quantum OS',
      date: '2023-05-15',
      description: 'An operating system built entirely in JavaScript',
      reason: 'Turned out browsers already have operating systems built in...',
      lesson: 'Research the problem space before diving into ambitious projects',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      name: 'CoffeeScript 2.0',
      date: '2022-02-10',
      description: 'A better way to write JavaScript',
      reason: 'TypeScript already exists and is amazing',
      lesson: 'Don\'t reinvent the wheel unless you can make it significantly rounder',
      image: 'https://images.pexels.com/photos/4397899/pexels-photo-4397899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '3',
      name: 'BlockPay',
      date: '2021-11-04',
      description: 'Blockchain payment solution for coffee shops',
      reason: 'Nobody wanted to wait 10 minutes for a transaction to confirm their latte',
      lesson: 'Consider practical user needs and real-world constraints',
      image: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '4',
      name: 'DeveloperMatch',
      date: '2021-03-22',
      description: 'Tinder but for finding project collaborators',
      reason: 'Turns out GitHub is already a thing',
      lesson: 'Study existing competition carefully before building a new product',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '5',
      name: 'AI Code Reviewer',
      date: '2022-08-17',
      description: 'AI that gives honest feedback on your code',
      reason: 'The AI was too honest and hurt everyone\'s feelings',
      lesson: 'Sometimes brutal honesty is not the best approach for feedback systems',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 to-black text-green-500 font-mono">
      {/* Header */}
      <div className="bg-black bg-opacity-50 p-4 border-b border-green-500 flex items-center">
        <Trash2 className="w-6 h-6 mr-2" />
        <div className="text-xl font-bold animate-pulse">RECYCLE.BIN</div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold mb-2">Failed & Funny Projects</div>
          <div className="text-sm opacity-70">
            Even the most successful developers have projects that didn't quite work out
          </div>
        </div>
        
        <div className="space-y-6">
          {failedProjects.map(project => (
            <div 
              key={project.id}
              className="border border-green-500 rounded bg-black bg-opacity-50 overflow-hidden hover:border-green-400 transition-colors"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-end">
                    <div className="text-xl font-bold">{project.name}</div>
                    <div className="text-sm opacity-70">{project.date}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="text-gray-300">
                  {project.description}
                </div>
                
                <div className="bg-red-900 bg-opacity-20 border-l-4 border-red-500 p-3">
                  <div className="font-bold mb-1">FATAL ERROR:</div>
                  <div className="opacity-90">{project.reason}</div>
                </div>
                
                <div className="bg-green-900 bg-opacity-20 border-l-4 border-green-500 p-3">
                  <div className="font-bold mb-1">DEBUG LOG:</div>
                  <div className="opacity-90">{project.lesson}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-6 border border-green-500 rounded text-center bg-black bg-opacity-50">
          <div className="text-2xl mb-3 font-bold">SYSTEM.MSG</div>
          <div className="italic opacity-80">
            "Failure is simply the opportunity to begin again, this time more intelligently."
          </div>
          <div className="text-sm mt-2 opacity-60">
            - Henry Ford
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-black bg-opacity-50 p-2 border-t border-green-500 text-sm">
        <span className="animate-pulse">█</span> 5 deleted items | 1.21 GB free space
      </div>
    </div>
  );
};

export default RecycleBin;