
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  zoomFactor: number; // 0 to 1
}

export const CameraRig: React.FC<CameraRigProps> = ({ zoomFactor }) => {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3(0, 10, 0)); // Look higher for larger tree

  useFrame((state, delta) => {
    // Zoom levels: Adjusted for 2x tree height.
    // Far (120) to Close (40)
    const targetZ = THREE.MathUtils.lerp(120, 40.0, zoomFactor);
    
    const t = state.clock.getElapsedTime();
    const xOffset = Math.sin(t * 0.15) * 4;
    const yOffset = Math.cos(t * 0.1) * 3;

    // Target position with float
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, xOffset, delta * 0.5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 10 + yOffset, delta * 0.5);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 1.5);
    
    // Always look at the tree center (shifted up)
    camera.lookAt(lookAtVec.current);
  });

  return null;
};
