import React, { useState } from 'react';
import Taskbar from './Taskbar';
import TopBar from './TopBar';
import DesktopIcons from './DesktopIcons';
import WindowManager from './WindowManager';
import ContextMenu from '../ui/ContextMenu';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Desktop: React.FC = () => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const { playSound } = useAudio();
  
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
    playSound();
  };
  
  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };
  
  const handleDesktopClick = (e: React.MouseEvent) => {
    if (contextMenu.visible) {
      handleCloseContextMenu();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <TopBar />
      <div className="flex-1 relative bg-gray-900 overflow-hidden">
        {/* Wallpaper */}
        <div className="absolute inset-0">
          <img 
            src="/textures/wallpaper.jpg"
            alt="Wallpaper"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/80" />
        </div>

        {/* Retro Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(90deg,_rgba(202,148,44,0.1)_1px,_transparent_1px)] bg-[length:40px_40px] opacity-20" />

        {/* Scanlines Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-10" />

        {/* Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ca942c] rounded-full opacity-5 blur-[100px]" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#ca942c] rounded-full opacity-5 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ca942c] rounded-full opacity-5 blur-[100px]" />
        </div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
        
        <div 
          className="relative w-full h-full"
          onContextMenu={handleContextMenu}
          onClick={handleDesktopClick}
        >
          <DesktopIcons />
          <WindowManager />
          
          {contextMenu.visible && (
            <ContextMenu 
              x={contextMenu.x} 
              y={contextMenu.y} 
              onClose={handleCloseContextMenu}
            />
          )}
        </div>
      </div>
      <Taskbar />
    </div>
  );
};

export default Desktop;