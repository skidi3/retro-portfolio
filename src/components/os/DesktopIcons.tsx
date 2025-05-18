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
      className="cursor-pointer select-none group flex flex-col items-center w-20 mb-6"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <img
        src={icon}
        alt={label}
        className="w-14 h-14 mb-1 drop-shadow-md group-hover:scale-105 transition-transform duration-150"
      />
      <div
        className="text-[13px] font-semibold text-center leading-tight"
        style={{
          backgroundColor: 'transparent',
          color: '#f5b63d',
          textShadow: '1px 1px 0 #6b3c0b',
          padding: '2px 0',
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

  return (
    <div
      className="absolute top-[50px] left-4 z-10"
      style={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateRows: 'repeat(auto-fill, minmax(90px, 1fr))',
        gridAutoColumns: 'min-content',
        maxHeight: 'calc(100vh - 140px)', // adjust based on topbar/taskbar height
        overflow: 'hidden',
        gap: '15px'
      }}
    >
      {[
        ['terminal', 'Terminal', '/icons/terminal.png'],
        ['notepad', 'Resume.pdf', '/icons/notepad.png'],
        ['mediaPlayer', 'Media Player', '/icons/media.png'],
        ['explorer', 'Projects', '/icons/projects.png'],
        ['pacman', 'Pac-Man', '/icons/pacman.png'],
        ['recycleBin', 'Recycle Bin', '/icons/recycle.png'],
        ['experience', 'Experience', '/icons/experience.png'],
      ].map(([id, label, icon]) => (
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
