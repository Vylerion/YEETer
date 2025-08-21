"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 8, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    currentMount.appendChild(renderer.domElement);
    
    // Post-processing for glow effect
    const renderScene = new RenderPass( scene, camera );
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 0;
    bloomPass.strength = 1.2;
    bloomPass.radius = 0.5;

    const composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Objects
    const interactiveObjects: THREE.Object3D[] = [];
    const objectBaseY: Map<string, number> = new Map();

    const addLabel = (text: string, position: THREE.Vector3) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if(!context) return;
        
        const fontSize = 48;
        context.font = `bold ${fontSize}px "PT Sans"`;
        const textWidth = context.measureText(text).width;
        
        canvas.width = textWidth + 20;
        canvas.height = fontSize + 20;
        
        context.font = `bold ${fontSize}px "PT Sans"`;
        context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);

        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(canvas.width/100, canvas.height/100, 1.0);
        sprite.position.copy(position);
        scene.add(sprite);
    }
    
    const items = [
        { url: '/insurance', label: 'Insurance', color: 0xc62828, geometry: new THREE.BoxGeometry(3, 2.5, 3.5), y: 1.25, labelY: 3.5 },
        { url: '/market', label: 'Market', color: 0x66bb6a, geometry: new THREE.ConeGeometry(0.7, 1.5, 8), y: 0.75, labelY: 2.5 },
        { url: '/mortgage', label: 'Mortgage', color: 0x78909c, geometry: new THREE.BoxGeometry(2, 4, 2), y: 2, labelY: 5 },
        { url: '/charity', label: 'Charity', color: 0xFFD700, geometry: new THREE.BoxGeometry(2.5, 1.5, 1.8), y: 0.75, labelY: 2.5 },
        { url: '/contact', label: 'Contact', color: 0xffffff, geometry: new THREE.PlaneGeometry(2.5, 1.5), y: 0.75, labelY: 2.5 },
        { url: '/about', label: 'About', color: 0x42a5f5, geometry: new THREE.TorusGeometry(1, 0.2, 16, 100), y: 1.2, labelY: 3.2 },
        { url: '/', label: 'Logout', color: 0xef5350, geometry: new THREE.CylinderGeometry(1, 1, 0.5, 32), y: 0.25, labelY: 2 }
    ];

    const radius = 10;
    const angleStep = (Math.PI * 2) / items.length;

    items.forEach((itemData, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        const material = new THREE.MeshStandardMaterial({ 
            color: itemData.color,
            side: itemData.label === 'Contact' ? THREE.DoubleSide : THREE.FrontSide
        });

        const mesh = new THREE.Mesh(itemData.geometry, material);
        mesh.position.set(x, itemData.y, z);
        mesh.userData = { url: itemData.url, label: itemData.label, originalColor: new THREE.Color(itemData.color) };
        scene.add(mesh);
        interactiveObjects.push(mesh);
        const labelPosition = new THREE.Vector3(x, itemData.labelY, z);
        addLabel(itemData.label, labelPosition);
        
        objectBaseY.set(mesh.uuid, mesh.position.y);
    });

    const floor = new THREE.Mesh(
        new THREE.CircleGeometry(20, 64),
        new THREE.MeshStandardMaterial({ color: 0x9ccc65, roughness: 1 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);


    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10); // Initialize off-screen
    let intersected: THREE.Object3D | null = null;

    const onMouseMove = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
        if (intersected && intersected.userData.url) {
            router.push(intersected.userData.url);
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects);

        // Reset previous intersected object
        if (intersected && (intersects.length === 0 || intersects[0].object !== intersected)) {
             (intersected as THREE.Mesh).material.emissive.setHex(0x000000);
            intersected = null;
            document.body.style.cursor = 'default';
        }

        if (intersects.length > 0) {
            if (intersected !== intersects[0].object) {
                intersected = intersects[0].object;
                document.body.style.cursor = 'pointer';
                (intersected as THREE.Mesh).material.emissive.setHex(0x555555);
            }
        }

        interactiveObjects.forEach(obj => {
            const baseY = objectBaseY.get(obj.uuid) || 0;
            const targetY = (intersected === obj) ? baseY + 0.5 : baseY;
            obj.position.y += (targetY - obj.position.y) * 0.1;
            obj.rotation.y = Math.sin(elapsedTime * 0.5 + obj.position.x) * 0.2;
        });

        composer.render();
    };
    animate();

    const onResize = () => {
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        composer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('click', onClick);
        if(currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
        document.body.style.cursor = 'default';
    };
  }, [router]);

  return <div ref={mountRef} className="h-full w-full" />;
};

export default ThreeCanvas;
