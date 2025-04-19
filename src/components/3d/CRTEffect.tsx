import React, { useRef } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

// Create the shader material
const CrtShaderMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(1, 1),
    opacity: 1
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform float opacity;
    varying vec2 vUv;
    
    float scanline(vec2 uv) {
      return sin(uv.y * 400.0) * 0.08;
    }
    
    float noise(vec2 uv) {
      return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      // Curved screen effect
      vec2 uv = vUv;
      vec2 curvedUv = uv * 2.0 - 1.0;
      vec2 offset = abs(curvedUv.yx) / 5.0;
      curvedUv += curvedUv * offset * offset;
      curvedUv = curvedUv * 0.5 + 0.5;
      
      // Screen boundaries
      if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
      }
      
      // Sample from children passed through (using original UVs)
      vec4 color = vec4(0.1, 0.1, 0.1, 1.0);
      
      // Add scanlines
      color.rgb += scanline(uv);
      
      // Add subtle RGB separation
      float r = color.r;
      float g = color.g;
      float b = color.b;
      color.r = r + 0.01 * sin(time);
      color.g = g + 0.01 * sin(time + 2.0);
      color.b = b + 0.01 * sin(time + 4.0);
      
      // Add noise
      color.rgb += noise(uv + time * 0.1) * 0.03;
      
      // Vignette effect
      float vignette = 1.0 - dot(curvedUv - 0.5, curvedUv - 0.5) * 1.0;
      color.rgb *= vignette;
      
      gl_FragColor = vec4(color.rgb, opacity);
    }
  `
);

// Register the material with Three.js - IMPORTANT: This needs to be outside the component
extend({ CrtShaderMaterial });

// Declare the JSX element type to match the extended material name
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'crtShaderMaterial': any
    }
  }
}

interface CRTEffectProps {
  children: React.ReactNode;
}

const CRTEffect: React.FC<CRTEffectProps> = ({ children }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[3.8, 2.8]} />
      <crtShaderMaterial ref={materialRef} transparent opacity={0.98} />
      {children}
    </mesh>
  );
};

export default CRTEffect;