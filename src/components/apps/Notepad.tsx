import React from 'react';
import { Download } from 'lucide-react';

const Notepad: React.FC = () => {
  const handleDownload = () => {
    window.open('https://drive.google.com/uc?export=download&id=1TdNka2suQVAD5rK9XmriGgobjBl4fkw9', '_blank');
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-2 bg-gray-100 border-b flex justify-end">
        {/* <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button> */}
      </div>
      <div className="flex-1 overflow-hidden">
        <iframe
          src="https://drive.google.com/file/d/1TdNka2suQVAD5rK9XmriGgobjBl4fkw9/preview"
          className="w-full h-full border-0"
          style={{
          }}
          allow="autoplay"
        />
      </div>
    </div>
  );
};

export default Notepad;