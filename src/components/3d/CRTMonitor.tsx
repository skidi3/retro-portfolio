import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import Desktop from '../os/Desktop';
import BootSequence from '../os/BootSequence';
import CRTEffect from './CRTEffect';
import { useStore } from '../../store';
import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

interface CRTMonitorProps extends GroupProps {
  bootComplete: boolean;
}

const CRTMonitor: React.FC<CRTMonitorProps> = ({ bootComplete, ...props }) => {
  const group = useRef<THREE.Group>(null);
  const { isBooting } = useStore();
  
  // Subtle floating animation
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group} {...props} position={[0, 0, 0]}>
      {/* Monitor body */}
      <mesh receiveShadow castShadow position={[0, 0, -0.6]}>
        <boxGeometry args={[4.4, 3.3, 1]} />
        <meshStandardMaterial 
          color="#d0d0d0" 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>
      
      {/* Monitor screen (slightly inset) */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[4, 3, 0.1]} />
        <meshStandardMaterial color={bootComplete ? "#000000" : "#111111"} />
      </mesh>

      {/* Screen content */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[3.8, 2.8]} />
        <CRTEffect>
          <Html
            transform
            occlude="blending"
            className="w-[760px] h-[560px] overflow-hidden"
            position={[0, 0, 0.01]}
            scale={0.005}
            zIndexRange={[100, 0]}
          >
            {isBooting ? (
              <BootSequence />
            ) : (
              bootComplete && <Desktop />
            )}
          </Html>
        </CRTEffect>
      </mesh>
      
      {/* Monitor brand text */}
      <Text 
        position={[0, -1.5, 0.01]}
        fontSize={0.15}
        color="#555555"
        font="https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivNm4I81.woff2"
      >
        RETRO STATION
      </Text>
    </group>
  );
};

export default CRTMonitor;