import React, { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import DesktopIcons from './DesktopIcons';
import WindowManager from './WindowManager';
import ContextMenu from '../ui/ContextMenu';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Desktop: React.FC = () => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [showScreensaver, setShowScreensaver] = useState(false);
  const { playSound } = useAudio();
  const { windows, activeWindowId } = useStore();
  
  // Idle timer for screensaver
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setShowScreensaver(false);
      idleTimer = setTimeout(() => {
        setShowScreensaver(true);
      }, 60000); // 1 minute for demo purposes
    };
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer);
    });
    
    resetIdleTimer();
    
    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, []);
  
  // Context menu handling
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
  
  // Click handler to close context menu when clicking elsewhere
  const handleDesktopClick = (e: React.MouseEvent) => {
    if (contextMenu.visible) {
      handleCloseContextMenu();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Desktop background */}
      <div className="flex-1 relative bg-teal-800 overflow-hidden">
        {/* Wallpaper */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Desktop Wallpaper"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 to-blue-900 opacity-50" />
        </div>
        
        {/* Desktop content */}
        <div 
          className="relative w-full h-full"
          onContextMenu={handleContextMenu}
          onClick={handleDesktopClick}
        >
          {/* Desktop icons */}
          <DesktopIcons />
          
          {/* Windows */}
          <WindowManager />
          
          {/* Context menu */}
          {contextMenu.visible && (
            <ContextMenu 
              x={contextMenu.x} 
              y={contextMenu.y} 
              onClose={handleCloseContextMenu}
            />
          )}
        </div>
        
        {/* Screensaver */}
        {showScreensaver && (
          <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
            <div className="text-green-500 font-mono text-4xl animate-pulse">
              MATRIX SCREENSAVER
            </div>
          </div>
        )}
      </div>
      
      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Desktop;