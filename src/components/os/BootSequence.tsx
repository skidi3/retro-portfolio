import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const BootSequence: React.FC = () => {
  const { completeBootSequence } = useStore();
  const [bootStage, setBootStage] = useState(0);
  const { playSound } = useAudio();

  const bootStages = [
    { text: "BIOS INITIALIZATION", delay: 10 },
    { text: "MEMORY TEST 640K OK", delay: 20 },
    { text: "HARD DISK DETECTED", delay: 10 },
    { text: "LOADING OPERATING SYSTEM...", delay: 10 },
    { text: "WELCOME TO RETRO OS", delay: 10 },
    { text: "STARTING DESKTOP ENVIRONMENT...", delay: 50 },
  ];

  useEffect(() => {
    let mounted = true;

    const advanceBootSequence = async () => {
      if (bootStage < bootStages.length) {
        await new Promise(resolve => setTimeout(resolve, bootStages[bootStage].delay));
        if (mounted) {
          playSound();
          setBootStage(prev => prev + 1);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (mounted) {
          playSound();
          completeBootSequence();
        }
      }
    };

    advanceBootSequence();

    return () => {
      mounted = false;
    };
  }, [bootStage, completeBootSequence, playSound]);

  return (
    <div className="h-full w-full bg-black text-green-500 font-mono p-4 flex flex-col">
      <div className="text-xl mb-4">RETRO OS BOOT v1.0</div>
      <div className="flex-1">
        {bootStages.slice(0, bootStage).map((stage, index) => (
          <div key={index} className="mb-2">
            {stage.text}
            {index === bootStage - 1 && <span className="animate-pulse">_</span>}
          </div>
        ))}
      </div>
      <div className="mt-auto">
        {bootStage === bootStages.length && (
          <div className="text-center text-xl animate-pulse">
            PRESS ANY KEY TO CONTINUE...
          </div>
        )}
      </div>
    </div>
  );
};

export default BootSequence;