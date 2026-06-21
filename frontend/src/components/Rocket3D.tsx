import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// @ts-ignore
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export function Rocket3D({ scale = 1, rotation = [0, 0, 0], isSteady = false }: { scale?: number, rotation?: [number, number, number], isSteady?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSteadyRef = useRef(isSteady);

  useEffect(() => {
    isSteadyRef.current = isSteady;
  }, [isSteady]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 2000);
    // Positioned to view the rocket upright
    camera.position.set(0, -20, 30);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // Render internally at exactly 512x512 (crisp quality) but hard-cap devicePixelRatio to 1
    // to prevent retina displays from rendering 1536x1536 (2.3 million pixels) which causes lag.
    renderer.setSize(512, 512, false);
    renderer.domElement.style.width = '512px';
    renderer.domElement.style.height = '512px';
    renderer.setPixelRatio(1);

    // Append canvas to DOM
    containerRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(10, 10, 5);
    scene.add(dirLight);

    let rocket: THREE.Group | null = null;

    // 5. Load OBJ + MTL
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('/rocket1/rocket_v1_L1.123cd2c0a4e1-4c91-4403-b771-7c1ece7ac0c4/');
    mtlLoader.load('12217_rocket_v1_l1.mtl', (materials: any) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('/rocket1/rocket_v1_L1.123cd2c0a4e1-4c91-4403-b771-7c1ece7ac0c4/');
      objLoader.load('12217_rocket_v1_l1.obj', (object: any) => {
        // Auto-center and normalize the object
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center the raw object
        object.position.x = -center.x;
        object.position.y = -center.y;
        object.position.z = -center.z;

        // Create a wrapper group for rotation and scaling
        const wrapper = new THREE.Group();
        wrapper.add(object);

        // Normalize scale so the largest dimension is '10' (scaled by props)
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 15 * scale; // Base size of 15
        const s = maxDim > 0 ? targetSize / maxDim : scale;

        wrapper.scale.set(s, s, s);

        // Apply rotation to the wrapper
        wrapper.rotation.set(rotation[0], rotation[1], rotation[2]);

        scene.add(wrapper);
        rocket = wrapper;
      });
    });

    // 6. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Add a slight idle floating animation
      if (rocket) {
        if (isSteadyRef.current) {
          rocket.position.y = 0;
        } else {
          const t = clock.getElapsedTime();
          rocket.position.y = Math.sin(t * 2) * 0.1;
        }
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
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, []); // Empty dependency array ensures the heavy 3D model only mounts exactly ONCE and never reloads/blinks during parent state updates!

  return <div ref={containerRef} className="w-full h-full flex items-center justify-center" />;
}
