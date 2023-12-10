// Função para capitalizar a primeira letra de uma string
function capitalizarPrimeiraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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

            // Constantes para normalizar os valores
            const MAX_WEIGHT = 2999;
            const MAX_HEIGHT = 145;
            const MAX_HEALTH = 255;
            const MAX_ATTACK = 165;
            const MAX_ATTACK_SPECIAL = 154;
            const MAX_DEFENSE = 230;
            const MAX_DEFENSE_SPECIAL = 255;
            const MAX_SPEED = 160;

            // Normaliza os valores para a faixa de 0 a 100
            const normalizedWeight = (weight / MAX_WEIGHT) * 100;
            const normalizedHeight = (height / MAX_HEIGHT) * 100;
            const normalizedHealth = (health / MAX_HEALTH) * 100;
            const normalizedAttack = (attack / MAX_ATTACK) * 100;
            const normalizedAttackSpecial = (attackSpecial / MAX_ATTACK_SPECIAL) * 100;
            const normalizedDefense = (defense / MAX_DEFENSE) * 100;
            const normalizedDefenseSpecial = (defenseSpecial / MAX_DEFENSE_SPECIAL) * 100;
            const normalizedSpeed = (speed / MAX_SPEED) * 100;

            // Cria elementos HTML para exibir as informações do Pokemon
            const contentMain = document.createElement('div');
            const contentLeft = document.createElement('div');
            const contentLeftTop = document.createElement('div');
            const contentLeftTopTittle = document.createElement('div');
            const iconImageElement = document.createElement('img');
            const contentLeftBottom = document.createElement('div');
            const contentLeftBottomNames = document.createElement('div');
            const contentLeftBottomResult = document.createElement('div')
            const contentLeftBottomProgress = document.createElement('div')
            const nameElement = document.createElement('h1');
            const typeElement = document.createElement('p');
            const weightLabelElement = document.createElement('p');
            const weightProgressBar = document.createElement('progress');
            const heightLabelElement = document.createElement('p');
            const heightProgressBar = document.createElement('progress');
            const hpLabelElement = document.createElement('p');
            const hpProgressBar = document.createElement('progress');
            const atkLabelElement = document.createElement('p');
            const atkProgressBar = document.createElement('progress');
            const atkSpecialLabelElement = document.createElement('p');
            const atkSpecialProgressBar = document.createElement('progress');
            const defLabelElement = document.createElement('p');
            const defProgressBar = document.createElement('progress');
            const defSpecialLabelElement = document.createElement('p');
            const defSpecialProgressBar = document.createElement('progress');
            const speedLabelElement = document.createElement('p');
            const speedProgressBar = document.createElement('progress');
            const weightElement = document.createElement('p');
            const heightElement = document.createElement('p');
            const hpElement = document.createElement('p');
            const atkElement = document.createElement('p');
            const atkSpecialElement = document.createElement('p');
            const defElement = document.createElement('p');
            const defSpecialElement = document.createElement('p');
            const speedElement = document.createElement('p');
            const contentRight = document.createElement('div');
            const imageElement = document.createElement('img');
            const idElement = document.createElement('p');

            // Adiciona classes aos elementos
            contentMain.className = 'contentMain';
            contentLeft.className = 'contentLeft';
            contentLeftTop.className = 'contentLeftTop';
            contentLeftTopTittle.className = 'contentLeftTittle'
            iconImageElement.className = 'iconImageElement'
            contentLeftBottom.className = 'contentLeftBottom';
            contentRight.className = 'contentRight';

            imageElement.className = 'imageElement';
            idElement.className = 'idElement';
            nameElement.className = 'nameElement';
            typeElement.className = 'typeElement';
            weightElement.className = 'statisticElement';
            heightElement.className = 'statisticElement';
            hpElement.className = 'statisticElement';
            atkElement.className = 'statisticElement';
            atkSpecialElement.className = 'statisticElement';
            defElement.className = 'statisticElement';
            defSpecialElement.className = 'statisticElement';
            speedElement.className = 'statisticElement';

            weightProgressBar.className = 'progressBar'
            heightProgressBar.className = 'progressBar'
            hpProgressBar.className = 'progressBar'
            atkProgressBar.className = 'progressBar'
            atkSpecialProgressBar.className = 'progressBar'
            defProgressBar.className = 'progressBar'
            defSpecialProgressBar.className = 'progressBar'
            speedProgressBar.className = 'progressBar'

            weightProgressBar.style.backgroundColor = '#18181B'
            heightProgressBar.style.backgroundColor = '#18181B'
            hpProgressBar.style.backgroundColor = '#18181B'
            atkProgressBar.style.backgroundColor = '#18181B'
            atkSpecialProgressBar.style.backgroundColor = '#18181B'
            defProgressBar.style.backgroundColor = '#18181B'
            defSpecialProgressBar.style.backgroundColor = '#18181B'
            speedProgressBar.style.backgroundColor = '#18181B'

            // Adiciona texto aos elementos
            idElement.textContent = `#${ident}`;
            nameElement.textContent = nomeCapitalizado;
            typeElement.textContent = typeCapitalizado;
            imageElement.src = image;

            weightLabelElement.textContent = 'Weight:';
            heightLabelElement.textContent = 'Height:';
            hpLabelElement.textContent = 'Health:';
            atkLabelElement.textContent = 'Attack:';
            atkSpecialLabelElement.textContent = 'Special Attack:';
            defLabelElement.textContent = 'Defense:';
            defSpecialLabelElement.textContent = 'Special Defense:';
            speedLabelElement.textContent = 'Speed:';

            weightLabelElement.className = 'ElementString'
            heightLabelElement.className = 'ElementString'
            hpLabelElement.className = 'ElementString'
            atkLabelElement.className = 'ElementString'
            atkSpecialLabelElement.className = 'ElementString'
            defLabelElement.className = 'ElementString'
            defSpecialLabelElement.className = 'ElementString'
            speedLabelElement.className = 'ElementString'

            weightElement.innerHTML = `${(weight / 10).toFixed(2)}Kg`;
            heightElement.innerHTML = `${(height / 10).toFixed(2)}M`;
            hpElement.textContent = `${health}`;
            atkElement.textContent = `${attack}`;
            atkSpecialElement.textContent = `${attackSpecial}`;
            defElement.textContent = `${defense}`;
            defSpecialElement.textContent = `${defenseSpecial}`;
            speedElement.textContent = `${speed}`;

            // Define os valores máximos das barras de progresso
            weightProgressBar.max = 100;
            heightProgressBar.max = 100;
            hpProgressBar.max = 100;
            atkProgressBar.max = 100;
            atkSpecialProgressBar.max = 100;
            defProgressBar.max = 100;
            defSpecialProgressBar.max = 100;
            speedProgressBar.max = 100;

            // Atribui os valores normalizados às barras de progresso
            weightProgressBar.value = normalizedWeight;
            heightProgressBar.value = normalizedHeight;
            hpProgressBar.value = normalizedHealth;
            atkProgressBar.value = normalizedAttack;
            atkSpecialProgressBar.value = normalizedAttackSpecial;
            defProgressBar.value = normalizedDefense;
            defSpecialProgressBar.value = normalizedDefenseSpecial;
            speedProgressBar.value = normalizedSpeed;

            // Adiciona os elementos criados ao elemento principal das informações do Pokemon
            contentMain.appendChild(contentLeft);
            contentMain.appendChild(contentRight);
            contentLeft.appendChild(contentLeftTop);
            contentLeft.appendChild(contentLeftBottom);
            contentLeftBottom.appendChild(contentLeftBottomNames)
            contentLeftBottom.appendChild(contentLeftBottomProgress)
            contentLeftBottom.appendChild(contentLeftBottomResult)

            contentLeftBottomResult.className = 'contentLeftBottomResults'
            contentLeftBottomNames.className = 'contentLeftBottomNames'
            contentLeftBottomProgress.className = 'contentLeftBottomProgress'

            contentRight.appendChild(imageElement);
            contentRight.appendChild(idElement);
            contentLeftTop.appendChild(contentLeftTopTittle)
            contentLeftTopTittle.appendChild(nameElement);
            contentLeftTopTittle.appendChild(iconImageElement);
            contentLeftTop.appendChild(typeElement);

            contentLeftBottomNames.appendChild(weightLabelElement)
            contentLeftBottomNames.appendChild(heightLabelElement)
            contentLeftBottomNames.appendChild(hpLabelElement)
            contentLeftBottomNames.appendChild(atkLabelElement)
            contentLeftBottomNames.appendChild(atkSpecialLabelElement)
            contentLeftBottomNames.appendChild(defLabelElement)
            contentLeftBottomNames.appendChild(defSpecialLabelElement)
            contentLeftBottomNames.appendChild(speedLabelElement)

            contentLeftBottomProgress.appendChild(weightProgressBar);
            contentLeftBottomProgress.appendChild(heightProgressBar);
            contentLeftBottomProgress.appendChild(hpProgressBar);
            contentLeftBottomProgress.appendChild(atkProgressBar);
            contentLeftBottomProgress.appendChild(atkSpecialProgressBar);
            contentLeftBottomProgress.appendChild(defProgressBar);
            contentLeftBottomProgress.appendChild(defSpecialProgressBar);
            contentLeftBottomProgress.appendChild(speedProgressBar);

            contentLeftBottomResult.appendChild(weightElement)
            contentLeftBottomResult.appendChild(heightElement)
            contentLeftBottomResult.appendChild(hpElement)
            contentLeftBottomResult.appendChild(atkElement)
            contentLeftBottomResult.appendChild(atkSpecialElement)
            contentLeftBottomResult.appendChild(defElement)
            contentLeftBottomResult.appendChild(defSpecialElement)
            contentLeftBottomResult.appendChild(speedElement)

            sectionPokemonInfo.appendChild(contentMain);

            const typeShadows = {
                'electric': { 'color': '#EED535', 'filename': 'iconType/eletric.png' },
                'bug': { 'color': '#729F3F', 'filename': 'iconType/bug.png' },
                'dark': { 'color': '#707070', 'filename': 'iconType/dark.png' },
                'dragon': { 'color': '#53A4CF', 'filename': 'iconType/dragon.png' },
                'fairy': { 'color': '#FDB9E9', 'filename': 'iconType/fairy.png' },
                'fighting': { 'color': '#D56723', 'filename': 'iconType/fighting.png' },
                'fire': { 'color': '#FD7D24', 'filename': 'iconType/fire.png' },
                'flying': { 'color': '#3DC7EF', 'filename': 'iconType/flying.png' },
                'ghost': { 'color': '#7B62A3', 'filename': 'iconType/ghost.png' },
                'grass': { 'color': '#9BCC50', 'filename': 'iconType/grass.png' },
                'ground': { 'color': '#F7DE3F', 'filename': 'iconType/ground.png' },
                'ice': { 'color': '#51C4E7', 'filename': 'iconType/ice.png' },
                'normal': { 'color': '#A4ACAF', 'filename': 'iconType/normal.png' },
                'poison': { 'color': '#B97FC9', 'filename': 'iconType/poison.png' },
                'psychic': { 'color': '#F366B9', 'filename': 'iconType/psychic.png' },
                'rock': { 'color': '#A38C21', 'filename': 'iconType/rock.png' },
                'steel': { 'color': '#9EB7B8', 'filename': 'iconType/steel.png' },
                'water': { 'color': '#4592C4', 'filename': 'water.png' }
            }


            // Verifica se o tipo existe no objeto antes de aplicar a sombra
            if (typeShadows.hasOwnProperty(type)) {
                imageElement.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[type].color})`;
                nameElement.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[type].color})`;
                nameElement.style.color = typeShadows[type].color;
                idElement.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[type].color})`;
                let currentURL = window.location.href
                iconImageElement.src = currentURL + typeShadows[type].filename;

                const wordsColor = document.querySelectorAll('.ElementString');
                wordsColor.forEach(wordsColor => {
                    wordsColor.style.color = typeShadows[type].color;
                });

                const resultColor = document.querySelectorAll('.statisticElement')
                resultColor.forEach(resultColor => {
                    resultColor.style.color = typeShadows[type].color;
                })

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
