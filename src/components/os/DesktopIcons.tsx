import React from 'react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon,
  label,
  onClick,
  onDoubleClick,
}) => {
  return (
    <div 
      className="w-24 flex flex-col items-center text-center cursor-pointer select-none group"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
        <img src={`/icons/${icon}`} alt={label} className="w-full h-full" />
      </div>
      <div className="text-white text-xs font-pixel px-2 py-1 bg-blue-900 bg-opacity-50 group-hover:bg-blue-800 rounded">
        {label}
      </div>
    </div>
  );
};

const DesktopIcons: React.FC = () => {
  const { openWindow } = useStore();
  const { playSound } = useAudio();
  
  const handleIconClick = (appId: string) => {
    playSound('click');
    openWindow(appId);
  };
  
  const handleIconDoubleClick = (appId: string) => {
    playSound('doubleClick');
    openWindow(appId);
  };

  return (
    <div className="absolute top-4 left-4 grid grid-cols-1 gap-6">
      <DesktopIcon 
        icon="terminal.png"
        label="Terminal"
        onClick={() => handleIconClick('terminal')}
        onDoubleClick={() => handleIconDoubleClick('terminal')}
      />
      
      <DesktopIcon 
        icon="notepad.png"
        label="Resume.txt"
        onClick={() => handleIconClick('notepad')}
        onDoubleClick={() => handleIconDoubleClick('notepad')}
      />
      
      <DesktopIcon 
        icon="projects.png"
        label="Projects"
        onClick={() => handleIconClick('explorer')}
        onDoubleClick={() => handleIconDoubleClick('explorer')}
      />
      
      <DesktopIcon 
        icon="media.png"
        label="Media Player"
        onClick={() => handleIconClick('mediaPlayer')}
        onDoubleClick={() => handleIconDoubleClick('mediaPlayer')}
      />
      
      <DesktopIcon 
        icon="pacman.png"
        label="Pac-Man"
        onClick={() => handleIconClick('pacman')}
        onDoubleClick={() => handleIconDoubleClick('pacman')}
      />
      
      <DesktopIcon 
        icon="recycle.png"
        label="Recycle Bin"
        onClick={() => handleIconClick('recycleBin')}
        onDoubleClick={() => handleIconDoubleClick('recycleBin')}
      />
    </div>
  );
};

export default DesktopIcons;