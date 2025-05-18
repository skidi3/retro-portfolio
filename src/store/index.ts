import { create } from 'zustand';
import { IconType } from '../types';
import { Terminal, FileText, FolderOpen, Music, Gamepad2, Trash2, Image } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Window {
  id: string;
  title: string;
  icon: IconType;
  position: Position;
  size: Size;
  minimized: boolean;
  content?: React.ReactNode;
}

interface AppState {
  bootComplete: boolean;
  isBooting: boolean;
  windows: Record<string, Window>;
  activeWindowId: string | null;
  startBoot: () => void;
  completeBootSequence: () => void;
  openWindow: (id: string, options?: Partial<Window>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  activateWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: Position) => void;
  updateWindowSize: (id: string, size: Size) => void;
}

// Default window config
const getDefaultWindowConfig = (id: string): Window => {
  const defaults: Record<string, Partial<Window>> = {
    terminal: {
      title: 'Terminal',
      icon: Terminal,
      position: { x: 100, y: 100 },
      size: { width: 600, height: 400 }
    },
    notepad: {
      title: 'Resume',
      icon: FileText,
      position: { x: 150, y: 120 },
      size: { width: 500, height: 600 }
    },
    explorer: {
      title: 'File Explorer',
      icon: FolderOpen,
      position: { x: 200, y: 150 },
      size: { width: 700, height: 500 }
    },
    mediaPlayer: {
      title: 'Media Player',
      icon: Music,
      position: { x: 250, y: 180 },
      size: { width: 350, height: 500 }
    },
    pacman: {
      title: 'Pac-Man Game',
      icon: Gamepad2,
      position: { x: 300, y: 100 },
      size: { width: 420, height: 480 }
    },
    recycleBin: {
      title: 'Recycle Bin',
      icon: Trash2,
      position: { x: 350, y: 120 },
      size: { width: 600, height: 400 }
    },
    viewer: {
      title: 'Image Viewer',
      icon: Image,
      position: { x: 400, y: 150 },
      size: { width: 600, height: 500 }
    },
    experience: {
      title: 'Experience',
      icon: Image,
      position: { x: 400, y: 150 },
      size: { width: 600, height: 500 }
    }
  };

  return {
    id,
    title: defaults[id]?.title || 'Window',
    icon: defaults[id]?.icon || FileText,
    position: defaults[id]?.position || { x: 50, y: 50 },
    size: defaults[id]?.size || { width: 400, height: 300 },
    minimized: false
  };
};

export const useStore = create<AppState>((set) => ({
  bootComplete: false,
  isBooting: false,
  windows: {},
  activeWindowId: null,
  
  startBoot: () => {
    set({ isBooting: true, bootComplete: false });
  },
  
  completeBootSequence: () => {
    set({ bootComplete: true, isBooting: false });
  },
  
  openWindow: (id, options) => {
    set((state) => {
      // If window already exists and has content from options, update it
      if (state.windows[id] && options?.content) {
        return {
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              minimized: false,
              content: options.content,
              title: options.title || state.windows[id].title
            }
          },
          activeWindowId: id
        };
      }
      
      // If window exists without new content, just activate it
      if (state.windows[id]) {
        if (state.windows[id].minimized) {
          return {
            windows: {
              ...state.windows,
              [id]: {
                ...state.windows[id],
                minimized: false
              }
            },
            activeWindowId: id
          };
        }
        return { activeWindowId: id };
      }
      
      // Create new window with all options
      const newWindow = {
        ...getDefaultWindowConfig(id),
        ...options
      };
      
      return {
        windows: {
          ...state.windows,
          [id]: newWindow
        },
        activeWindowId: id
      };
    });
  },
  
  closeWindow: (id) => {
    set((state) => {
      const newWindows = { ...state.windows };
      delete newWindows[id];
      
      // If closing the active window, set a new active window or null
      let newActiveWindowId = state.activeWindowId;
      if (state.activeWindowId === id) {
        const remainingWindowIds = Object.keys(newWindows);
        newActiveWindowId = remainingWindowIds.length > 0 ? remainingWindowIds[0] : null;
      }
      
      return {
        windows: newWindows,
        activeWindowId: newActiveWindowId
      };
    });
  },
  
  minimizeWindow: (id) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          minimized: true
        }
      },
      // If minimizing the active window, set a new active window or null
      activeWindowId: state.activeWindowId === id
        ? Object.keys(state.windows).find(winId => !state.windows[winId].minimized && winId !== id) || null
        : state.activeWindowId
    }));
  },
  
  activateWindow: (id) => {
    set((state) => {
      // If window is minimized, restore it
      if (state.windows[id]?.minimized) {
        return {
          windows: {
            ...state.windows,
            [id]: {
              ...state.windows[id],
              minimized: false
            }
          },
          activeWindowId: id
        };
      }
      return { activeWindowId: id };
    });
  },
  
  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          position
        }
      }
    }));
  },
  
  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          size
        }
      }
    }));
  }
}));