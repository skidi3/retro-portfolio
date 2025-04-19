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

  useEffect(() => {
    if (!isMaximized) {
      setPreMaximizeState({ position, size });
    }
  }, [position, size, isMaximized]);

  const handleWindowClick = () => {
    if (!active) {
      activateWindow(id);
      playSound('click');
    }
  };

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
      updateWindowPosition(id, preMaximizeState.position);
      updateWindowSize(id, preMaximizeState.size);
    } else {
      updateWindowPosition(id, { x: 0, y: 0 });
      updateWindowSize(id, {
        width: window.innerWidth,
        height: window.innerHeight - 40
      });
    }
    setIsMaximized(!isMaximized);
  };

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
        className={`flex flex-col h-full rounded-lg overflow-hidden backdrop-blur-md ${
          active 
            ? 'shadow-2xl shadow-black/20 border border-[#ca942c]/20' 
            : 'shadow-xl border border-white/10'
        }`}
      >
        <div 
          className={`window-titlebar flex items-center justify-between px-3 py-2 ${
            active 
              ? 'bg-[#ca942c] bg-[url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TtSIVBTuIOGSoThZERRy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoA4OTopukiJ/0sKLWI8OO7Hu3uPu3eAUC8zzeoYBzTdNlOJuJjJroqhVwQxghDiiMjM1OckKQXf8XWPAF/vYjzL/9yfo1fNWQwIiMSzzDBt4g3i6U3b4LxPHGFFWSU+Jx4z6YLEj1xXPH7jXHBZ4JkRM52aJ44Qi4U2VtqYFU2NeIo4qmo65QsZj1XOW5y1cpU178lfGM7pK8tcpzmEBBaxBIk6UlBFCWW0UYONOl0nxUKKznE//oGrT4GcUqg0YODgMRqGwC93/5+9u7UwMeEmBWJA94ttf4wAoV2g0bLt72Pbbp0A/mfgSuv4a02g+Et6ra0FHwCD28DFdVuT94DLHWDwSZcMyZH8NIVCAXg/o2/KAYNboHfN7a21j9MHIENdLd0AB4fASJGy133e3d3Z279nWv39AFlNcp0UUpxCAAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+ULHhQMEwQr/aYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAFElEQVRo3u3BAQ0AAADCoPdPbQ43oAAAAAAAfgwNOgABa5xH6wAAAABJRU5ErkJggg==\')]' 
              : 'bg-gray-800'
          } text-black`}
        >
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4" />
            <div className="text-sm font-medium">{title}</div>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              className="p-1 hover:bg-black/20 rounded transition-colors"
              onClick={handleMinimize}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button 
              className="p-1 hover:bg-black/20 rounded transition-colors"
              onClick={handleMaximize}
            >
              <Square className="w-3.5 h-3.5" />
            </button>
            <button 
              className="p-1 hover:bg-red-900/30 rounded transition-colors"
              onClick={handleClose}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-gray-900/90 overflow-auto">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;