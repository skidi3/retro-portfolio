import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const { playSound } = useAudio();
  const { openWindow } = useStore();
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);
  
  const adjustedPosition = {
    x: Math.min(x, window.innerWidth - 200),
    y: Math.min(y, window.innerHeight - 250),
  };
  
  // const handleMenuItemClick = (action: string) => {
  //   playSound('click');
    
  //   switch (action) {
  //     case 'view':
  //       openWindow('explorer');
  //       break;
  //     case 'refresh':
  //       window.location.reload();
  //       break;
  //     case 'properties':
  //       openWindow('notepad', {
  //         title: 'System Properties',
  //         content: (
  //           <div className="p-4">
  //             <h2 className="text-xl font-bold mb-4">System Properties</h2>
  //             <div className="space-y-2">
  //               <p><strong>OS:</strong> RetroOS v1.0</p>
  //               <p><strong>Memory:</strong> 640K (More than enough!)</p>
  //               <p><strong>Display:</strong> CGA 320x200</p>
  //               <p><strong>Sound:</strong> PC Speaker</p>
  //               <p><strong>Storage:</strong> 10MB Hard Drive</p>
  //             </div>
  //           </div>
  //         )
  //       });
  //       break;
  //     case 'install':
  //       openWindow('terminal', {
  //         title: 'Installing Developer...',
  //         content: (
  //           <div className="p-4 font-mono">
  //             <p>npm install developer@latest</p>
  //             <p className="text-green-500">Successfully installed developer!</p>
  //             <p>Ready to code amazing things! 🚀</p>
  //           </div>
  //         )
  //       });
  //       break;
  //     case 'hack':
  //       openWindow('terminal', {
  //         title: 'HACKING IN PROGRESS',
  //         content: (
  //           <div className="p-4 font-mono text-green-500">
  //             <p>INITIATING HACK SEQUENCE...</p>
  //             <p>ACCESSING MAINFRAME...</p>
  //             <p>BYPASSING FIREWALLS...</p>
  //             <p>DOWNLOADING PORTFOLIO...</p>
  //             <p>HACK COMPLETE! 🎉</p>
  //           </div>
  //         )
  //       });
  //       break;
  //     case 'runVirus':
  //       openWindow('terminal', {
  //         title: 'WARNING: VIRUS.EXE',
  //         content: (
  //           <div className="p-4 font-mono text-red-500">
  //             <p>🦠 OH NO! You've activated a friendly virus!</p>
  //             <p>Don't worry, it only spreads good vibes</p>
  //             <p>and positive energy! 🌈✨</p>
  //           </div>
  //         )
  //       });
  //       break;
  //   }
    
  //   onClose();
  // };

  return (
    <></>
    // <div
    //   ref={contextMenuRef}
    //   className="context-menu absolute z-50"
    //   style={{
    //     left: adjustedPosition.x,
    //     top: adjustedPosition.y,
    //   }}
    // >
    //   <div className="context-menu-item" onClick={() => handleMenuItemClick('view')}>View</div>
    //   <div className="context-menu-item" onClick={() => handleMenuItemClick('refresh')}>Refresh</div>
    //   <div className="context-menu-item" onClick={() => handleMenuItemClick('properties')}>Properties</div>
    //   <div className="context-menu-item" onClick={() => handleMenuItemClick('install')}>Install Developer 🧠</div>
    //   <div className="context-menu-item" onClick={() => handleMenuItemClick('hack')}>Hack Portfolio</div>
    //   <div className="context-menu-item" onClick={() => handleMenuItemClick('runVirus')}>Run Virus.exe</div>
    // </div>
  );
  
};

export default ContextMenu;