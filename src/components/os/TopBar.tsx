import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const TopBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="h-8 bg-[#ca942c] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TtSIVBTuIOGSoThZERRy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoA4OTopukiJ/0sKLWI8OO7Hu3uPu3eAUC8zzeoYBzTdNlOJuJjJroqhVwQxghDiiMjM1OckKQXf8XWPAF/vYjzL/9yfo1fNWQwIiMSzzDBt4g3i6U3b4LxPHGFFWSU+Jx4z6YLEj1xXPH7jXHBZ4JkRM52aJ44Qi4U2VtqYFU2NeIo4qmo65QsZj1XOW5y1cpU178lfGM7pK8tcpzmEBBaxBIk6UlBFCWW0UYONOl0nxUKKznE//oGrT4GcUqg0YODgMRqGwC93/5+9u7UwMeEmBWJA94ttf4wAoV2g0bLt72Pbbp0A/mfgSuv4a02g+Et6ra0FHwCD28DFdVuT94DLHWDwSZcMyZH8NIVCAXg/o2/KAYNboHfN7a21j9MHIENdLd0AB4fASJGy133e3d3Z279nWv39AFlNcp0UUpxCAAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+ULHhQMEwQr/aYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAFElEQVRo3u3BAQ0AAADCoPdPbQ43oAAAAAAAfgwNOgABa5xH6wAAAABJRU5ErkJggg==')] text-black flex items-center justify-between px-4">
      <div className="text-sm font-medium">RetroOS</div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="flex items-center space-x-1 text-sm hover:bg-black/20 px-2 py-1 rounded"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          >
            <Globe className="w-4 h-4" />
            <span>{currentLanguage}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          
          {showLanguageMenu && (
            <div className="absolute top-full right-0 mt-1 bg-[#ca942c] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TtSIVBTuIOGSoThZERRy1CkWoEGqFVh1MLv2CJg1Jiouj4Fpw8GOx6uDirKuDqyAIfoA4OTopukiJ/0sKLWI8OO7Hu3uPu3eAUC8zzeoYBzTdNlOJuJjJroqhVwQxghDiiMjM1OckKQXf8XWPAF/vYjzL/9yfo1fNWQwIiMSzzDBt4g3i6U3b4LxPHGFFWSU+Jx4z6YLEj1xXPH7jXHBZ4JkRM52aJ44Qi4U2VtqYFU2NeIo4qmo65QsZj1XOW5y1cpU178lfGM7pK8tcpzmEBBaxBIk6UlBFCWW0UYONOl0nxUKKznE//oGrT4GcUqg0YODgMRqGwC93/5+9u7UwMeEmBWJA94ttf4wAoV2g0bLt72Pbbp0A/mfgSuv4a02g+Et6ra0FHwCD28DFdVuT94DLHWDwSZcMyZH8NIVCAXg/o2/KAYNboHfN7a21j9MHIENdLd0AB4fASJGy133e3d3Z279nWv39AFlNcp0UUpxCAAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+ULHhQMEwQr/aYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAFElEQVRo3u3BAQ0AAADCoPdPbQ43oAAAAAAAfgwNOgABa5xH6wAAAABJRU5ErkJggg==')] rounded-lg shadow-xl border border-black/20 py-1 min-w-[120px]">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-black/20 transition-colors"
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setShowLanguageMenu(false);
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-sm font-medium">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default TopBar;