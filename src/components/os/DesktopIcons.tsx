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
      className="desktop-icon cursor-pointer select-none group"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <img src={icon} alt={label} className="w-10 h-10 mx-auto mb-1" />
      <div
  className="text-[11px] font-[Perfect DOS VGA 437] leading-none"
  style={{
    backgroundColor: 'transparent',
    color: '#f5b63d',
    textShadow: '1px 1px 0 #6b3c0b',
    padding: '2px 0',
    marginTop: '2px',
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
    <div className="absolute top-10 left-2 flex flex-col gap-6 z-10">
      {[
        ['terminal', 'Terminal', '/icons/terminal.png'],
        ['notepad', 'Resume.pdf', '/icons/notepad.png'],
        ['mediaPlayer', 'Media Player', '/icons/media.png'],
        ['explorer', 'Projects', '/icons/projects.png'],
        ['pacman', 'Pac-Man', '/icons/pacman.png'],
        ['recycleBin', 'Recycle Bin', '/icons/recycle.png'],
        ['experience', 'Experience', '/icons/experience.png']

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
