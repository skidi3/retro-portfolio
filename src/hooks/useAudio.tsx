import { useCallback } from 'react';
import { Howl } from 'howler';
import { create } from 'zustand';

interface AudioStore {
  initialized: boolean;
  sounds: Record<string, Howl>;
  initializeAudio: () => void;
  playSound: (soundId?: string) => void;
  stopSound: (soundId?: string) => void;
}

// Create a Zustand store for audio
export const useAudioStore = create<AudioStore>((set, get) => ({
  initialized: false,
  sounds: {},
  
  initializeAudio: () => {
    if (get().initialized) return;
    
    const sounds: Record<string, Howl> = {
      click: new Howl({
        src: ['/sounds/click.mp3'],
        volume: 0.5
      }),
      doubleClick: new Howl({
        src: ['/sounds/double-click.mp3'],
        volume: 0.5
      }),
      error: new Howl({
        src: ['/sounds/error.mp3'],
        volume: 0.5
      }),
      minimize: new Howl({
        src: ['/sounds/minimize.mp3'],
        volume: 0.5
      }),
      maximize: new Howl({
        src: ['/sounds/maximize.mp3'],
        volume: 0.5
      }),
      close: new Howl({
        src: ['/sounds/close.mp3'],
        volume: 0.5
      }),
      drag: new Howl({
        src: ['/sounds/drag.mp3'],
        volume: 0.3
      }),
      drop: new Howl({
        src: ['/sounds/drop.mp3'],
        volume: 0.4
      }),
      resize: new Howl({
        src: ['/sounds/resize.mp3'],
        volume: 0.3
      }),
      keypress: new Howl({
        src: ['/sounds/keypress.mp3'],
        volume: 0.2
      }),
      achievement: new Howl({
        src: ['/sounds/achievement.mp3'],
        volume: 0.6
      })
    };
    
    set({ sounds, initialized: true });
  },
  
  playSound: (soundId = 'click') => {
    const { sounds } = get();
    if (sounds[soundId]) {
      sounds[soundId].play();
    }
  },
  
  stopSound: (soundId?: string) => {
    const { sounds } = get();
    if (soundId && sounds[soundId]) {
      sounds[soundId].stop();
    } else {
      Object.values(sounds).forEach(sound => sound.stop());
    }
  }
}));

// Hook for using audio
export const useAudio = () => {
  const store = useAudioStore();
  
  const playSound = useCallback((soundId?: string) => {
    store.playSound(soundId);
  }, [store]);
  
  const stopSound = useCallback((soundId?: string) => {
    store.stopSound(soundId);
  }, [store]);
  
  const initializeAudio = useCallback(() => {
    if (!store.initialized) {
      store.initializeAudio();
    }
  }, [store]);
  
  return {
    playSound,
    stopSound,
    initializeAudio
  };
};