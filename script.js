
let content = document.querySelector('.content-main')
let sectionPokemonInfo = document.querySelector('.sectionPokemonInfo')
let catchalert = document.querySelector('.catch-alert')
let catchimage = document.querySelector('.catch-image')
content.style.display = 'none'
catchimage.style.display = 'none'

// Adiciona um ouvinte de eventos para o evento de envio do formulário
// Evita o envio padrão do formulário que recarregaria a página
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtém o valor digitado pelo usuário e converte para letras minúsculas
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const APIURL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    // Faz uma requisição para a API do PokeAPI
    fetch(APIURL)
        .then((res) => res.json()) // Converte a resposta em formato JSON
        .then(data => {

            // Substitui a tela inicial pelos dados dos Pokémon assim que requerido.
            content.style.display = 'flex'
            sectionPokemonInfo.style.display = 'flex'

            // Esconde os catch error, pois caso aconteça algum erro, os avisos não sairão da tela ao voltar para normalidade.
            catchalert.style.display = 'none'
            catchimage.style.display = 'none'

            // Função para capitalizar a primeira letra de uma string
            function capitalizarPrimeiraLetra(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            // Recebendo o valor da API e armazenando
            const name = data.name;
            const nameCapitalizado = capitalizarPrimeiraLetra(name);
            const ident = data.id;
            const types = data.types;

            // Criei um Array para guardar os tipos de Pokémon e acessá-los mais facilmente depois pelos índices.
            let pokemonTypes = [];
            types.forEach((typeData) => {
                const typeName = capitalizarPrimeiraLetra(typeData.type.name);
                pokemonTypes.push(typeName);
            });

            // Criei um Array para guardar as habilidades dos Pokémon e acessá-los mais facilmente depois pelos índices.
            const abilities = data.abilities;
            let pokemonAbilities = []

            abilities.forEach(abilities => {
                const abilitiesFor = capitalizarPrimeiraLetra(abilities.ability.name)
                pokemonAbilities.push(abilitiesFor);
            });

            const image = data.sprites.other['official-artwork'].front_default;
            const weight = data.weight;
            const height = data.height;
            const health = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
            const attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
            const defense = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
            const speed = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
            const attackSpecial = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
            const defenseSpecial = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;

            // Armazenando o container que receberá o nome, ícone do tipo e tipo.
            // Enviando os atributos vindos da API para o container no HTML.
            const pokemonNameH1 = document.querySelector('.pokemon-name');
            const imagePokemonType = document.querySelector('.imagePokemonType');
            const pokemonType = document.querySelector('.pokemonType');
            const pokemonTypetwo = document.querySelector('.pokemonTypetwo');
            const abilitiesSpan = document.querySelector('.pokeAbilities')
            const abilitiesSpanTwo = document.querySelector('.pokeAbilitiesTwo')

            pokemonNameH1.innerHTML = nameCapitalizado;

            // Atribuindo os valores de habilidades e tipos de Pokémons. 
            pokemonType.textContent = pokemonTypes[0]
            pokemonTypetwo.textContent = pokemonTypes[1]

            abilitiesSpan.textContent = pokemonAbilities[0]
            abilitiesSpanTwo.textContent = pokemonAbilities[1]

            // Armazenando o container que receberá os nomes dos atributos.
            // Enviando para o html o nome dos atributos quando a consulta for realizada.
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

            // Armazenando o container que receberá os atributos.
            // Enviando os atributos vindos da API para o container no HTML.
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

            // Armazena a imagem do Pokemon e o ID.
            // Envia a imagem do Pokemon e o ID para o html.
            const imagePokemon = document.querySelector('.imagePokemon');
            const imageID = document.querySelector('.imageID');
            imagePokemon.src = image;
            imageID.textContent = `#${ident}`;

            // Essa const recebe a div que introduz a tela, e faz um teste para identificar se há um tipo de pokemon escolhido. Caso sim, ela anula a tela, o que resulta na tela de apresentação de atributos padrão.
            const introPoke = document.querySelector('.intro-screen');
            if (pokemonTypes[0]) {
                introPoke.style.display = 'none'
            }

            // Let que estão armazenando os valores máximos de cada atributo e fazendo um processo de padronização para ocupar espaços entre 0 e 100.
            // Pokémons padrão:
            let maxweight = 1420;
            let maxheight = 100;
            let maxhealth = 255;
            let maxattack = 165;
            let maxattackSpecial = 154;
            let maxdefense = 230;
            let maxdefenseSpecial = 255;
            let maxspeed = 160;

            // Alguns pokémons tem atributos extremamente maiores que outros, o que faz as barras de progresso não aparecerem quando é um valor baixo, devido ao valor máximo ser muito alto. 
            // Nesse teste estou pré definindo os valores padrões no começo, e testando para ver se o pokémon possui atributos altos, para reatribuir um limite e a barra não exceder seu limite.

            // Pokémons grandes: 
            if (weight >= 1500 && weight <= 4999) {
                maxweight = 4999;
                maxheight = 145;

            }
            //Pokémons colossais:
            else if (weight >= 5000 && weight <= 10000) {
                maxweight = 10000;
                maxheight = 750;
            }

            // Faço um calculo do valor do atributo dividido pelo máximo que o atributo pode chegar, dependendo do tipo de Pokémon, multiplicado por 100, assim escalando eles para caber entre 0 e 100 e ser atribuidos à barra de progresso.
            const normalizedWeight = (weight / maxweight) * 100;
            const normalizedHeight = (height / maxheight) * 100;
            const normalizedHealth = (health / maxhealth) * 100;
            const normalizedAttack = (attack / maxattack) * 100;
            const normalizedAttackSpecial = (attackSpecial / maxattackSpecial) * 100;
            const normalizedDefense = (defense / maxdefense) * 100;
            const normalizedDefenseSpecial = (defenseSpecial / maxdefenseSpecial) * 100;
            const normalizedSpeed = (speed / maxspeed) * 100;

            // Armazenando o container que receberá as barras de progresso.
            const progressWeight = document.querySelector('.progressWeight');
            const progressHeight = document.querySelector('.progressHeight');
            const progressHealth = document.querySelector('.progressHealth');
            const progressAttack = document.querySelector('.progressAttack');
            const progressSpecialAttack = document.querySelector('.progressSpecialAttack');
            const progressDefense = document.querySelector('.progressDefense');
            const progressSpecialDefense = document.querySelector('.progressSpecialDefense');
            const progressSpeed = document.querySelector('.progressSpeed');

            // Estou definindo um timing para criar uma transition que fará as barras saírem de width: 0 para seu posto normal de forma animada.
            let timing = 500;

            progressWeight.style.transition = 'width ' + timing / 1000 + "s ease-out";
            progressHeight.style.transition = 'width ' + timing / 1000 + "s ease-out";
            progressHealth.style.transition = 'width ' + timing / 1000 + "s ease-out";
            progressAttack.style.transition = 'width ' + timing / 1000 + "s ease-out";
            progressSpecialAttack.style.transition = 'width ' + timing / 1000 + "s ease-out";
            progressDefense.style.transition = 'width ' + timing / 1000 + "s ease-out";
            progressSpecialDefense.style.transition = 'width ' + timing / 1000 + "s ease-out";
            progressSpeed.style.transition = 'width ' + timing / 1000 + "s ease-out";

            // Estou atribuindo os valores finais às divs usando a função setTimeout para dar um delay de 0.2 segundos no inicio da animação.
            setTimeout(function () {
                progressWeight.style.width = `${normalizedWeight}%`;
                progressHeight.style.width = `${normalizedHeight}%`;
                progressHealth.style.width = `${normalizedHealth}%`;
                progressAttack.style.width = `${normalizedAttack}%`;
                progressSpecialAttack.style.width = `${normalizedAttackSpecial}%`;
                progressDefense.style.width = `${normalizedDefense}%`;
                progressSpecialDefense.style.width = `${normalizedDefenseSpecial}%`;
                progressSpeed.style.width = `${normalizedSpeed}%`;
            }, 200)

            // Criei um objeto com padrão de cores e contendo a url de imagens para facilitar a montagem de cada tipo de pokémon.
            const typeShadows = {
                Electric: { color: '#EED535', filename: 'IconType/electric.jpg', filtercolor: 'rgba(238, 213, 53, 0.25)', backgroundName: 'imagesBackground/electric.jpg' },
                Bug: { color: '#729F3F', filename: 'IconType/bug.jpg', filtercolor: 'rgba(114, 159, 63, 0.25)', backgroundName: 'imagesBackground/bug.jpg' },
                Dark: { color: '#c7c5c5', filename: 'IconType/dark.jpg', filtercolor: 'rgba(112, 112, 112, 0.25)', backgroundName: 'imagesBackground/dark.jpg' },
                Dragon: { color: '#53A4CF', filename: 'IconType/dragon.jpg', filtercolor: 'rgba(83, 164, 207, 0.25)', backgroundName: 'imagesBackground/dragon.jpg' },
                Fairy: { color: '#FDB9E9', filename: 'IconType/fairy.jpg', filtercolor: 'rgba(253, 185, 233, 0.25)', backgroundName: 'imagesBackground/fairy.jpg' },
                Fighting: { color: '#D56723', filename: 'IconType/fighting.jpg', filtercolor: 'rgba(213, 103, 35, 0.25)', backgroundName: 'imagesBackground/fighting.jpg' },
                Fire: { color: '#FD7D24', filename: 'IconType/fire.jpg', filtercolor: 'rgba(253, 125, 36, 0.25)', backgroundName: 'imagesBackground/fire.jpg' },
                Flying: { color: '#3DC7EF', filename: 'IconType/flying.jpg', filtercolor: 'rgba(61, 199, 239, 0.25)', backgroundName: 'imagesBackground/flying.jpg' },
                Ghost: { color: '#b088f0', filename: 'IconType/ghost.jpg', filtercolor: 'rgba(123, 98, 163, 0.25)', backgroundName: 'imagesBackground/ghost.jpg' },
                Grass: { color: '#9BCC50', filename: 'IconType/grass.jpg', filtercolor: 'rgba(155, 204, 80, 0.25)', backgroundName: 'imagesBackground/grass.jpg' },
                Ground: { color: '#F7DE3F', filename: 'IconType/ground.jpg', filtercolor: 'rgba(247, 222, 63, 0.25)', backgroundName: 'imagesBackground/ground.jpg' },
                Ice: { color: '#51C4E7', filename: 'IconType/ice.jpg', filtercolor: 'rgba(81, 196, 231, 0.25)', backgroundName: 'imagesBackground/ice.jpg' },
                Normal: { color: '#A4ACAF', filename: 'IconType/normal.jpg', filtercolor: 'rgba(164, 172, 175, 0.25)', backgroundName: 'imagesBackground/normal.jpg' },
                Poison: { color: '#B97FC9', filename: 'IconType/poison.jpg', filtercolor: 'rgba(185, 127, 201, 0.25)', backgroundName: 'imagesBackground/poison.jpg' },
                Psychic: { color: '#F366B9', filename: 'IconType/psychic.jpg', filtercolor: 'rgba(243, 102, 185, 0.25)', backgroundName: 'imagesBackground/psychic.jpg' },
                Rock: { color: '#d3b42a', filename: 'IconType/rock.jpg', filtercolor: 'rgba(163, 140, 33, 0.25)', backgroundName: 'imagesBackground/rock.jpg' },
                Steel: { color: '#9EB7B8', filename: 'IconType/steel.jpg', filtercolor: 'rgba(158, 183, 184, 0.25)', backgroundName: 'imagesBackground/steel.jpg' },
                Water: { color: '#a8d8f8', filename: 'IconType/water.jpg', filtercolor: 'rgba(69, 146, 196, 0.25)', backgroundName: 'imagesBackground/water.jpg' }
            };


            // Verifica se o tipo existe no objeto antes de aplicar as estilizações
            if (typeShadows.hasOwnProperty(pokemonTypes[0])) {
                imagePokemon.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[pokemonTypes[0]].color})`;
                imageID.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[pokemonTypes[0]].color})`;
                pokemonNameH1.style.filter = `drop-shadow(2px 2px 10px ${typeShadows[pokemonTypes[0]].color})`;
                pokemonNameH1.style.color = typeShadows[pokemonTypes[0]].color;
                pokemonType.style.color = typeShadows[pokemonTypes[0]].color;
                pokemonType.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[pokemonTypes[0]].color})`;
                abilitiesSpan.style.color = typeShadows[pokemonTypes[0]].color;
                abilitiesSpanTwo.style.color = typeShadows[pokemonTypes[0]].color;
                abilitiesSpan.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[pokemonTypes[0]].color})`;
                abilitiesSpanTwo.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[pokemonTypes[0]].color})`;
                imagePokemonType.src = typeShadows[pokemonTypes[0]].filename;

                // Verifica de há um segundo tipo de Pokémon, e se sim, aplica estilizações específicas para ele.
                if (pokemonTypes[1]) {
                    pokemonTypetwo.innerHTML = pokemonTypes[1];
                    pokemonTypetwo.style.color = typeShadows[pokemonTypes[1]].color;
                    pokemonTypetwo.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[pokemonTypes[1]].color})`;
                }

                // Adiciona um background-image diferente ao body dependendo do tipo do Pokémon.
                const body = document.body;
                body.style.backgroundImage = `url('${typeShadows[pokemonTypes[0]].backgroundName}')`;

                // Executa um ForEach em todos elementos com a classe optColors (ícones, títulos) para aplicar as cores.
                const optColors = document.querySelectorAll('.optColors');
                optColors.forEach(optColors => {
                    optColors.style.stroke = typeShadows[pokemonTypes[0]].color;
                    optColors.style.color = typeShadows[pokemonTypes[0]].color;
                });
                // Executa um ForEach em todos elementos com a classe att-colors (atributos, seus resultados) para aplicar as cores.
                const attcolor = document.querySelectorAll('.att-color')
                attcolor.forEach(attcolor => {
                    attcolor.style.color = typeShadows[pokemonTypes[0]].color
                    attcolor.style.filter = `drop-shadow(1px 1px 2px ${typeShadows[pokemonTypes[0]].color})`;
                })

                // Executa um ForEach em todos elementos com a classe progress (barras de progresso) para aplicar as cores.
                // Pré-define o width da barra de progresso em 0 para que as animações ocorram melhor.
                const progress = document.querySelectorAll('.progress')
                progress.forEach(progress => {
                    progress.style.backgroundColor = typeShadows[pokemonTypes[0]].color
                    progress.style.filter = `drop-shadow(1px 1px 10px ${typeShadows[pokemonTypes[0]].color})`;
                    progress.style.width = '0'

                })
                // Executa um ForEach em todos elementos com a classe progress-container (o background das progressbar) para aplicar as cores.
                const progresscontainer = document.querySelectorAll('.progress-container')
                progresscontainer.forEach(progresscontainer => {
                    progresscontainer.style.backgroundColor = typeShadows[pokemonTypes[0]].filtercolor
                })

            }

        })

        // o Catch notificará na tela caso um Pokémon inserido esteja escrito da forma incorreta.
        .catch((err) => {
            sectionPokemonInfo.style.display = 'none'
            content.style.display = 'none'
            catchalert.style.display = 'block'
            catchalert.innerHTML = 'Insira um Pokémon válido!'
            catchimage.style.display = 'block'
            catchimage.src = 'images/ErrorImage.jpg'
            catchalert.style.fontSize = '30px'
            catchalert.style.color = 'white'
        });
});