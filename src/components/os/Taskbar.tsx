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
    setShowStartMenu(!showStartMenu);
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
    <div className="h-12 bg-[#ca942c] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TtSIVBTuIOGSoThZERRy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoA4OTopukiJ/0sKLWI8OO7Hu3uPu3eAUC8zzeoYBzTdNlOJuJjJroqhVwQxghDiiMjM1OckKQXf8XWPAF/vYjzL/9yfo1fNWQwIiMSzzDBt4g3i6U3b4LxPHGFFWSU+Jx4z6YLEj1xXPH7jXHBZ4JkRM52aJ44Qi4U2VtqYFU2NeIo4qmo65QsZj1XOW5y1cpU178lfGM7pK8tcpzmEBBaxBIk6UlBFCWW0UYONOl0nxUKKznE//oGrT4GcUqg0YODgMRqGwC93/5+9u7UwMeEmBWJA94ttf4wAoV2g0bLt72Pbbp0A/mfgSuv4a02g+Et6ra0FHwCD28DFdVuT94DLHWDwSZcMyZH8NIVCAXg/o2/KAYNboHfN7a21j9MHIENdLd0AB4fASJGy133e3d3Z279nWv39AFlNcp0UUpxCAAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+ULHhQMEwQr/aYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAFElEQVRo3u3BAQ0AAADCoPdPbQ43oAAAAAAAfgwNOgABa5xH6wAAAABJRU5ErkJggg==')] shadow-lg flex items-center px-2 z-40">
      {/* Start button */}
      <button 
        className={`px-4 h-8 font-medium flex items-center space-x-2 rounded ${
          showStartMenu ? 'bg-black/30' : 'hover:bg-black/20'
        } transition-colors`}
        onClick={toggleStartMenu}
      >
        <Monitor className="w-4 h-4" />
        <span>Start</span>
      </button>
      
      {/* Start menu */}
      {showStartMenu && (
        <div className="absolute bottom-12 left-2 w-64 bg-[#ca942c] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TtSIVBTuIOGSoThZERRy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoA4OTopukiJ/0sKLWI8OO7Hu3uPu3eAUC8zzeoYBzTdNlOJuJjJroqhVwQxghDiiMjM1OckKQXf8XWPAF/vYjzL/9yfo1fNWQwIiMSzzDBt4g3i6U3b4LxPHGFFWSU+Jx4z6YLEj1xXPH7jXHBZ4JkRM52aJ44Qi4U2VtqYFU2NeIo4qmo65QsZj1XOW5y1cpU178lfGM7pK8tcpzmEBBaxBIk6UlBFCWW0UYONOl0nxUKKznE//oGrT4GcUqg0YODgMRqGwC93/5+9u7UwMeEmBWJA94ttf4wAoV2g0bLt72Pbbp0A/mfgSuv4a02g+Et6ra0FHwCD28DFdVuT94DLHWDwSZcMyZH8NIVCAXg/o2/KAYNboHfN7a21j9MHIENdLd0AB4fASJGy133e3d3Z279nWv39AFlNcp0UUpxCAAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+ULHhQMEwQr/aYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAFElEQVRo3u3BAQ0AAADCoPdPbQ43oAAAAAAAfgwNOgABa5xH6wAAAABJRU5ErkJggg==')] rounded-t-lg shadow-2xl border border-black/20 overflow-hidden">
          <div className="p-4 bg-black/20 font-bold border-b border-black/20">
            RetroOS Portfolio
          </div>
          <div className="p-2">
            {[
              { id: 'terminal', label: 'Terminal' },
              { id: 'explorer', label: 'File Explorer' },
              { id: 'media', label: 'Media Player' },
              { id: 'games', label: 'Games' }
            ].map(item => (
              <button
                key={item.id}
                className="w-full p-2 text-left hover:bg-black/20 rounded transition-colors"
                onClick={() => handleStartMenuItem(item.id)}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-black/20 my-1" />
            <button
              className="w-full p-2 text-left hover:bg-red-900/30 rounded transition-colors flex items-center space-x-2"
              onClick={() => handleStartMenuItem('shutdown')}
            >
              <Power className="w-4 h-4" />
              <span>Shut Down</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Task items */}
      <div className="flex-1 flex items-center h-full ml-2 space-x-1 overflow-x-auto">
        {Object.values(windows).map(window => (
          <button
            key={window.id}
            className={`h-8 px-3 text-sm flex items-center rounded transition-colors ${
              activeWindowId === window.id 
                ? 'bg-black/30' 
                : 'hover:bg-black/20'
            }`}
            onClick={() => handleTaskbarItemClick(window.id)}
          >
            <window.icon className="w-4 h-4 mr-2" />
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Taskbar;