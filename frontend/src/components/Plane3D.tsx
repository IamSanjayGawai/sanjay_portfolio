import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// @ts-ignore — OBJLoader types missing in @types/three@0.160 but the module exists at runtime
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// @ts-ignore — MTLLoader types missing in @types/three@0.160 but the module exists at runtime
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export function Plane3D({ scale = 1, rotation = [0, 0, 0] }: { scale?: number, rotation?: [number, number, number] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    // Perfect top-down view from above the plane
    camera.position.set(0, 20, 0);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // Massive container size (512px) to prevent ANY cropping during diagonal rotation
    renderer.setSize(512, 512);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append canvas to DOM
    containerRef.current.appendChild(renderer.domElement);

    // 4. Lights - slightly dimmed so the textures and 3D shadows show up better
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 10, 5);
    scene.add(dirLight);

    let airplane: THREE.Group | null = null;

    // 5. Load OBJ + MTL
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/airplane3d/11805_airplane_v2_L2.mtl', (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);

      objLoader.load('/airplane3d/11805_airplane_v2_L2.obj', (object) => {
        object.scale.set(scale, scale, scale);
        // Apply default rotation + the props rotation
        object.rotation.set(rotation[0], rotation[1], rotation[2]);
        scene.add(object);
        airplane = object;
      });
    });

    // 6. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Add a slight banking/floating idle animation
      if (airplane) {
        const t = clock.getElapsedTime();
        airplane.position.y = Math.sin(t * 2) * 0.1;
        // Float the Z rotation slightly
        airplane.rotation.z = rotation[2] + Math.sin(t * 1.5) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // Force dispose WebGL context to prevent Context Lost crashes!
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, [scale, rotation]);

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center" />;
}
