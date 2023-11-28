// Função para capitalizar a primeira letra de uma string
function capitalizarPrimeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Adiciona um ouvinte de eventos para o evento de envio do formulário
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário (que recarregaria a página)

    // Obtém o valor digitado pelo usuário e converte para letras minúsculas
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    // Faz uma requisição para a API do PokeAPI
    fetch(apiUrl)
        .then((res) => res.json()) // Converte a resposta em formato JSON
        .then(data => {
            // Obtém o elemento onde as informações do Pokemon serão exibidas
            const sectionPokemonInfo = document.getElementById('sectionPokemonInfo');

            // Remove o conteúdo anterior, se houver
            if (sectionPokemonInfo.firstChild) {
                sectionPokemonInfo.removeChild(sectionPokemonInfo.firstChild);
            }

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

            // Cria elementos HTML para exibir o nome e a imagem do Pokemon
            const contentMain = document.createElement('div');
            const contentLeft = document.createElement('div')
            const contentLeftTop = document.createElement('div')
            const contentLeftBottom = document.createElement('div')
            const nameElement = document.createElement('h2');
            const typeElement = document.createElement('p')
            const weightElement = document.createElement('p')
            const heightElement = document.createElement('p')
            const hpElement = document.createElement('p');
            const atkElement = document.createElement('p');
            const AtkSpecialElement = document.createElement('p');
            const defElement = document.createElement('p');
            const defSpecialElement = document.createElement('p');
            const speedElement = document.createElement('p');
            const contentRight = document.createElement('div')
            const imageElement = document.createElement('img');
            const idElement = document.createElement('p')

            contentMain.className = 'contentMain'
            contentLeft.className = 'contentLeft';
            contentLeftTop.className = 'contentLeftTop';
            contentLeftBottom.className = 'contentLeftBottom';
            contentRight.className = 'contentRight'
            imageElement.className = 'imageElement'
            idElement.className = 'idElement'
            nameElement.className = 'nameElement'
            typeElement.className = 'typeElement'
            weightElement.className = 'statisticElement'
            heightElement.className = 'statisticElement'
            hpElement.className = 'statisticElement'
            atkElement.className = 'statisticElement'
            AtkSpecialElement.className = 'statisticElement'
            defElement.className = 'statisticElement'
            defSpecialElement.className = 'statisticElement'
            speedElement.className = 'statisticElement'

            idElement.textContent = `#${ident}`;
            nameElement.textContent = nomeCapitalizado; // Utiliza o nome capitalizado
            typeElement.textContent = typeCapitalizado;
            imageElement.src = image;
            weightElement.innerHTML = `Weight: ${(weight / 10).toFixed(2)} Kg`;
            heightElement.innerHTML = `Height: ${(height / 10).toFixed(2)} M`;
            hpElement.textContent = `Health: ${health}`;
            atkElement.textContent = `Attack: ${attack}`;
            AtkSpecialElement.textContent = `Special Attack: ${attackSpecial}`;
            defElement.textContent = `Defense: ${defense}`;
            defSpecialElement.textContent = `Special Defense: ${defenseSpecial}`;
            speedElement.textContent = `Speed: ${speed}`;

            // Adiciona os elementos criados ao elemento principal das informações do Pokemon
            contentMain.appendChild(contentLeft);
            contentMain.appendChild(contentRight);
            contentLeft.appendChild(contentLeftTop);
            contentLeft.appendChild(contentLeftBottom);
            contentRight.appendChild(imageElement);
            contentRight.appendChild(idElement);
            contentLeftTop.appendChild(nameElement);
            contentLeftTop.appendChild(typeElement)
            contentLeftBottom.appendChild(weightElement);
            contentLeftBottom.appendChild(heightElement);
            contentLeftBottom.appendChild(hpElement);
            contentLeftBottom.appendChild(atkElement);
            contentLeftBottom.appendChild(AtkSpecialElement);
            contentLeftBottom.appendChild(defElement);
            contentLeftBottom.appendChild(defSpecialElement);
            contentLeftBottom.appendChild(speedElement);
            sectionPokemonInfo.appendChild(contentMain);

            const typeShadows = {
                'electric': '#EED535',
                'bug': '#729F3F',
                'dark': '#707070',
                'dragon': '#53A4CF',
                'fairy': '#FDB9E9',
                'fighting': '#D56723',
                'fire': '#FD7D24',
                'flying': '#3DC7EF',
                'ghost': '#7B62A3',
                'grass': '#9BCC50',
                'ground': '#F7DE3F',
                'ice': '#51C4E7',
                'normal': '#A4ACAF',
                'poison': '#B97FC9',
                'psychic': '#F366B9',
                'rock': '#A38C21',
                'steel': '#9EB7B8',
                'water': '#4592C4'
            };

            // Verifica se o tipo existe no objeto antes de aplicar a sombra
            if (typeShadows.hasOwnProperty(type)) {
                imageElement.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[type]})`;
                nameElement.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[type]})`;
                nameElement.style.color = typeShadows[type];
                idElement.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[type]})`;
/*                 contentMain.style.backgroundImage = 'url("grass 1.png")';
                contentMain.style.backgroundRepeat = "no-repeat";
                contentLeft.style.backgroundSize = "coven"; */
                

            }


        })
        .catch((err) => {
            // Em caso de erro (Pokemon não encontrado ou erro na API), exibe uma mensagem de erro
            const sectionPokemonInfo = document.getElementById('sectionPokemonInfo');
            if (sectionPokemonInfo.firstChild) {
                sectionPokemonInfo.removeChild(sectionPokemonInfo.firstChild);
            }

            const errorElement = document.createElement('p');
            errorElement.textContent = "Pokemon não encontrado!";
            sectionPokemonInfo.appendChild(errorElement);
        });
});
