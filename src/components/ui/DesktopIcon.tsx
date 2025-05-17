import React from 'react';
import { IconType } from '../../types';

interface DesktopIconProps {
  icon: IconType;
  label: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  icon: Icon,
  label,
  onClick,
  onDoubleClick,
}) => {
  return (
    <div 
      className="w-20 flex flex-col items-center text-center cursor-pointer select-none"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="w-12 h-12  bg-opacity-20 rounded flex items-center justify-center mb-1">
        <Icon className="w-8 h-8" />
      </div>
      <div
  className="text-[11px] font-[Perfect DOS VGA 437] leading-none"
  style={{
    color: '#f5b63d',
    background: 'transparent',
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

export default DesktopIcon;