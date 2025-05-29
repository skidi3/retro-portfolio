import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Bot } from 'lucide-react';

const TopBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

  return (
    <div className="top-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-2 h-[24px] text-[10px] bg-[#c0c0c0] ">
      {/* Left section with logo and title */}
      <div className="flex items-center gap-2">
        <div className="animate-pulse">
          <Bot className="w-3 h-3" />
        </div>
        <span className=" text-black">Nikhil's Portfolio</span>
        <div className="h-[14px] mx-2 w-[1px] bg-[#808080]" />
        <div className="flex items-center gap-3">
          <button className="hover:underline">Home</button>
          <button className="hover:underline">Work</button>
          <button className="hover:underline">Connect</button>
        </div>
      </div>

      {/* Right section with language and time */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            className="flex items-center gap-1 px-1.5 py-[1px] h-[18px] text-[9px] border border-[#fff] shadow-[inset_-1px_-1px_#000,inset_1px_1px_#808080] bg-[#c0c0c0] hover:bg-[#d0d0d0]"
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          >
            <Globe className="w-2.5 h-2.5" />
            <span>English</span>
          </button>

          {showLanguageMenu && (
            <div 
              className="absolute right-0 mt-1 w-24 border border-[#000] bg-[#f0f0f0] shadow-[2px_2px_#808080] z-50"
              onMouseLeave={() => setShowLanguageMenu(false)}
            >
              <button className="w-full text-left px-2 py-1 text-[9px] hover:bg-[#000080] hover:text-white">
                English
              </button>
            </div>
          )}
        </div>

        <div className="px-2 py-[2px] text-[9px] bg-[#c0c0c0] border border-[#808080] shadow-[inset_-1px_-1px_#fff,inset_1px_1px_#000]">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default TopBar;