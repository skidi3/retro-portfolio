import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { useStore } from '../../store';

interface WindowProps {
  id: string;
  title: string;
  icon: any;
  active: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  children: React.ReactNode;
}

const TOPBAR_HEIGHT = 40;
const TASKBAR_HEIGHT = 40;

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon: Icon,
  active,
  position,
  size,
  children,
}) => {
  const {
    closeWindow,
    minimizeWindow,
    activateWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useStore();

  const [isMaximized, setIsMaximized] = useState(false);
  const [prevSize, setPrevSize] = useState(size);
  const [prevPosition, setPrevPosition] = useState(position);
  const nodeRef = useRef(null);

  const toggleMaximize = () => {
    const next = !isMaximized;
    setIsMaximized(next);

    if (next) {
      setPrevSize(size);
      setPrevPosition(position);

      updateWindowSize(id, {
        width: window.innerWidth,
        height: window.innerHeight - TOPBAR_HEIGHT - TASKBAR_HEIGHT,
      });
      updateWindowPosition(id, { x: 0, y: TOPBAR_HEIGHT });
    } else {
      updateWindowSize(id, prevSize);
      updateWindowPosition(id, prevPosition);
    }
  };

  const handleDragStart = () => {
    if (!active) {
      activateWindow(id);
    }
  };

  const handleDragStop = (_e: any, data: { x: number; y: number }) => {
    updateWindowPosition(id, { x: data.x, y: data.y });
  };

  const windowClass = `window ${active ? 'z-50' : 'z-40'} bg-gray-800 rounded-lg shadow-xl border border-gray-700`;

  const WindowContent = (
    <div
      ref={nodeRef}
      className={windowClass}
      style={{
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? `calc(100vh - ${TOPBAR_HEIGHT + TASKBAR_HEIGHT}px)` : size.height,
        position: 'absolute',
        touchAction: 'none'
      }}
      onMouseDown={() => activateWindow(id)}
    >
      <div className="window-title-bar flex justify-between items-center px-2 h-6 bg-gray-700 rounded-t-lg cursor-move">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-gray-300" />}
          <span className="font-bold text-sm text-gray-200">{title}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => minimizeWindow(id)}
            className="px-2 py-0.5 text-xs hover:bg-gray-600 rounded"
          >
            −
          </button>
          <button
            onClick={toggleMaximize}
            className="px-2 py-0.5 text-xs hover:bg-gray-600 rounded"
          >
            □
          </button>
          <button
            onClick={() => closeWindow(id)}
            className="px-2 py-0.5 text-xs hover:bg-red-600 rounded"
          >
            ×
          </button>
        </div>
      </div>

      <div className="window-content overflow-auto" style={{ height: 'calc(100% - 24px)' }}>
        {children}
      </div>
    </div>
  );

  return isMaximized ? (
    WindowContent
  ) : (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-title-bar"
      defaultPosition={position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      cancel="button"
    >
      {WindowContent}
    </Draggable>
  );
};

export default Window;
