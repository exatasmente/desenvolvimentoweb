// Inimigos que o jogador deve evitar
var Enemy = function (x, y) {
    // Variáveis aplicadas a cada instância devem ser declaradas aqui
    this.x = x;
    this.y = y;
    this.velocidade = Math.floor((Math.random() * (100 - 300 + 1)) + 300);
    // A imagem dos inimigos, this usa uma classe helper que carrega
    // a imagem facilmente
    this.sprite = 'images/inseto.png';
};

// Atualiza a posição de um inimigo
// Parâmetro: dt, um intervalo de tempo entre atualizações
Enemy.prototype.update = function (dt) {
    // Você deve multiplicar cada movimento por dt
    // assegura que o jogo rode na mesma velocidade em todos computadores.
    this.x += this.velocidade * dt;

    if (this.x > 6 * 101) {
        this.x = -101;
        this.velocidade = Math.floor((Math.random() * (100 - 300 + 1)) + 300);
    }

    if (Math.abs(this.x - player.x) < 101 &&
        Math.abs(this.y - player.y) < 83) {
        player.reset();
        score.updateMiss();
    }



};

// Desenha o inimigo na tela
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora escreva a class Player
// Ela requer os métodos update(), render() e handleInput().
var Player = function () {
    this.sprite = 'images/personagem-garoto.png';
    this.reset();
};


Player.prototype.update = function () {
    if (this.col < 0) {
        this.col = 0;
    }

    if (this.col > 4) {
        this.col = 4;
    }

    if (this.row > 5) {
        this.row = 5;
    }


    if (this.row == 0) {
        this.reset();
        score.updateSuccess();
    }

    this.x = this.col * 101;
    this.y = this.row * 83;

};


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.col--;
            break;
        case 'right':
            this.col++;
            break;
        case 'up':
            this.row--;
            break;
        case 'down':
            this.row++;
            break;
    }
};

Player.prototype.reset = function () {
    this.col = 2;
    this.row = 5;
    this.x = this.col * 101;
    this.y = this.row * 83;

};

var Score = function () {
    this.success = 0;
    this.miss = 0;
};

Score.prototype.updateSuccess = function () {
    this.success += 1;
    document.getElementById('score-success').innerHTML = this.success;
};

Score.prototype.updateMiss = function () {
    this.miss += 1;
    document.getElementById('score-miss').innerHTML = this.miss;
};


var Dialog = function () { };
Dialog.prototype.characterDialog = function () {
    Swal.mixin({
       showCancelButton: false

    }).queue([
        {
            title: 'Escolha um Personagem',

            html:
                '<form id="personagem">' +
                '<label><input type="radio" name="character" value="images/personagem-garota-chifruda.png" >' +
                '<img src="./images/personagem-garota-chifruda.png"></label>' +
                '<label><input type="radio" name="character" value="images/personagem-garota-gata.png">' +
                '<img src="./images/personagem-garota-gata.png"></label>' +
                '<label><input type="radio" name="character" value="images/personagem-garota-princesa.png" >' +
                '<img src="./images/personagem-garota-princesa.png"></label>' +
                '<label><input type="radio" name="character" value="images/personagem-garota-rosa.png" >' +
                '<img src="./images/personagem-garota-rosa.png"></label>' +
                '<label><input type="radio" name="character" value="images/personagem-garoto.png" checked>' +
                '<img src="./images/personagem-garoto.png"></label>' +
                '</form>'
            ,
            focusConfirm: true,
            confirmButtonText:'Escolher',
            confirmButtonAriaLabel: 'escolher',
            preConfirm: () => {
                let personagens = document.getElementById("personagem").elements;
                for (let j = 0; j < personagens.length; j++) {
                    if (personagens[j].checked) {
                        return personagens[j].value;

                    }
                }
            }
        },
        {
            title: 'Qual o Seu Nome',
            focusConfirm: true,
            confirmButtonText:'Escolher',
            confirmButtonAriaLabel: 'escolher',
            input: 'text',
            inputValidator: (value) => {
                if(!value){
                    return 'O Nome não pode se vazio!'
                }
            
            }
        }
        
    ]).then((result) => {
        player.sprite = result.value[0].replace('./','');
        document.getElementById("player-name").innerHTML = result.value[1];
        if (result.value) {
            Swal.fire({
                imageUrl: result.value[0],
                imageAlt: 'personagem',
                title : result.value[1],
                confirmButtonText: 'Jogar!'
            })
        }
    })


}



// Agora instancie seus objetos.
// Coloque todos os objetos inimigos em um array chamado allEnemies
// Coloque o jogador em uma variável chamada player

var numEnemies = 3;
var allEnemies = [];
for (var i = 0; i < numEnemies; i++) {
    allEnemies.push(new Enemy(i * 101, (i + 1) * 83));
}

var player = new Player();
var score = new Score();
var dialog = new Dialog();
dialog.characterDialog();

// Esta função escuta pela tecla pressionada e envia a tecla para o método
// Player.handleInput(). Você não precisa modificar.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
