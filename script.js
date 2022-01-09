let order = [];
let clickedOrder = [];
let score = 0;
let start = false;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const button = document.querySelector('.btn');
const pontos = document.querySelector('.score');


// const audioBlue = new Audio('/audios/blue.mp3');


/* audioBlue.addEventListener('canplaythrough', function() {
  audio.play();
}); */

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, order[i]);
    }
}

//acende a proxima cor
let lightColor = (element, number, ordemSom) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
        TocarSom(ordemSom);
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length && start) {
        // alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        setTimeout(() => {
            nextLevel();
        }, 1500);

    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    TocarSom(color);

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    pontos.innerHTML = score;
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    if (start) {
        alert(`Pontuação: ${score-1}!\nVocê perdeu o jogo!`);
        endGame();
        
    }

}

//funcao de inicio do jogo
let playGame = () => {
    // alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    if (start) {
        score = 0;
    
        nextLevel();
    }
}

//Resetar Dados
let endGame = () => {
    order = [];
    clickedOrder = [];
    button.classList.remove("btn-ligado");
    button.innerHTML = "INICIAR";
    start = false;
}

//Tocar o Som
let TocarSom = (color) => {
    
    var audio1 = new Audio();

    if(color == 0) {
        audio1.src = "audios/green.mp3";
        audio1.play();
    } else if(color == 1) {
        audio1.src = "audios/red.mp3";
        audio1.play();
    } else if (color == 2) {
        audio1.src = "audios/yellow.mp3";
        audio1.play();
    } else if (color == 3) {
        audio1.src = "audios/blue.mp3";
        audio1.play();
    }

}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);



//inicio do jogo
button.onclick = () => {
    button.classList.add("btn-ligado");
    button.innerHTML = "LIGADO";
    start = true;
    playGame();
}
