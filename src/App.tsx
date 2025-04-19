import React, { Suspense } from 'react';
import Loading from './components/ui/Loading';
import Desktop from './components/os/Desktop';
import { useStore } from './store';
import SoundEffect from './components/audio/SoundEffect';

function App() {
  const { bootComplete, startBoot } = useStore();

  React.useEffect(() => {
    // Start the boot sequence after a slight delay
    const timer = setTimeout(() => {
      startBoot();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [startBoot]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <Suspense fallback={<Loading />}>
        {bootComplete ? <Desktop /> : <Loading />}
      </Suspense>
      <SoundEffect />
    </div>
  );
}

export default App;