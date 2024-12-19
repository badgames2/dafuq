import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

let scene, camera, renderer, text;

export function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Load font and create text
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const textGeometry = new TextGeometry('BAD GAMES', {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        const textMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.2
        });

        text = new THREE.Mesh(textGeometry, textMaterial);
        textGeometry.center();
        scene.add(text);

        addChristmasHat();
    });

    camera.position.z = 5;
    animate();

    // Make text interactive
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    document.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', (event) => {
        if (isDragging && text) {
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };

            text.rotation.y += deltaMove.x * 0.01;
            text.rotation.x += deltaMove.y * 0.01;
        }

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });
}

function addChristmasHat() {
    const hatGeometry = new THREE.ConeGeometry(0.2, 0.4, 32);
    const hatMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(-1.2, 0.5, 0);
    hat.rotation.z = -0.2;
    scene.add(hat);

    const pomGeometry = new THREE.SphereGeometry(0.08);
    const pomMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const pom = new THREE.Mesh(pomGeometry, pomMaterial);
    pom.position.set(-1.3, 0.7, 0);
    scene.add(pom);
}

function animate() {
    requestAnimationFrame(animate);
    if (text) {
        text.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
}