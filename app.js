document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category');

    // Fetch all Pokémon types from the API
    fetch('https://pokeapi.co/api/v2/type/')
        .then(response => response.json())
        .then(data => {
            const types = data.results;

            // Populate the dropdown with types
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type.name;
                option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching Pokémon types:', error));
});

document.getElementById('pokemonForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const numOfCards = parseInt(document.getElementById('numOfCards').value);
    const category = document.getElementById('category').value;

    const pokemonCardsContainer = document.getElementById('pokemonCards');
    pokemonCardsContainer.innerHTML = ''; // Clear previous cards

    // Fetch Pokémon by ID and check if the type matches the selected category
    let count = 0;
    let id = 1;

    const fetchPokemon = () => {
        if (count >= numOfCards) return;

        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
            .then(pokemon => {
                // Check if Pokémon has the selected type
                const pokemonTypes = pokemon.types.map(typeInfo => typeInfo.type.name);

                if (pokemonTypes.includes(category)) {
                    count++;
                    const pokemonCard = document.createElement('div');
                    pokemonCard.classList.add('pokemon-card');
                    pokemonCard.innerHTML = `
                        <h3>${pokemon.name.toUpperCase()}</h3>
                        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                        <p>Type: ${pokemonTypes.join(', ')}</p>
                    `;
                    pokemonCardsContainer.appendChild(pokemonCard);
                }

                id++;
                fetchPokemon();
            })
            .catch(error => console.error('Error fetching Pokémon:', error));
    };

    // Start fetching
    fetchPokemon();
});
