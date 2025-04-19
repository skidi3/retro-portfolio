import React from 'react';
import Window from '../ui/Window';
import Terminal from '../apps/Terminal';
import Notepad from '../apps/Notepad';
import Explorer from '../apps/Explorer';
import MediaPlayer from '../apps/MediaPlayer';
import PacMan from '../apps/PacMan';
import RecycleBin from '../apps/RecycleBin';
import { useStore } from '../../store';

const WindowManager: React.FC = () => {
  const { windows, activeWindowId } = useStore();

  // Render component based on window type
  const renderWindowContent = (windowId: string) => {
    // If window has custom content, render that
    if (windows[windowId]?.content) {
      return windows[windowId].content;
    }

    // Otherwise render default app component
    switch (windowId) {
      case 'terminal':
        return <Terminal />;
      case 'notepad':
        return <Notepad />;
      case 'explorer':
        return <Explorer />;
      case 'mediaPlayer':
        return <MediaPlayer />;
      case 'pacman':
        return <PacMan />;
      case 'recycleBin':
        return <RecycleBin />;
      default:
        return <div>Window content not found</div>;
    }
  };

  return (
    <>
      {Object.entries(windows)
        .filter(([_, window]) => !window.minimized)
        .sort(([idA], [idB]) => {
          // Sort by z-index (active window last)
          return idA === activeWindowId ? 1 : idB === activeWindowId ? -1 : 0;
        })
        .map(([id, window]) => (
          <Window
            key={id}
            id={id}
            title={window.title}
            icon={window.icon}
            active={id === activeWindowId}
            position={window.position}
            size={window.size}
          >
            {renderWindowContent(id)}
          </Window>
        ))}
    </>
  );
};

export default WindowManager;