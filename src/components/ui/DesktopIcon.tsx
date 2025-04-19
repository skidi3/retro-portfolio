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
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded flex items-center justify-center mb-1">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-white text-xs font-pixel px-1 py-0.5 bg-blue-900 bg-opacity-50">
        {label}
      </div>
    </div>
  );
};

export default DesktopIcon;