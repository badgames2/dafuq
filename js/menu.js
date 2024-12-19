export function initMenu() {
    const menuButton = document.querySelector('.menu-button');
    const sideMenu = document.querySelector('.side-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuButton.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
        menuButton.textContent = sideMenu.classList.contains('open') ? 'Close Menu' : 'Open Menu';
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            showSection(section);
        });
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${sectionId}-section`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}