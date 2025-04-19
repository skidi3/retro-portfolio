import React, { useEffect } from 'react';
import { useAudio } from '../../hooks/useAudio';

const SoundEffect: React.FC = () => {
  const { initializeAudio } = useAudio();
  
  // Initialize audio on component mount
  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);
  
  // This component doesn't render anything
  return null;
};

export default SoundEffect;