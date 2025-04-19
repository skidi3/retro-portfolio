import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Rewind, FastForward } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  albumArt?: string;
}

const MediaPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { playSound } = useAudio();
  
  // Sample playlist with album art
  const playlist: Song[] = [
    {
      id: '1',
      title: 'Retro Synthwave',
      artist: 'VHS Dreams',
      url: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
      duration: 15,
      albumArt: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      title: '8-Bit Adventure',
      artist: 'Chiptune Hero',
      url: 'https://samplelib.com/lib/preview/mp3/sample-12s.mp3',
      duration: 12,
      albumArt: 'https://images.pexels.com/photos/2239485/pexels-photo-2239485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;
    audio.src = playlist[currentSongIndex].url;
    audio.volume = volume;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnd = () => playNextSong();
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnd);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnd);
      audio.pause();
    };
  }, [currentSongIndex, volume]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const togglePlayPause = () => {
    playSound('click');
    setIsPlaying(!isPlaying);
  };
  
  const playPreviousSong = () => {
    playSound('click');
    setIsPlaying(false);
    setCurrentSongIndex(prev => prev === 0 ? playlist.length - 1 : prev - 1);
    setTimeout(() => setIsPlaying(true), 100);
  };
  
  const playNextSong = () => {
    playSound('click');
    setIsPlaying(false);
    setCurrentSongIndex(prev => prev === playlist.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsPlaying(true), 100);
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };
  
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };
  
  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        playlist[currentSongIndex].duration,
        audioRef.current.currentTime + 5
      );
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  const toggleMute = () => {
    playSound('click');
    setIsMuted(!isMuted);
  };
  
  const currentSong = playlist[currentSongIndex];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-900 to-black text-white">
      {/* Album art and visualization */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-lg overflow-hidden shadow-2xl">
          <img 
            src={currentSong.albumArt} 
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          
          {/* Retro overlay effect */}
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)'
          }} />
        </div>
      </div>
      
      {/* Controls section */}
      <div className="bg-black bg-opacity-50 p-6 rounded-t-xl">
        {/* Song info */}
        <div className="text-center mb-4">
          <div className="text-xl font-bold mb-1">{currentSong.title}</div>
          <div className="text-gray-400">{currentSong.artist}</div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-6">
          <input 
            type="range"
            min={0}
            max={currentSong.duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>
        
        {/* Main controls */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={skipBackward}
          >
            <Rewind size={20} />
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={playPreviousSong}
          >
            <SkipBack size={24} />
          </button>
          <button 
            className="w-16 h-16 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={playNextSong}
          >
            <SkipForward size={24} />
          </button>
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={skipForward}
          >
            <FastForward size={20} />
          </button>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center space-x-2">
          <button 
            className="text-gray-400 hover:text-white transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;