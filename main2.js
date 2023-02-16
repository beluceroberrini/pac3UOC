const listaPokemon = document.querySelector('#listaPokemon');
const input = document.querySelector('.input');

window.addEventListener('load', e =>{
    e.preventDefault()
    
    let offset = Math.floor(Math.random() * 100);
    let limit = 10;

    fetchPokemons(offset, limit)

})

input.addEventListener('keypress', e =>{
    if(e.key === 'Enter'){
        e.preventDefault();
        
        let limit = parseInt(e.target.value)    
        let offset = Math.floor(Math.random() * 100);

        fetchPokemons(offset, limit);
    }
})

function fetchPokemons(offset, limit) {
    listaPokemon.innerHTML = '';
    input.innerHTML = '';
    for (let i = offset; i < offset + limit; i++) {
        fetchPokemon(i);
    }

}

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        mostrarPokemon(data);
      })
      .catch(error => console.error(error));
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div')
    card.classList.add('card');

    const divFrontCard = document.createElement('div');
    divFrontCard.classList.add('cardFront');
    divFrontCard.innerHTML = `
    <div class="pokemon-imagen">
    <img src="${poke.sprites.other["official-artwork"].front_default}"
    alt="${poke.name}">
    </div>
    <section class="pokemon-info">
    <div class="nombre-contenedor">
    <p class="pokemon-id">#00${poke.id}</p>
    <h2 class="pokemon-nombre">${poke.name}</h2>
    </div>
    <div class="pokemon-tipos">
    ${tipos}
    </div>
    
    </section>
    </div> 
    `;
    
    card.appendChild(divFrontCard);

    const divBackCard = document.createElement('div');
    divBackCard.classList.add('cardBack');

    divBackCard.append(backInfo(poke))

    cardContainer.appendChild(card);
    cardContainer.appendChild(divBackCard);
    listaPokemon.appendChild(flipCard);

}

function backInfo(poke) {
    
    let abilities = poke.abilities.map((ability) => `<p class="stat">${ability.ability.name}</p>`);
    abilities = abilities.join('');
    
    const backInfoCard = document.createElement('div');
    backInfoCard.classList.add('backInfo');
    backInfoCard.innerHTML = `
    <div class="flipped">
        <div class="pokemon-imagen">
            <img src="${poke.sprites.back_default}"
            alt="${poke.name}">
            </div>
            <section class="pokemon-info">
            <div class="pokemon-stats">
            <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}Kg</p>
            <p class="stat">${poke.base_experience}EXP</p>
            </div>
            <div class="pokemon-tipos">
                ${abilities}
            </div>
            </section>
         </div> 
    </div>     
    `;
    
    return backInfoCard;
}

const darkMode = document.querySelector('.myButton')
const icon = document.querySelector('.icon')
const light = document.querySelector('.light')

const prefresDarkScheme = window.matchMedia('(prefers-color-scheme: light)')

darkMode.addEventListener('click', () => {
    if (prefresDarkScheme.matches) {
        document.body.classList.toggle('dark-theme')

    } else {
        document.body.classList.toggle('light-theme')     
    }
})
