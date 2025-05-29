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
      className="cursor-pointer select-none group flex flex-col items-center w-[120px] h-[120px] hover:bg-white/10 rounded p-2"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="relative">
        <img
          src={icon}
          alt={label}
          className="w-20 h-20 mb-2 drop-shadow-lg group-hover:scale-105 transition-transform duration-150"
        />
        {/* Windows XP style shortcut arrow */}
<div className="absolute left-0 bottom-2 w-5 h-5 flex items-center justify-center shadow-md bg-white p-[.1rem]">
<img src="/icons/shortcut.png" alt="shortcut icon" />
</div>
      </div>
      <div
        className="text-[15px] text-center leading-tight px-1 max-w-full break-words"
        style={{
          backgroundColor: 'transparent',
          color: '#fff',
          textShadow: '2px 2px 0 #6b3c0b, -1px -1px 0 #6b3c0b, 1px -1px 0 #6b3c0b, -1px 1px 0 #6b3c0b',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const DesktopIcons: React.FC = () => {
  const { openWindow } = useStore();
  const { playSound } = useAudio();

  const handleIconClick = (id: string) => {
    playSound('click');
    openWindow(id);
  };

  const handleIconDoubleClick = (id: string) => {
    playSound('doubleClick');
    openWindow(id);
  };

  const icons = [
    ['terminal', 'Terminal', '/icons/terminal.png'],
    ['notepad', 'Resume.pdf', '/icons/notepad.png'],
    ['mediaPlayer', 'Media Player', '/icons/media.png'],
    ['explorer', 'Projects', '/icons/projects.png'],
    ['recycleBin', 'Recycle Bin', '/icons/recycle.png'],
    ['experience', 'Experience', '/icons/experience.png'],
    ['findme', 'Find Me', '/icons/find-me.png'],
    ['blog', 'Blogs', '/icons/blog.png'],
    ['pitch', 'Pitch', '/icons/pitch.png'],
  ];

  // Calculate the number of rows based on viewport height
  const maxRows = Math.floor((window.innerHeight - 96) / 120);

  return (
    <div 
      className="absolute top-10 left-2 grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${Math.ceil(icons.length / maxRows)}, 120px)`,
        gridTemplateRows: `repeat(${maxRows}, 120px)`,
        gridAutoFlow: 'column',
        maxHeight: 'calc(100vh - 96px)', // Account for top and bottom bars
      }}
    >
      {icons.map(([id, label, icon]) => (
        <DesktopIcon
          key={id}
          icon={icon}
          label={label}
          onClick={() => handleIconClick(id)}
          onDoubleClick={() => handleIconDoubleClick(id)}
        />
      ))}
    </div>
  );
};

export default DesktopIcons;
