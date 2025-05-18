import React from 'react';
import { Trash2 } from 'lucide-react';

const RecycleBin: React.FC = () => {
  return (
    <div className="h-full w-full relative text-white font-['Manrope'] text-sm">
      {/* Background Grid Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')`,
          backgroundSize: '64px',
          backgroundRepeat: 'repeat',
          opacity: 0.08,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-center">
        <Trash2 className="w-10 h-10 text-gray-400 mb-4" />
        <h1 className="text-2xl font-extrabold text-white mb-2">Recycle Bin</h1>
        <p className="text-white/60 text-base">Nothing to delete... yet.</p>
      </div>
    </div>
  );
};

export default RecycleBin;
