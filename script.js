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
            const MAX_HEALTH = 255; // Valor máximo possível para a estatística de saúde (HP)
            const MAX_ATTACK = 165;
            const MAX_ATTACK_SPECIAL = 150;
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
            const contentLeftBottom = document.createElement('div');
            const nameElement = document.createElement('h2');
            const typeElement = document.createElement('p');

            const divWeight = document.createElement('div');
            const weightLabelElement = document.createElement('p');
            const weightProgressBar = document.createElement('progress');
            const divHeight = document.createElement('div');
            const heightLabelElement = document.createElement('p');
            const heightProgressBar = document.createElement('progress');
            const divHp = document.createElement('div');
            const hpLabelElement = document.createElement('p');
            const hpProgressBar = document.createElement('progress');
            const divAtk = document.createElement('div');
            const atkLabelElement = document.createElement('p');
            const atkProgressBar = document.createElement('progress');
            const divAtkSpecial = document.createElement('div');
            const atkSpecialLabelElement = document.createElement('p');
            const atkSpecialProgressBar = document.createElement('progress');
            const divDef = document.createElement('div');
            const defLabelElement = document.createElement('p');
            const defProgressBar = document.createElement('progress');
            const divDefSpecial = document.createElement('div');
            const defSpecialLabelElement = document.createElement('p');
            const defSpecialProgressBar = document.createElement('progress');
            const divSpeed = document.createElement('div');
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
            contentLeftBottom.className = 'contentLeftBottom';
            contentRight.className = 'contentRight';

            divWeight.className = 'divPrintResult';
            divHeight.className = 'divPrintResult';
            divHp.className = 'divPrintResult';
            divAtk.className = 'divPrintResult';
            divAtkSpecial.className = 'divPrintResult';
            divDef.className = 'divPrintResult';
            divDefSpecial.className = 'divPrintResult';
            divSpeed.className = 'divPrintResult';

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

            weightElement.innerHTML = `${(weight / 10).toFixed(2)} Kg`;
            heightElement.innerHTML = `${(height / 10).toFixed(2)} M`;
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

            contentRight.appendChild(imageElement);
            contentRight.appendChild(idElement);
            contentLeftTop.appendChild(nameElement);
            contentLeftTop.appendChild(typeElement);

            divWeight.appendChild(weightLabelElement);
            divWeight.appendChild(weightProgressBar);
            contentLeftBottom.appendChild(divWeight);
            divHeight.appendChild(heightLabelElement);
            divHeight.appendChild(heightProgressBar);
            contentLeftBottom.appendChild(divHeight);
            divHp.appendChild(hpLabelElement);
            divHp.appendChild(hpProgressBar);
            contentLeftBottom.appendChild(divHp);
            divAtk.appendChild(atkLabelElement);
            divAtk.appendChild(atkProgressBar);
            contentLeftBottom.appendChild(divAtk);
            divAtkSpecial.appendChild(atkSpecialLabelElement);
            divAtkSpecial.appendChild(atkSpecialProgressBar);
            contentLeftBottom.appendChild(divAtkSpecial);
            divDef.appendChild(defLabelElement);
            divDef.appendChild(defProgressBar);
            contentLeftBottom.appendChild(divDef);
            divDefSpecial.appendChild(defSpecialLabelElement);
            divDefSpecial.appendChild(defSpecialProgressBar);
            contentLeftBottom.appendChild(divDefSpecial);
            divSpeed.appendChild(speedLabelElement);
            divSpeed.appendChild(speedProgressBar);
            contentLeftBottom.appendChild(divSpeed);

            divWeight.appendChild(weightElement);
            divHeight.appendChild(heightElement);
            divHp.appendChild(hpElement);
            divAtk.appendChild(atkElement);
            divAtkSpecial.appendChild(atkSpecialElement);
            divDef.appendChild(defElement);
            divDefSpecial.appendChild(defSpecialElement);
            divSpeed.appendChild(speedElement);

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
