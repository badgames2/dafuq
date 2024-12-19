import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { createBackground } from './background.js';
import { initializeMenu } from './menu.js';
import { setupProxyBrowser } from './tabs/proxy.js';
import { setupGames } from './tabs/games.js';
import { setupChat } from './tabs/chat.js';
import { setupSettings } from './tabs/settings.js';

// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('logo-container').appendChild(renderer.domElement);

// Setup lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Load font and create text
const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function(font) {
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
        color: 0x00ff88,
        metalness: 0.3,
        roughness: 0.4
    });
    
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textGeometry.center();
    scene.add(textMesh);
    
    // Add Christmas hat
    const hatGeometry = new THREE.ConeGeometry(0.2, 0.4, 32);
    const hatMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(-0.8, 0.4, 0);
    hat.rotation.z = -0.3;
    scene.add(hat);
});

camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Initialize interactive background
createBackground();

// Initialize menu and tabs
initializeMenu();
setupProxyBrowser();
setupGames();
setupChat();
setupSettings();