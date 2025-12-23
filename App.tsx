
import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { TreeState } from './types';
import { LuxuryTree } from './components/LuxuryTree';
import { GoldDust } from './components/GoldDust';
import { GoldenSpirals } from './components/GoldenSpirals';
import { AmbientParticles } from './components/AmbientParticles';
import { BackgroundHeader } from './components/BackgroundHeader';
import { CameraRig } from './components/CameraRig';
import { GroundRipples } from './components/GroundRipples';
import { AnnouncementBoard } from './components/AnnouncementBoard';

const App: React.FC = () => {
  // Tree is permanently in FORMED state
  const [treeState] = useState<TreeState>(TreeState.FORMED);
  // Adjusted zoom to accommodate the 2x larger tree
  const [zoomFactor] = useState(0.4); 
  const [userTextureUrls, setUserTextureUrls] = useState<string[]>([]);
  
  const rotationVelocity = useRef(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const giftId = params.get('id');

    if (giftId) {
        fetch(`/api/get-gift?id=${giftId}`)
            .then(res => {
                if (!res.ok) throw new Error("Gift not found");
                return res.json();
            })
            .then(data => {
                if (data.photoUrls && Array.isArray(data.photoUrls)) {
                    setUserTextureUrls(data.photoUrls);
                }
            })
            .catch(err => {
                console.error("Failed to load gift:", err);
            });
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden touch-none">
      
      {/* Announcements Layer (Topmost) */}
      <AnnouncementBoard />

      <BackgroundHeader />

      <div className="absolute inset-0 z-10">
          <Canvas 
            dpr={[1, 1.5]} 
            gl={{ 
              antialias: true, 
              toneMappingExposure: 1.2, 
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <fog attach="fog" args={['#000000', 30, 150]} />

            <PerspectiveCamera makeDefault position={[0, 8, 50]} fov={45} />
            <CameraRig zoomFactor={zoomFactor} />

            <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#222222" />
            <ambientLight intensity={0.2} />
            
            <spotLight 
                position={[40, 80, 40]} 
                angle={0.4} 
                penumbra={1} 
                intensity={200} 
                color="#fff5d7" 
                castShadow 
            />
            
            <Suspense fallback={null}>
                <Environment preset="city" />
            </Suspense>

            <AmbientParticles />
            
            {/* Ground ripples scaled to match larger tree footprint */}
            <Suspense fallback={null}>
                <GroundRipples treeState={treeState} />
            </Suspense>

            {/* Tree Body Assembly - Scaled 2x */}
            <group scale={2} position={[0, -5, 0]}>
                <GoldDust treeState={treeState} />
                <GoldenSpirals treeState={treeState} />
                
                <Suspense fallback={null}>
                    <LuxuryTree 
                      treeState={treeState} 
                      extraRotationVelocity={rotationVelocity}
                      userTextureUrls={userTextureUrls}
                      isPhotoFocused={false}
                      zoomFactor={zoomFactor}
                    />
                </Suspense>
            </group>

            <EffectComposer enableNormalPass={false} multisampling={4}>
                <Bloom 
                    luminanceThreshold={1.0} 
                    mipmapBlur 
                    intensity={1.2} 
                    radius={0.4}
                />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
          </Canvas>
      </div>
    </div>
  );
};

export default App;
