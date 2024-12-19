export function setupGames() {
    const searchInput = document.getElementById('game-search');
    const gamesGrid = document.querySelector('.games-grid');
    const filterButtons = document.querySelectorAll('.filter-buttons button');

    const games = [
        {
            name: "Snake",
            category: "arcade",
            icon: "https://placehold.co/100x100?text=Snake",
            url: "#"
        }
        // Add more games here
    ];

    function renderGames(filteredGames) {
        gamesGrid.innerHTML = filteredGames.map(game => `
            <div class="game-card" data-category="${game.category}">
                <img src="${game.icon}" alt="${game.name}">
                <h3>${game.name}</h3>
                <button onclick="window.location.href='${game.url}'">Play</button>
            </div>
        `).join('');
    }

    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = games.filter(game => 
            game.name.toLowerCase().includes(searchTerm)
        );
        renderGames(filtered);
    });

    filterButtons?.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            const filtered = filter === 'all' 
                ? games 
                : games.filter(game => game.category === filter);
            renderGames(filtered);
        });
    });

    // Initial render
    renderGames(games);
}