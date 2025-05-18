import React, { useState } from 'react';
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
    } else {
      updateWindowSize(id, prevSize);
      updateWindowPosition(id, prevPosition);
    }
  };

  const windowClass = `window ${active ? 'z-50' : 'z-40'}`;

  const WindowContent = (
    <div
      className={windowClass}
      style={
        isMaximized
          ? {
              position: 'fixed',
              top: TOPBAR_HEIGHT,
              left: 0,
              width: '100vw',
              height: `calc(100vh - ${TOPBAR_HEIGHT + TASKBAR_HEIGHT}px)`,
            }
          : {
              width: size.width,
              height: size.height,
              position: 'absolute',
              top: position.y,
              left: position.x,
            }
      }
      onMouseDown={() => activateWindow(id)}
    >
      <div className="window-title-bar flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} />}
          <span className="font-bold">{title}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => minimizeWindow(id)}
            className="px-1 text-xs border bg-teal-400 hover:bg-teal-800"
          >
            −
          </button>
          <button
            onClick={toggleMaximize}
            className="px-1 text-xs border bg-yellow-400 hover:bg-yellow-800"
          >
            □
          </button>
          <button
            onClick={() => closeWindow(id)}
            className="px-1 text-xs border bg-red-400 hover:bg-red-800"
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

  return isMaximized ? WindowContent : (
    <Draggable
    handle=".window-title-bar"
    position={{ x: position.x, y: position.y }}
    onStop={(_, data) => updateWindowPosition(id, { x: data.x, y: data.y })}
  >
    {WindowContent}
  </Draggable>
  )
};

export default Window;
