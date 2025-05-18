import React from 'react';
import { Download } from 'lucide-react';

const Notepad: React.FC = () => {
  const handleDownload = () => {
    window.open('https://drive.google.com/uc?export=download&id=1TdNka2suQVAD5rK9XmriGgobjBl4fkw9', '_blank');
  };

  return (
    <div className="relative w-full h-full font-['Manrope'] text-white">
      {/* Grid background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')`,
          backgroundSize: '64px',
          backgroundRepeat: 'repeat',
          opacity: 0.08,
        }}
      />

      {/* Window Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Toolbar */}
        <div className="bg-gray-400 text-white border-b border-yellow-400 px-4 py-2 flex justify-between items-center">
          <div className="text-sm font-semibold opacity-0">📄 Resume.pdf</div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-xs px-3 py-1 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
          >
            <Download size={14} />
            Save
          </button>
        </div>

        {/* Embedded PDF */}
        <div className="flex-1 bg-black overflow-hidden">
          <iframe
            src="https://drive.google.com/file/d/1TdNka2suQVAD5rK9XmriGgobjBl4fkw9/preview"
            className="w-full h-full border-0"
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};

export default Notepad;
