"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const startPosition = new THREE.Vector3(0, 25, 25);
    const endPosition = new THREE.Vector3(0, 8, 18);
    camera.position.copy(startPosition);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevents camera from going below the ground
    
    // Fallback if HDRI fails to load
    scene.background = new THREE.Color(0x87CEEB);
    
    // Post-processing for a subtle glow effect
    const renderScene = new RenderPass( scene, camera );
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = 0.9;
    bloomPass.strength = 0.5;
    bloomPass.radius = 0.5;

    const composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
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
        context.font = `bold ${fontSize}px sans-serif`;
        const textWidth = context.measureText(text).width;
        
        canvas.width = textWidth + 20;
        canvas.height = fontSize + 20;
        
        context.font = `bold ${fontSize}px sans-serif`;
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
    const barn = new THREE.Group();
    const barnBase = new THREE.Mesh(
      new THREE.BoxGeometry(3, 2.5, 3.5),
      new THREE.MeshStandardMaterial({ color: 0xc62828 })
    );
    const barnRoof = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 2.5, 2, 4, 1),
      new THREE.MeshStandardMaterial({ color: 0x8d6e63 })
    );
    barnRoof.position.y = 2.25;
    barnRoof.rotation.y = Math.PI / 4;
    barn.add(barnBase);
    barn.add(barnRoof);
    
    // Seedling (Market)
    const seedling = new THREE.Group();
    const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8),
        new THREE.MeshStandardMaterial({ color: 0x66bb6a })
    );
    const leaf1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x66bb6a })
    );
    leaf1.position.y = 0.75;
    leaf1.position.x = 0.4;
    leaf1.scale.y = 0.3;
    const leaf2 = leaf1.clone();
    leaf2.position.x = -0.4;
    seedling.add(stem);
    seedling.add(leaf1);
    seedling.add(leaf2);

    // Building (Mortgage)
    const building = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 2), new THREE.MeshStandardMaterial({ color: 0x78909c }));
    
    // Tractor (Charity)
    const tractor = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 1.8), new THREE.MeshStandardMaterial({ color: 0xFFD700 }));
    const wheel1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.2, 16), new THREE.MeshStandardMaterial({ color: 0x333333 }));
    wheel1.position.set(-1, -0.5, 1);
    wheel1.rotation.x = Math.PI / 2;
    const wheel2 = wheel1.clone();
    wheel2.position.set(1, -0.5, 1);
    const wheel3 = wheel1.clone();
    wheel3.scale.set(0.6, 0.6, 0.6);
    wheel3.position.set(-1, -0.5, -1);
    const wheel4 = wheel3.clone();
    wheel4.position.set(1, -0.5, -1);
    tractor.add(body, wheel1, wheel2, wheel3, wheel4);


    // Envelope (Contact)
    const envelope = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.5), new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide }));

    const items = [
        { url: '/insurance', label: 'Insurance', object: barn, y: 1.25, labelY: 4 },
        { url: '/market', label: 'Market', object: seedling, y: 0.75, labelY: 2.5 },
        { url: '/mortgage', label: 'Mortgage', object: building, y: 2, labelY: 5 },
        { url: '/charity', label: 'Charity', object: tractor, y: 1.0, labelY: 2.5 },
        { url: '/contact', label: 'Contact', object: envelope, y: 0.75, labelY: 2.5 },
        { url: '/about', label: 'About', object: new THREE.Mesh(new THREE.TorusGeometry(1, 0.2, 16, 100), new THREE.MeshStandardMaterial({color: 0x42a5f5})), y: 1.2, labelY: 3.2 },
        { url: '/', label: 'Logout', object: new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.5, 32), new THREE.MeshStandardMaterial({color: 0xef5350})), y: 0.25, labelY: 2 }
    ];

    const radius = 10;
    const angleStep = (Math.PI * 2) / items.length;

    items.forEach((itemData, index) => {
        const angle = index * angleStep;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        const object = itemData.object;
        object.position.set(x, itemData.y, z);
        object.userData = { url: itemData.url, label: itemData.label };
        if (object instanceof THREE.Mesh) {
            object.userData.originalColor = (object.material as THREE.MeshStandardMaterial).color.clone();
        }
        scene.add(object);
        interactiveObjects.push(object);
        const labelPosition = new THREE.Vector3(x, itemData.labelY, z);
        addLabel(itemData.label, labelPosition);
        objectBaseY.set(object.uuid, object.position.y);
    });

    const floor = new THREE.Mesh(
        new THREE.CircleGeometry(20, 64),
        new THREE.MeshStandardMaterial({ color: 0x9ccc65, roughness: 0.5, metalness: 0.1 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);


    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10); // Initialize off-screen
    let intersected: THREE.Object3D | null = null;
    let isDragging = false;
    let startMouseX = 0;
    let startMouseY = 0;


    const onMouseDown = (event: MouseEvent) => {
      isDragging = false;
      startMouseX = event.clientX;
      startMouseY = event.clientY;
    }

    const onMouseMove = (event: MouseEvent) => {
        if (Math.abs(event.clientX - startMouseX) > 5 || Math.abs(event.clientY - startMouseY) > 5) {
            isDragging = true;
        }

        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
        if (!isDragging && intersected && intersected.userData.url) {
            router.push(intersected.userData.url);
        }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const clock = new THREE.Clock();
    let animationProgress = 0;
    const animationDuration = 2; // in seconds

    const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        
        if (animationProgress < 1) {
            animationProgress += delta / animationDuration;
            animationProgress = Math.min(animationProgress, 1); // Clamp at 1
            const easeProgress = 1 - Math.pow(1 - animationProgress, 3); // easeOutCubic
            camera.position.lerpVectors(startPosition, endPosition, easeProgress);
            controls.enabled = false; // Disable controls during animation
        } else {
            controls.enabled = true;
        }

        controls.update();
        const elapsedTime = clock.getElapsedTime();

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveObjects, true);

        // Reset previous intersected object
        if (intersected && (intersects.length === 0 || intersects[0].object.parent?.userData?.url !== intersected.userData.url)) {
            (intersected as THREE.Mesh).traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                     child.material.emissive.setHex(0x000000);
                }
            });
            intersected = null;
            document.body.style.cursor = 'default';
        }

        if (intersects.length > 0 && !isDragging) {
            let topLevelObject = intersects[0].object;
            while(topLevelObject.parent && !topLevelObject.userData.url) {
                topLevelObject = topLevelObject.parent;
            }

            if (topLevelObject.userData.url && intersected !== topLevelObject) {
                // Clear previous intersection
                if (intersected) {
                     (intersected as THREE.Mesh).traverse((child) => {
                        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                             child.material.emissive.setHex(0x000000);
                        }
                    });
                }
                intersected = topLevelObject;
                document.body.style.cursor = 'pointer';
                 (intersected as THREE.Mesh).traverse((child) => {
                    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                        child.material.emissive.setHex(0xaaaaaa);
                    }
                });
            }
        } else if (isDragging) {
             if (intersected) {
                (intersected as THREE.Mesh).traverse((child) => {
                    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                         child.material.emissive.setHex(0x000000);
                    }
                });
                intersected = null;
                document.body.style.cursor = 'default';
            }
        }

        interactiveObjects.forEach(obj => {
            const baseY = objectBaseY.get(obj.uuid) || 0;
            const targetY = (intersected === obj) ? baseY + 0.5 + Math.sin(elapsedTime * 2) * 0.25 : baseY;
            obj.position.y += (targetY - obj.position.y) * 0.1;

            if (intersected === obj) {
                obj.rotation.y += 0.01;
            } else {
                obj.rotation.y += (Math.sin(elapsedTime * 0.5 + obj.position.x) * 0.2 - obj.rotation.y) * 0.05;
            }
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
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('click', onClick);
        controls.dispose();
        if(currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
        document.body.style.cursor = 'default';
    };
  }, [router]);

  return <div ref={mountRef} className="h-full w-full" />;
};

export default ThreeCanvas;
