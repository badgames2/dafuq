export function initializeMenu() {
    const menuButton = document.getElementById('menu-button');
    const closeButton = document.getElementById('close-menu');
    const sideMenu = document.getElementById('side-menu');
    const menuItems = document.querySelectorAll('.side-menu li');

    menuButton.addEventListener('click', () => {
        sideMenu.classList.add('open');
    });

    closeButton.addEventListener('click', () => {
        sideMenu.classList.remove('open');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-tab');
            showTab(tab);
            sideMenu.classList.remove('open');
        });
    });
}

function showTab(tabName) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}