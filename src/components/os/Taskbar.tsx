import React, { useState } from 'react';
import { Monitor, Power } from 'lucide-react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Taskbar: React.FC = () => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const { windows, activeWindowId, minimizeWindow, activateWindow, openWindow } = useStore();
  const { playSound } = useAudio();

  const toggleStartMenu = () => {
    playSound('click');
    setShowStartMenu(prev => !prev);
  };

  const handleStartMenuItem = (action: string) => {
    playSound('click');
    setShowStartMenu(false);
    switch (action) {
      case 'terminal':
        openWindow('terminal');
        break;
      case 'explorer':
        openWindow('explorer');
        break;
      case 'media':
        openWindow('mediaPlayer');
        break;
      case 'games':
        openWindow('pacman');
        break;
      case 'shutdown':
        document.body.style.transition = 'opacity 1s';
        document.body.style.opacity = '0';
        setTimeout(() => window.location.reload(), 1000);
        break;
    }
  };

  const handleTaskbarItemClick = (id: string) => {
    playSound('click');
    if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      activateWindow(id);
    }
  };

  return (
    <>
      {/* Taskbar */}
      <div className="taskbar fixed bottom-0 left-0 right-0 z-40 h-10 flex items-center px-2 shadow-md">
        {/* Start button */}
        <button
          className={`taskbar-button flex items-center gap-2 ${showStartMenu ? 'bg-blue-800 text-white' : ''}`}
          onClick={toggleStartMenu}
        >
          <Monitor className="w-4 h-4" />
          <span className="text-sm font-bold">Start</span>
        </button>

        {/* Running Windows */}
        <div className="flex-1 flex gap-1 overflow-x-auto ml-2 h-full">
          {Object.entries(windows).map(([id, win]) => (
            <button
              key={id}
              className={`taskbar-button flex items-center gap-2 px-2 truncate ${
                activeWindowId === id ? 'bg-blue-800 text-white' : ''
              }`}
              onClick={() => handleTaskbarItemClick(id)}
            >
              <win.icon className="w-4 h-4" />
              <span className="text-sm truncate">{win.title}</span>
            </button>
          ))}
        </div>

        {/* Clock */}
        <div className="text-sm px-2 font-mono">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div className="absolute bottom-10 left-2 w-56 bg-gray-300 border border-black shadow-xl z-50">
          <div className="bg-blue-900 text-white font-bold px-3 py-2">
            RetroOS Portfolio
          </div>
          <div className="p-2 space-y-1">
            {[
              { id: 'terminal', label: 'Terminal' },
              { id: 'explorer', label: 'File Explorer' },
              { id: 'media', label: 'Media Player' },
              { id: 'games', label: 'Games' }
            ].map(({ id, label }) => (
              <button
                key={id}
                className="w-full text-left px-3 py-1 text-sm hover:bg-blue-800 hover:text-white rounded"
                onClick={() => handleStartMenuItem(id)}
              >
                {label}
              </button>
            ))}
            <div className="border-t border-gray-500 my-1" />
            <button
              className="w-full text-left px-3 py-1 text-sm text-red-700 hover:bg-red-800 hover:text-white rounded flex items-center gap-2"
              onClick={() => handleStartMenuItem('shutdown')}
            >
              <Power className="w-4 h-4" />
              Shut Down
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Taskbar;
