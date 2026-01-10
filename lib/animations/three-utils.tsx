/**
 * Three.js Utilities for 3D Animations
 * Advanced 3D elements and interactions for showcasing agency capabilities
 */

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Scroll-controlled camera
 */
export const ScrollCamera = () => {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    camera.position.y = scroll.offset * 10; // Adjust based on your needs
  });

  return null;
};

/**
 * Rotating mesh component
 */
export const RotatingMesh = ({
  position,
  color = '#ff6b35',
}: {
  position: [number, number, number];
  color?: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

/**
 * Particle system
 */
export const ParticleSystem = ({ count = 1000 }: { count?: number }) => {
  const meshRef = useRef<THREE.Points>(null);
  const particles = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (!particles.current) {
      particles.current = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        particles.current[i] = (Math.random() - 0.5) * 10;
      }
    }
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  if (!particles.current) return null;

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ff6b35" />
    </points>
  );
};

/**
 * Scroll-controlled 3D scene wrapper
 */
export const Scroll3DScene = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full h-screen ${className || ''}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <ScrollCamera />
        {children}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

/**
 * 3D gradient background effect
 */
export const GradientBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            vec3 color1 = vec3(0.0, 0.0, 0.0); // Black
            vec3 color2 = vec3(1.0, 0.42, 0.21); // Orange (#ff6b35)
            float mixValue = (vUv.x + vUv.y) / 2.0;
            vec3 color = mix(color1, color2, mixValue);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

