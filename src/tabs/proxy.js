export function setupProxyBrowser() {
    const proxyInput = document.getElementById('proxy-input');
    const proxyFrame = document.getElementById('proxy-frame');

    proxyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            let url = proxyInput.value;
            if (!url.startsWith('http')) {
                url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
            }
            proxyFrame.src = url;
        }
    });
}