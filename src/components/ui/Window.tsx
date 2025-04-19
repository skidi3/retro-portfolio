import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Square } from 'lucide-react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';
import { IconType } from '../../types';

interface WindowProps {
  id: string;
  title: string;
  icon: IconType;
  active: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon: Icon,
  active,
  position,
  size,
  children
}) => {
  const { activateWindow, closeWindow, minimizeWindow, updateWindowPosition, updateWindowSize } = useStore();
  const { playSound } = useAudio();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({ position, size });
  
  // Store window dimensions
  useEffect(() => {
    if (!isMaximized) {
      setPreMaximizeState({ position, size });
    }
  }, [position, size, isMaximized]);
  
  // Activate window on click
  const handleWindowClick = () => {
    if (!active) {
      activateWindow(id);
      playSound('click');
    }
  };
  
  // Handle window controls
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('close');
    closeWindow(id);
  };
  
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('minimize');
    minimizeWindow(id);
  };
  
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSound('maximize');
    
    if (isMaximized) {
      // Restore previous state
      updateWindowPosition(id, preMaximizeState.position);
      updateWindowSize(id, preMaximizeState.size);
    } else {
      // Maximize window
      updateWindowPosition(id, { x: 0, y: 0 });
      updateWindowSize(id, {
        width: window.innerWidth,
        height: window.innerHeight - 40 // Account for taskbar
      });
    }
    setIsMaximized(!isMaximized);
  };
  
  // Handle drag start/end
  const handleDragStart = () => {
    if (isMaximized) return;
    activateWindow(id);
    setIsDragging(true);
    playSound('drag');
  };
  
  const handleDragStop = (_: any, data: { x: number; y: number }) => {
    if (isMaximized) return;
    setIsDragging(false);
    updateWindowPosition(id, { x: data.x, y: data.y });
    playSound('drop');
  };
  
  // Handle resize start/end
  const handleResizeStart = () => {
    if (isMaximized) return;
    activateWindow(id);
    setIsResizing(true);
    playSound('resize');
  };
  
  const handleResizeStop = (_: any, _direction: any, ref: HTMLElement, _delta: any, position: { x: number; y: number }) => {
    if (isMaximized) return;
    setIsResizing(false);
    updateWindowSize(id, { 
      width: parseInt(ref.style.width), 
      height: parseInt(ref.style.height) 
    });
    updateWindowPosition(id, position);
    playSound('drop');
  };

  return (
    <Rnd
      className={`${active ? 'z-30' : 'z-20'} ${isDragging ? 'cursor-grabbing' : ''}`}
      position={{ x: position.x, y: position.y }}
      size={{ width: size.width, height: size.height }}
      minWidth={200}
      minHeight={150}
      bounds="window"
      enableResizing={!isMaximized}
      disableDragging={isMaximized}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      onClick={handleWindowClick}
      dragHandleClassName="window-titlebar"
    >
      <div 
        className={`flex flex-col h-full rounded-t border ${
          active 
            ? 'border-blue-800 shadow-lg' 
            : 'border-gray-500 shadow'
        }`}
      >
        {/* Window title bar */}
        <div 
          className={`window-titlebar flex items-center justify-between px-2 py-1 ${
            active ? 'bg-blue-800 text-white' : 'bg-gray-500 text-gray-100'
          }`}
        >
          <div className="flex items-center">
            <Icon className="w-4 h-4 mr-2" />
            <div className="text-sm font-bold">{title}</div>
          </div>
          <div className="flex items-center">
            <button 
              className="p-1 hover:bg-gray-700 mr-1"
              onClick={handleMinimize}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button 
              className="p-1 hover:bg-gray-700 mr-1"
              onClick={handleMaximize}
            >
              <Square className="w-3 h-3" />
            </button>
            <button 
              className="p-1 hover:bg-red-700"
              onClick={handleClose}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        {/* Window content */}
        <div className="flex-1 bg-gray-200 overflow-auto">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;