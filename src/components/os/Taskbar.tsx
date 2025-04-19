import React, { useState, useEffect } from 'react';
import { Monitor, Wifi, WifiOff, Battery, BatteryCharging, Volume2, VolumeX, Power, Folder, Terminal, Music2, Gamepad } from 'lucide-react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Taskbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [batteryInfo, setBatteryInfo] = useState<{ level: number; charging: boolean } | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkType, setNetworkType] = useState<string>('');
  const { windows, activeWindowId, minimizeWindow, activateWindow, openWindow } = useStore();
  const { playSound } = useAudio();

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Battery API
  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryInfo = () => {
          setBatteryInfo({
            level: Math.round(battery.level * 100),
            charging: battery.charging
          });
        };

        updateBatteryInfo();
        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryInfo);
          battery.removeEventListener('chargingchange', updateBatteryInfo);
        };
      });
    }
  }, []);

  // Network status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    const updateConnectionInfo = () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        setNetworkType(conn.effectiveType || '');
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      conn.addEventListener('change', updateConnectionInfo);
      updateConnectionInfo();
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        conn.removeEventListener('change', updateConnectionInfo);
      }
    };
  }, []);
  
  const toggleStartMenu = () => {
    playSound('click');
    setShowStartMenu(!showStartMenu);
    setShowVolumeControl(false);
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

  const toggleVolume = () => {
    playSound('click');
    setShowVolumeControl(!showVolumeControl);
    setShowStartMenu(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    playSound('click');
    setIsMuted(!isMuted);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-800 border-t border-gray-700 flex items-center px-1 z-40">
      {/* Start button */}
      <button 
        className={`px-4 py-1 font-bold flex items-center mr-2 rounded ${
          showStartMenu ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
        onClick={toggleStartMenu}
      >
        <Monitor className="w-4 h-4 mr-1" />
        Start
      </button>
      
      {/* Start menu */}
      {showStartMenu && (
        <div className="absolute bottom-10 left-0 w-64 bg-gray-800 border border-gray-700 shadow-lg rounded-t-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4 font-bold">
            RetroOS Portfolio
          </div>
          <div className="p-2 space-y-1">
            <button 
              className="w-full p-2 hover:bg-blue-600 hover:text-white rounded flex items-center"
              onClick={() => handleStartMenuItem('terminal')}
            >
              <Terminal className="w-4 h-4 mr-2" />
              Terminal
            </button>
            <button 
              className="w-full p-2 hover:bg-blue-600 hover:text-white rounded flex items-center"
              onClick={() => handleStartMenuItem('explorer')}
            >
              <Folder className="w-4 h-4 mr-2" />
              File Explorer
            </button>
            <button 
              className="w-full p-2 hover:bg-blue-600 hover:text-white rounded flex items-center"
              onClick={() => handleStartMenuItem('media')}
            >
              <Music2 className="w-4 h-4 mr-2" />
              Media Player
            </button>
            <button 
              className="w-full p-2 hover:bg-blue-600 hover:text-white rounded flex items-center"
              onClick={() => handleStartMenuItem('games')}
            >
              <Gamepad className="w-4 h-4 mr-2" />
              Games
            </button>
            <div className="border-t border-gray-700 my-1"></div>
            <button 
              className="w-full p-2 hover:bg-red-600 hover:text-white rounded flex items-center"
              onClick={() => handleStartMenuItem('shutdown')}
            >
              <Power className="w-4 h-4 mr-2" />
              Shut Down
            </button>
          </div>
        </div>
      )}
      
      {/* Task items */}
      <div className="flex-1 flex items-center h-full overflow-x-auto space-x-1">
        {Object.values(windows).map(window => (
          <button
            key={window.id}
            className={`px-3 h-8 text-sm flex items-center rounded ${
              activeWindowId === window.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}
            onClick={() => handleTaskbarItemClick(window.id)}
          >
            <window.icon className="w-4 h-4 mr-2" />
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>
      
      {/* System tray */}
      <div className="flex items-center space-x-2 px-2">
        {/* Volume control */}
        <button 
          className="p-1 hover:bg-gray-700 rounded relative"
          onClick={toggleVolume}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-300" />
          )}
          
          {showVolumeControl && (
            <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded shadow-lg border border-gray-700">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-32 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <button 
                className="mt-2 p-1 hover:bg-gray-700 rounded w-full text-sm text-gray-300"
                onClick={toggleMute}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>
          )}
        </button>

        {/* Network status */}
        <div className="relative p-1 group">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-gray-300" />
          ) : (
            <WifiOff className="w-4 h-4 text-gray-300" />
          )}
          <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded shadow-lg border border-gray-700 hidden group-hover:block whitespace-nowrap">
            <div className="text-sm text-gray-300">
              Status: {isOnline ? 'Connected' : 'Offline'}
              {networkType && <div>Network: {networkType}</div>}
            </div>
          </div>
        </div>

        {/* Battery indicator */}
        {batteryInfo && (
          <div className="relative p-1 group">
            {batteryInfo.charging ? (
              <BatteryCharging className="w-4 h-4 text-gray-300" />
            ) : (
              <Battery className="w-4 h-4 text-gray-300" />
            )}
            <div className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded shadow-lg border border-gray-700 hidden group-hover:block whitespace-nowrap">
              <div className="text-sm text-gray-300">
                Battery: {batteryInfo.level}%
                {batteryInfo.charging && ' (Charging)'}
              </div>
            </div>
          </div>
        )}

        {/* Clock */}
        <div className="pl-2 text-sm text-gray-300">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;