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
      <div className="w-16 h-16 flex items-center justify-center mb-1">
        <img src={icon} alt={label} className="w-12 h-12" />
      </div>
      <div className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-[#ca942c]/20 shadow-lg text-[#ca942c] text-xs font-medium group-hover:bg-[#ca942c]/20 group-hover:text-white transition-all duration-300">
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
        icon="/icons/terminal.png"
        label="Terminal"
        onClick={() => handleIconClick('terminal')}
        onDoubleClick={() => handleIconDoubleClick('terminal')}
      />
      
      <DesktopIcon 
        icon="/icons/notepad.png"
        label="Resume.txt"
        onClick={() => handleIconClick('notepad')}
        onDoubleClick={() => handleIconDoubleClick('notepad')}
      />
      
      <DesktopIcon 
        icon="/icons/projects.png"
        label="Projects"
        onClick={() => handleIconClick('explorer')}
        onDoubleClick={() => handleIconDoubleClick('explorer')}
      />
      
      <DesktopIcon 
        icon="/icons/media.png"
        label="Media Player"
        onClick={() => handleIconClick('mediaPlayer')}
        onDoubleClick={() => handleIconDoubleClick('mediaPlayer')}
      />
      
      <DesktopIcon 
        icon="/icons/pacman.png"
        label="Pac-Man"
        onClick={() => handleIconClick('pacman')}
        onDoubleClick={() => handleIconDoubleClick('pacman')}
      />
      
      <DesktopIcon 
        icon="/icons/recycle.png"
        label="Recycle Bin"
        onClick={() => handleIconClick('recycleBin')}
        onDoubleClick={() => handleIconDoubleClick('recycleBin')}
      />
    </div>
  );
};

export default DesktopIcons;