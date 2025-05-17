import React, { useEffect, useState, useCallback } from 'react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Loading: React.FC = () => {
  const [bootStage, setBootStage] = useState(0);
  const { completeBootSequence } = useStore();
  const { playSound } = useAudio();

  const bootStages = [
    { text: "BIOS INITIALIZATION", delay: 1 },
    { text: "MEMORY TEST 640K OK", delay: 1},
    { text: "HARD DISK DETECTED", delay: 1 },
    { text: "LOADING OPERATING SYSTEM...", delay: 2 },
    { text: "WELCOME TO RETRO OS", delay: 1 },
    { text: "STARTING DESKTOP ENVIRONMENT...", delay: 2},
  ];

  const handleKeyPress = useCallback(() => {
    if (bootStage === bootStages.length) {
      completeBootSequence();
    }
  }, [bootStage, completeBootSequence]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const advanceBootSequence = () => {
      if (!mounted || bootStage >= bootStages.length) return;

      timeoutId = setTimeout(() => {
        if (mounted) {
          playSound();
          setBootStage(prev => prev + 1);
        }
      }, bootStages[bootStage].delay);
    };

    advanceBootSequence();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [bootStage, bootStages.length, playSound]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono p-8 flex flex-col">
      <div className="text-xl mb-8">RETRO OS BOOT v1.0</div>
      <div className="flex-1">
        {bootStages.slice(0, bootStage).map((stage, index) => (
          <div key={index} className="mb-4">
            {stage.text}
            {index === bootStage - 1 && <span className="animate-pulse">_</span>}
          </div>
        ))}
      </div>
      <div className="mt-auto text-center">
        {bootStage === bootStages.length && (
          <div className="text-xl animate-pulse">
            PRESS ANY KEY TO CONTINUE...
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;