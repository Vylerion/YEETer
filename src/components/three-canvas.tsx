"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF5F5DC); // light beige background from globals.css

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 15);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

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

    // Barn (Insurance)
    const barn = new THREE.Mesh(new THREE.BoxGeometry(3, 2.5, 3.5), new THREE.MeshStandardMaterial({ color: 0xc62828 }));
    barn.position.set(-10, 1.25, 0);
    barn.userData = { url: '/insurance', label: 'Insurance' };
    scene.add(barn);
    interactiveObjects.push(barn);
    addLabel('Insurance', new THREE.Vector3(-10, 3.5, 0));


    // Seedling (Market)
    const seedling = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.5, 8), new THREE.MeshStandardMaterial({ color: 0x66bb6a }));
    seedling.position.set(-5, 0.75, 0);
    seedling.userData = { url: '/market', label: 'Market' };
    scene.add(seedling);
    interactiveObjects.push(seedling);
    addLabel('Market', new THREE.Vector3(-5, 2.5, 0));

    // Building (Mortgage)
    const building = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 2), new THREE.MeshStandardMaterial({ color: 0x78909c }));
    building.position.set(0, 2, 0);
    building.userData = { url: '/mortgage', label: 'Mortgage' };
    scene.add(building);
    interactiveObjects.push(building);
    addLabel('Mortgage', new THREE.Vector3(0, 5, 0));

    // Tractor (Charity)
    const tractor = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 1.8), new THREE.MeshStandardMaterial({ color: 0xFFD700 }));
    tractor.position.set(5, 0.75, 0);
    tractor.userData = { url: '/charity', label: 'Charity' };
    scene.add(tractor);
    interactiveObjects.push(tractor);
    addLabel('Charity', new THREE.Vector3(5, 2.5, 0));

    // Envelope (Contact)
    const envelope = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.5), new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
    envelope.position.set(10, 0.75, 0);
    envelope.userData = { url: '/contact', label: 'Contact' };
    scene.add(envelope);
    interactiveObjects.push(envelope);
    addLabel('Contact', new THREE.Vector3(10, 2.5, 0));

    // About Sign
    const aboutSign = new THREE.Mesh(new THREE.TorusGeometry(1, 0.2, 16, 100), new THREE.MeshStandardMaterial({ color: 0x42a5f5 }));
    aboutSign.position.set(0, 1.2, -5);
    aboutSign.userData = { url: '/about', label: 'About' };
    scene.add(aboutSign);
    interactiveObjects.push(aboutSign);
    addLabel('About', new THREE.Vector3(0, 3.2, -5));
    
    interactiveObjects.forEach(obj => objectBaseY.set(obj.uuid, obj.position.y));

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
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

        if (intersects.length > 0) {
            if (intersected !== intersects[0].object) {
                intersected = intersects[0].object;
                document.body.style.cursor = 'pointer';
            }
        } else {
            if (intersected) {
                intersected = null;
                document.body.style.cursor = 'default';
            }
        }

        interactiveObjects.forEach(obj => {
            const baseY = objectBaseY.get(obj.uuid) || 0;
            const targetY = (intersected === obj) ? baseY + 0.5 : baseY;
            obj.position.y += (targetY - obj.position.y) * 0.1;
            obj.rotation.y = Math.sin(elapsedTime * 0.5 + obj.position.x) * 0.2;
        });

        renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
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