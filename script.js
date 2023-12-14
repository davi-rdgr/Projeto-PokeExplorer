// Função para capitalizar a primeira letra de uma string
function capitalizarPrimeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const content = document.querySelector('.content-main')
content.style.display = 'none'


// Adiciona um ouvinte de eventos para o evento de envio do formulário
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário que recarregaria a página

    // Obtém o valor digitado pelo usuário e converte para letras minúsculas
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    // Faz uma requisição para a API do PokeAPI
    fetch(apiUrl)
        .then((res) => res.json()) // Converte a resposta em formato JSON
        .then(data => {
            // Obtém o elemento onde as informações do Pokemon serão exibidas
            /* const sectionPokemonInfo = document.getElementById('sectionPokemonInfo');

            // Remove o conteúdo anterior se houver
            if (sectionPokemonInfo.firstChild) {
                sectionPokemonInfo.removeChild(sectionPokemonInfo.firstChild);
            } */
            content.style.display = 'flex'

            // recebendo o valor da API e armazenando
            const name = data.name;
            const nomeCapitalizado = capitalizarPrimeiraLetra(name);
            const ident = data.id;
            const type = data.types['0'].type.name;
            const typeCapitalizado = capitalizarPrimeiraLetra(type)
            const image = data.sprites.other['official-artwork'].front_default;
            const weight = data.weight;
            const height = data.height;
            const health = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
            const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
            const defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
            const speed = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
            const attackSpecial = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
            const defenseSpecial = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;

            // armazenando o container que receberá o nome, ícone do tipo e tipo.
            // enviando os atributos vindos da API para o container no HTML.

            const pokemonNameH1 = document.querySelector('.pokemon-name');
            const imagePokemonType = document.querySelector('.imagePokemonType');
            const pokemonType = document.querySelector('.pokemonType');

            pokemonNameH1.innerHTML = nomeCapitalizado;
            pokemonType.innerHTML = typeCapitalizado;

            // armazenando o container que receberá os nomes dos atributos.
            // enviando para o html o nome dos atributos quando a consulta for realizada.

            const attweight = document.querySelector('.att-weight');
            const attheight = document.querySelector('.att-height');
            const atthealth = document.querySelector('.att-health');
            const attattack = document.querySelector('.att-attack');
            const attspecialAttack = document.querySelector('.att-specialAttack')
            const attdefense = document.querySelector('.att-defense')
            const attspecialDefense = document.querySelector('.att-specialDefense')
            const attspeed = document.querySelector('.att-speed')

            attweight.textContent = 'Weight'
            attheight.textContent = 'Height'
            atthealth.textContent = 'Health'
            attattack.textContent = 'Attack'
            attspecialAttack.textContent = 'Special Attack'
            attdefense.textContent = 'Defense'
            attspecialDefense.textContent = 'Special Defense'
            attspeed.textContent = 'Speed'

            // armazenando o container que receberá os atributos.
            // enviando os atributos vindos da API para o container no HTML.

            const attweightresult = document.querySelector('.att-weight-result')
            const attheightresult = document.querySelector('.att-height-result')
            const atthealthresult = document.querySelector('.att-health-result')
            const attattackresult = document.querySelector('.att-attack-result')
            const attspecialattackresult = document.querySelector('.att-specialAttack-result')
            const attdefenseresult = document.querySelector('.att-defense-result')
            const attspecialdefenseresult = document.querySelector('.att-specialDefense-result')
            const attspeedresult = document.querySelector('.att-speed-result')

            attweightresult.innerHTML = `${(weight / 10).toFixed(2)}Kg`;
            attheightresult.innerHTML = `${(height / 10).toFixed(2)}M`;
            atthealthresult.innerHTML = health;
            attattackresult.innerHTML = attack;
            attspecialattackresult.innerHTML = attackSpecial;
            attdefenseresult.innerHTML = defense;
            attspecialdefenseresult.innerHTML = defenseSpecial;
            attspeedresult.innerHTML = speed;

            // armazena a imagem do Pokemon e o ID.
            // envia a imagem do Pokemon e o ID para o html.

            const imagePokemon = document.querySelector('.imagePokemon');
            const imageID = document.querySelector('.imageID');
            imagePokemon.src = image
            imageID.textContent = `#${ident}`

            // constantes que estão armazenando os valores máximos de cada atributo e fazendo um processo de padronização para ocupar espaços entre 0 e 100.

            const maxheight = 2999;
            const maxweight = 145;
            const maxhealth = 255;
            const maxattack = 165;
            const maxattackSpecial = 154;
            const maxdefense = 230;
            const maxdefenseSpecial = 255;
            const maxspeed = 160;

            const normalizedWeight = (weight / maxheight) * 100;
            const normalizedHeight = (height / maxweight) * 100;
            const normalizedHealth = (health / maxhealth) * 100;
            const normalizedAttack = (attack / maxattack) * 100;
            const normalizedAttackSpecial = (attackSpecial / maxattackSpecial) * 100;
            const normalizedDefense = (defense / maxdefense) * 100;
            const normalizedDefenseSpecial = (defenseSpecial / maxdefenseSpecial) * 100;
            const normalizedSpeed = (speed / maxspeed) * 100;

            const progressWeight = document.querySelector('.progressWeight');
            const progressHeight = document.querySelector('.progressHeight');
            const progressHealth = document.querySelector('.progressHealth');
            const progressAttack = document.querySelector('.progressAttack');
            const progressSpecialAttack = document.querySelector('.progressSpecialAttack');
            const progressDefense = document.querySelector('.progressDefense');
            const progressSpecialDefense = document.querySelector('.progressSpecialDefense');
            const progressSpeed = document.querySelector('.progressSpeed');

            progressWeight.style.width = `${normalizedWeight}%`;
            progressHeight.style.width = `${normalizedHeight}%`;
            progressHealth.style.width = `${normalizedHealth}%`;
            progressAttack.style.width = `${normalizedAttack}%`;
            progressSpecialAttack.style.width = `${normalizedAttackSpecial}%`;
            progressDefense.style.width = `${normalizedDefense}%`;
            progressSpecialDefense.style.width = `${normalizedDefenseSpecial}%`;
            progressSpeed.style.width = `${normalizedSpeed}%`;

            const typeShadows = {
                'electric': { 'color': '#EED535', 'filename': 'iconType/electric.png', 'filtercolor': 'rgba(238, 213, 53, 0.25)' },
                'bug': { 'color': '#729F3F', 'filename': 'iconType/bug.png', 'filtercolor': 'rgba(114, 159, 63, 0.25)' },
                'dark': { 'color': '#707070', 'filename': 'iconType/dark.png', 'filtercolor': 'rgba(112, 112, 112, 0.25)' },
                'dragon': { 'color': '#53A4CF', 'filename': 'iconType/dragon.png', 'filtercolor': 'rgba(83, 164, 207, 0.25)' },
                'fairy': { 'color': '#FDB9E9', 'filename': 'iconType/fairy.png', 'filtercolor': 'rgba(253, 185, 233, 0.25)' },
                'fighting': { 'color': '#D56723', 'filename': 'iconType/fighting.png', 'filtercolor': 'rgba(213, 103, 35, 0.25)' },
                'fire': { 'color': '#FD7D24', 'filename': 'iconType/fire.png', 'filtercolor': 'rgba(253, 125, 36, 0.25)' },
                'flying': { 'color': '#3DC7EF', 'filename': 'iconType/flying.png', 'filtercolor': 'rgba(61, 199, 239, 0.25)' },
                'ghost': { 'color': '#7B62A3', 'filename': 'iconType/ghost.png', 'filtercolor': 'rgba(123, 98, 163, 0.25)' },
                'grass': { 'color': '#9BCC50', 'filename': 'iconType/grass.png', 'filtercolor': 'rgba(155, 204, 80, 0.25)' },
                'ground': { 'color': '#F7DE3F', 'filename': 'iconType/ground.png', 'filtercolor': 'rgba(247, 222, 63, 0.25)' },
                'ice': { 'color': '#51C4E7', 'filename': 'iconType/ice.png', 'filtercolor': 'rgba(81, 196, 231, 0.25)' },
                'normal': { 'color': '#A4ACAF', 'filename': 'iconType/normal.png', 'filtercolor': 'rgba(164, 172, 175, 0.25)' },
                'poison': { 'color': '#B97FC9', 'filename': 'iconType/poison.png', 'filtercolor': 'rgba(185, 127, 201, 0.25)' },
                'psychic': { 'color': '#F366B9', 'filename': 'iconType/psychic.png', 'filtercolor': 'rgba(243, 102, 185, 0.25)' },
                'rock': { 'color': '#A38C21', 'filename': 'iconType/rock.png', 'filtercolor': 'rgba(163, 140, 33, 0.25)' },
                'steel': { 'color': '#9EB7B8', 'filename': 'iconType/steel.png', 'filtercolor': 'rgba(158, 183, 184, 0.25)' },
                'water': { 'color': '#4592C4', 'filename': 'iconType/water.png', 'filtercolor': 'rgba(69, 146, 196, 0.25)' }
            };


            // Verifica se o tipo existe no objeto antes de aplicar a sombra
            if (typeShadows.hasOwnProperty(type)) {
                imagePokemon.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[type].color})`;
                imageID.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[type].color})`;
                pokemonNameH1.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[type].color})`;
                pokemonNameH1.style.color = typeShadows[type].color;
                pokemonType.style.color = typeShadows[type].color;
                pokemonType.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[type].color})`;
                imagePokemonType.src = typeShadows[type].filename;

                const attcolor = document.querySelectorAll('.att-color')
                attcolor.forEach(attcolor => {
                    attcolor.style.color = typeShadows[type].color
                    attcolor.style.filter = `drop-shadow(1px 1px 2px ${typeShadows[type].color})`;
                })

                const progress = document.querySelectorAll('.progress')
                progress.forEach(progress => {
                    progress.style.backgroundColor = typeShadows[type].color
                    progress.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[type].color})`;
                })

                const progresscontainer = document.querySelectorAll('.progress-container')
                progresscontainer.forEach(progresscontainer => {
                    progresscontainer.style.backgroundColor = typeShadows[type].filtercolor
                })

            }

        })



    /* .catch((err) => {
        // Em caso de erro (Pokemon não encontrado ou erro na API), exibe uma mensagem de erro
        const sectionPokemonInfo = document.getElementById('sectionPokemonInfo');
        if (sectionPokemonInfo.firstChild) {
            sectionPokemonInfo.removeChild(sectionPokemonInfo.firstChild);
        }

        const errorElement = document.createElement('p');
        errorElement.textContent = "Pokemon não encontrado!";
        sectionPokemonInfo.appendChild(errorElement);
    }); */
});
