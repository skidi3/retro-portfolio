import React, { useState } from "react";
import Taskbar from "./Taskbar";
import TopBar from "./TopBar";
import DesktopIcons from "./DesktopIcons";
import WindowManager from "./WindowManager";
import ContextMenu from "../ui/ContextMenu";
import { useAudio } from "../../hooks/useAudio";

const Desktop: React.FC = () => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const { playSound } = useAudio();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
    playSound();
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleDesktopClick = () => {
    if (contextMenu.visible) {
      handleCloseContextMenu();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <TopBar />
      <div className="flex-1 relative overflow-hidden">
        {/* Wallpaper */}
        <div className="absolute inset-0">
          <img 
            src="/icons/xp-bg.webp"
            alt="Wallpaper"
            className="w-full h-full object-cover"
          />
          {/* <video
            src="/textures/bg-retro.mp4"
            className="absolute inset-0 w-full h-full "
            autoPlay
            loop
            muted
            playsInline
          /> */}
        </div>

        <div
          className="relative w-full h-full "
          onContextMenu={handleContextMenu}
          onClick={handleDesktopClick}
        >
          <br />
          <DesktopIcons />
          <WindowManager />
        </div>
      </div>
      <Taskbar />
    </div>
  );
};

export default Desktop;
