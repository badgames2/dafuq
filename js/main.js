import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { initScene } from './scene.js';
import { initMenu } from './menu.js';
import { initBackground } from './background.js';
import { setupProxyBrowser } from '../src/tabs/proxy.js';
import { setupGames } from '../src/tabs/games.js';
import { setupChat } from '../src/tabs/chat.js';
import { setupSettings } from '../src/tabs/settings.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    initScene();
    initMenu();
    initBackground();
    setupProxyBrowser();
    setupGames();
    setupChat();
    setupSettings();
});