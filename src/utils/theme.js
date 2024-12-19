export function applyTheme(settings) {
    const root = document.documentElement;
    
    // Apply colors
    if (settings.primaryColor) {
        root.style.setProperty('--primary-color', settings.primaryColor);
    }
    if (settings.accentColor) {
        root.style.setProperty('--accent-color', settings.accentColor);
    }

    // Apply dark/light mode
    if (settings.darkMode) {
        document.body.classList.toggle('dark-mode', settings.darkMode === 'true');
    }

    // Apply particle settings to background
    if (settings.particleCount || settings.particleSize) {
        window.dispatchEvent(new CustomEvent('updateParticles', { 
            detail: { 
                count: settings.particleCount, 
                size: settings.particleSize 
            } 
        }));
    }

    // Apply quality settings
    if (settings.quality) {
        updateQuality(settings.quality);
    }
}

function updateQuality(quality) {
    switch (quality) {
        case 'low':
            // Reduce particle count, disable some effects
            window.dispatchEvent(new CustomEvent('updateQuality', { 
                detail: { particleCount: 50, effects: false } 
            }));
            break;
        case 'medium':
            window.dispatchEvent(new CustomEvent('updateQuality', { 
                detail: { particleCount: 100, effects: true } 
            }));
            break;
        case 'high':
            window.dispatchEvent(new CustomEvent('updateQuality', { 
                detail: { particleCount: 200, effects: true } 
            }));
            break;
    }
}