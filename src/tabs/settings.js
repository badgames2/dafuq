import { applyTheme } from '../utils/theme.js';

export function setupSettings() {
    const settingsTab = document.createElement('div');
    settingsTab.id = 'settings-tab';
    settingsTab.className = 'tab-content';
    
    settingsTab.innerHTML = `
        <div class="settings-container">
            <div class="settings-group">
                <h3>Theme</h3>
                <div class="setting-item">
                    <label>Primary Color</label>
                    <input type="color" id="primary-color" value="#2a2a2a">
                </div>
                <div class="setting-item">
                    <label>Accent Color</label>
                    <input type="color" id="accent-color" value="#00ff88">
                </div>
                <div class="setting-item">
                    <label>Dark Mode</label>
                    <input type="checkbox" id="dark-mode" checked>
                </div>
            </div>
            <div class="settings-group">
                <h3>Particles</h3>
                <div class="setting-item">
                    <label>Number of Particles</label>
                    <input type="range" id="particle-count" min="50" max="200" value="100">
                </div>
                <div class="setting-item">
                    <label>Particle Size</label>
                    <input type="range" id="particle-size" min="1" max="5" value="2">
                </div>
            </div>
            <div class="settings-group">
                <h3>Performance</h3>
                <div class="setting-item">
                    <label>Quality</label>
                    <select id="quality">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(settingsTab);

    // Initialize settings handlers
    const settings = {
        primaryColor: document.getElementById('primary-color'),
        accentColor: document.getElementById('accent-color'),
        darkMode: document.getElementById('dark-mode'),
        particleCount: document.getElementById('particle-count'),
        particleSize: document.getElementById('particle-size'),
        quality: document.getElementById('quality')
    };

    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    Object.entries(savedSettings).forEach(([key, value]) => {
        if (settings[key]) {
            settings[key].value = value;
        }
    });

    // Apply settings on change
    Object.entries(settings).forEach(([key, element]) => {
        element.addEventListener('change', () => {
            const newSettings = {
                ...savedSettings,
                [key]: element.value
            };
            localStorage.setItem('settings', JSON.stringify(newSettings));
            applyTheme(newSettings);
        });
    });
}