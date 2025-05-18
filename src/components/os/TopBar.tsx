import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const TopBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' }
  ];

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

  return (
    <div className="top-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-[32px] text-[11px]  bg-[#c0c0c0] border-b-2 border-[#808080] shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#000]">
      <div className="font-bold text-black">Yet another portfolio</div>

      <div className="flex items-center gap-3 relative">
        {/* Language Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-2 py-[2px] h-[22px] border-2 border-[#fff] shadow-[inset_-1px_-1px_#000,inset_1px_1px_#808080] bg-[#c0c0c0] hover:bg-[#d0d0d0]"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          >
            <Globe className="w-3 h-3" />
            <span>{currentLanguage}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showLanguageMenu && (
            <div className="absolute right-0 mt-1 w-32 border-2 border-[#000] bg-[#f0f0f0] shadow-[2px_2px_#808080] z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="w-full text-left px-2 py-1 hover:bg-[#000080] hover:text-white font-mono text-[11px]"
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

        {/* Time Display */}
        <div className="h-[24px] px-10 py-[6px] flex items-center bg-white text-black border-2 border-[#808080] shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#000]">
  {formatTime(currentTime)}
</div>
      </div>
    </div>
  );
};

export default TopBar;
