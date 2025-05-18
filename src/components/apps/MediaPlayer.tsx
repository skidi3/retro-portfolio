import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Rewind, FastForward
} from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { playSound } = useAudio();

  const playlist: Song[] = [
    {
      id: '1',
      title: 'Dermot (Live at Terminal)',
      artist: 'Fred again..',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: 290,
      albumArt: 'https://us.rarevinyl.com/cdn/shop/products/fred-again-actual-life-april-14-december-17-2020-rsd21-sealed-uk-vinyl-lp-album-record-0190295058739-815152_1000x1019.jpg?v=1688460994'
    },
    {
      id: '2',
      title: 'Big Plans',
      artist: 'buildspace vibes',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      duration: 240,
      albumArt: 'https://f4.bcbits.com/img/a1702472144_10.jpg'
    },
    {
      id: '3',
      title: 'Delilah (Pull Me Out)',
      artist: 'Fred again..',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      duration: 268,
      albumArt: 'https://f4.bcbits.com/img/a0486025406_10.jpg'
    }
  ];

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();

    const audio = audioRef.current;
    audio.src = currentSong.url;
    audio.volume = volume;

    const update = () => setCurrentTime(audio.currentTime);
    const onEnd = () => handleNext();

    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('ended', onEnd);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play().catch(console.error) : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

  const togglePlay = () => {
    playSound('click');
    setIsPlaying(prev => !prev);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentSongIndex(i => (i + 1) % playlist.length);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentSongIndex(i => (i - 1 + playlist.length) % playlist.length);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) audioRef.current.currentTime = val;
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
    }
  };

  const skipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  const toggleMute = () => {
    playSound('click');
    setIsMuted(!isMuted);
  };

  const selectSong = (index: number) => {
    playSound('click');
    setCurrentSongIndex(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  return (
    <div className="h-full w-full overflow-auto relative text-white font-['Manrope']">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')`,
          backgroundSize: '64px',
          backgroundRepeat: 'repeat',
          opacity: 0.08
        }}
      />
<div className="relative z-10 w-full flex flex-col items-center justify-start p-6 overflow-auto" style={{ minHeight: '200px' }}>
{/* Album Art */}
        <div className="w-64 h-64 rounded-lg overflow-hidden shadow-lg relative mb-6 mt-8">
          <img src={currentSong.albumArt} alt={currentSong.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0" style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)'
          }} />
        </div>

        {/* Song Info */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">{currentSong.title}</h2>
          <p className="text-white/60 text-sm">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-6">
          <input
            type="range"
            min={0}
            max={currentSong.duration}
            value={currentTime}
            onChange={seek}
            className="w-full h-2 bg-gray-600 rounded appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-5 mb-6">
          <button onClick={skipBack}><Rewind size={18} /></button>
          <button onClick={handlePrev}><SkipBack size={24} /></button>
          <button onClick={togglePlay} className="bg-yellow-400 hover:bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center text-black">
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button onClick={handleNext}><SkipForward size={24} /></button>
          <button onClick={skipForward}><FastForward size={18} /></button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-3 w-full max-w-md mb-6">
          <button onClick={toggleMute}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={changeVolume}
            className="flex-1 h-1 bg-gray-600 rounded appearance-none"
          />
        </div>

        {/* Playlist */}
        <div className="w-full max-w-xl mt-4 text-sm text-white/80 pb-10">
          <div className="border-t border-white/20 pt-3">
            {playlist.map((song, index) => (
              <div
                key={song.id}
                className={`cursor-pointer py-2 px-3 rounded hover:bg-white/10 transition flex justify-between items-center ${
                  index === currentSongIndex ? 'bg-yellow-400 text-black font-semibold' : ''
                }`}
                onClick={() => selectSong(index)}
              >
                <span>{song.title}</span>
                <span className="text-xs">{song.artist}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
