import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { useAudio } from '../../hooks/useAudio';

const Loading: React.FC = () => {
  const { completeBootSequence } = useStore();
  const { playSound } = useAudio();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    playSound();

    const timeout = setTimeout(() => {
      completeBootSequence();
    }, 100); // boot duration

    return () => clearTimeout(timeout);
  }, [completeBootSequence, playSound]);

  return (
    <div className="fixed inset-0 bg-[#000080] flex items-center justify-center text-white font-['Perfect DOS VGA 437'] z-50">
      <div
        className={`transition-all duration-700 ease-out transform ${
          show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } flex flex-col items-center`}
      >
        <div className="text-4xl tracking-wider mb-2">RETRO OS</div>
        <div className="text-sm text-gray-200">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
