
import { Vector3, Color } from 'three';
import { ThreeElements } from '@react-three/fiber';

export enum TreeState {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED'
}

export interface ParticleData {
  chaosPos: Vector3;
  targetPos: Vector3;
  currentPos: Vector3;
  color: Color;
  size: number;
  speed: number;
}

export interface OrnamentData {
  chaosPos: Vector3;
  targetPos: Vector3;
  rotation: Vector3;
  scale: number;
  type: 'box' | 'ball' | 'light';
  color: Color;
}

// Augment the global JSX namespace to include React Three Fiber elements.
// This resolves errors where Three.js tags (like <mesh />, <group />, etc.) are not recognized by TypeScript.
// By extending ThreeElements, we inherit all standard Three.js object definitions.
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      // Fallback for any other custom elements or R3F specific ones like <primitive />
      [elemName: string]: any;
    }
  }

  // Also augment the React.JSX namespace to support environments using the modern JSX transform (React 18+).
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
        [elemName: string]: any;
      }
    }
  }
}
