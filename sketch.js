//Vamos começar definindo variáveis:

//Uma para guardar as imagens do Trex
var trex_running;
//Uma para guardar o sprite trex
var trex;
//Uma para o trex depois da colisão
var trex_collided;
//Uma para guardar as imagens do ground
var groundImage;
//Uma para guardar o sprite ground
var ground;
//Uma para guardar o solo invisivel
var invisibleGround;
//Uma para guardar o sprite nuvem
var cloud;
//Uma para guardar a imagem da nuvem
var cloudImage;
//Uma para guardar o sprite obstacle
var obstacle;

//Seis variáveis para guardar as imagens dos obstaculos
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

//Uma para armazenar o placar
var score;

//Uma para guardar o estado do jogo
var gameState = PLAY;

//Uma para guardar o estago jogando
var PLAY = 1;

//Uma para guardar o estago fim
var END = 0;

//Uma para guardar o grupo de nuvens
var cloudsGroup;

//Uma para guardar o grupo de obstaculos
var obstaclesGroup;

//Uma para guardar o icon do gameOver
var gameOverImg;

//Uma para guardar o icone do reiniciar
var restartImg;
//Uma para o sprite gameOver
var gameOver;
//Uma para o sprite restart
var restart;

//Para carregar os efeitos sonoros
var jumpSound , checkPointSound, dieSound;

//Vamos definir uma função que carrega ativos
function preload() {
  //Vamos carregar na variável trex_running todas as imagens do Trex com a ajuda da função loadAnimation()
  trex_running = loadAnimation(
    "./Img/trex1.png",
    "./Img/trex3.png",
    "./Img/trex4.png"
  );

  //Vamos carregar na variável groundImage todas as imagens do ground com a ajuda da função loadAnimation()
  groundImage = loadAnimation("./Img/ground2.png");

  //Vamos carregar na variável cloudImage uma imagem  com a ajuda da função loadImage()
  cloudImage = loadImage("./Img/cloud.png");

  //Vamos carregar nas variáveis obstacle.. as imagens  com a ajuda da função loadImage()
  obstacle1 = loadImage("./Img/obstacle1.png");
  obstacle2 = loadImage("./Img/obstacle2.png");
  obstacle3 = loadImage("./Img/obstacle3.png");
  obstacle4 = loadImage("./Img/obstacle4.png");
  obstacle5 = loadImage("./Img/obstacle5.png");
  obstacle6 = loadImage("./Img/obstacle6.png");

  //Vamos carregar em suas respectivas variaveis as imagens do game over e do restart
  gameOverImg = loadImage("./Img/gameOver.png");
  restartImg = loadImage("./Img/restart.png");

  //Vamos carregar a imagem do trex depois da colisão
  trex_collided = loadImage("./Img/trex_collided.png");

  //Vamos carregar as musicas nas variáveis
  jumpSound = loadSound("./Music/jump.mp3");
  dieSound = loadSound("./Music/die.mp3");
  checkPointSound = loadSound("./Music/checkPoint.mp3");
}

//Vamos definir uma função que é executada apenas uma vez
function setup() {
  //Vamos criar a tela de jogo com uma largura de 600px e 200px de altura
  createCanvas(600, 200);

  //Vamos criar um sprite para o Trex com uma posição inical de x = 50px, y = 160px, largura de 20px e altura de 50px
  trex = createSprite(50, 160, 20, 50);

  //Vamos adicionar ao sprite Trex a animação que está na trex_running com a ajuda da função addAnimation("nome_da_animação", frames)
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);

  //Vamos definir um tamanho para o Trex com a ajuda da fução scale
  trex.scale = 0.5;

  //Vamos criar um sprite para o chão com uma posição inical de x = 200px, y = 180px, largura de 400px e altura de 20px
  ground = createSprite(200, 180, 400, 7);

  //Vamos adicionar ao sprite ground a animação que está na groundImage com a ajuda da função addAnimation("nome_da_animação", frames)
  ground.addAnimation("ground", groundImage);

  //Vamos mudar a posição x do chão para aa largura da tela dividido por 2
  ground.x = ground.width / 2;

  //Vamos criar um sprite para o solo invisivel
  invisibleGround = createSprite(200, 190, 400, 10);
  //Vamos tornar o sprite invisivel com a ajuda da função visible
  invisibleGround.visible = false;

  //Vamos criar um sprite para o fim de jogo ...
  gameOver = createSprite(300, 100);
  //Vamos atribuir a imagem do sprite
  gameOver.addImage(gameOverImg);
  //Vamos definir a escala do sprite
  gameOver.scale = 0.5;

  //Vamos criar um sprite para o reiniciar ...
  restart = createSprite(300, 140);
  //Vamos atribuir a imagem do sprite
  restart.addImage(restartImg);
  //Vamos definir a escala do sprite
  restart.scale = 0.5;

  //vamos atribuir ao placar um valor
  score = 0;

  //Vamos atribuir a variavel obstaclesGroup uma nova função Group()
  obstaclesGroup = createGroup();

  //Vamos atribuir a variavel cloudsGroup uma nova função Group()
  cloudsGroup = createGroup();

  gameState = PLAY;

  //vamos ajustar o raio de colisão do trex
  //.setCollider(forma, x-offset, y-offset., raio)
  trex.setCollider("circle", 0, 0, 40);
  //Vamos tornar o raio visivel
  trex.debug = true;
}

//Vamos definir uma função que é executada continuamente (não para)
function draw() {
  //Vamos definir um fundo
  background(180);

  //Vamos exibir o placar na tela
  text("Pontuação: " + score, 500, 50);
  console.log("Isto é " + gameState);

  //Vamos verificar se o estado do jogo é PLAY
  if (gameState === PLAY) {
    //Vamos definir a invisibilidade dos sprites
    gameOver.visible = false;
    restart.visible = false;

    //vamos aumentar a velocidade do solo em 3x a cada 100 pontos
    ground.velocityX = -(4+3 * score/100);

    //Vamos mover o chão
    //ground.velocityX = -4;

    //Vamos aumentar o placar a cada 60 frames
    score = score + Math.round(frameCount / 60);

    //Vamos criar uma condição para não deixar o chão sumir
    //Se a posição x do chão for menor que 0
    if (ground.x < 0) {
      //Mude a posição x do chão para aa largura da tela dividido por 2
      ground.x = ground.width / 2;
    }

    //Vamos definir uma condição para o Trex pular
    //Se a tecla espaço for pressionada e a posição Y dele for mior   ou igual a 100
    if (keyDown("space") && trex.y >= 150) {

      //Vamos definir uma velocidade Y negativa
      trex.velocityY = -12;

      //Vamos tocar a musica
      jumpSound.play();
    }


    //Vamos definir uma gravidade atribuindo continuamente uma velocidade positiva
    trex.velocityY = trex.velocityY + 0.8;

    //Vamos chamar a função que desenha os obstaculos
    spawnObstacles();

    //Vamos chamar a função que desenha as nuvens
    spawnClouds();

    //Vamos verificar se um obstaculo está tocando no Trex a partir do grupo de obstaculos
    if (obstaclesGroup.isTouching(trex)) {

      //Vamos mudar o estado do jogo para fim
      gameState = END;

      //Vamos tocar a musica
      dieSound.play();
    }


    //Condição para verificar se o placar é maior que zero e se o placar é divisivel por 100
    //Assim a cada 100 pontos ele toca uma musica
    if(score>0 && score%100 ===0){
      //Vamos tocar musica
      checkPointSound.play();
    }

    

  } else if (gameState === END) {
    //vamos tornar visivel os sprites
    gameOver.visible = true;
    restart.visible = true;

    //Vamos parar a velocidade do chãoe do trex
    ground.velocityX = 0;
    trex.velocityY = 0;

    //Vamos mudar a imagem do sprite
    trex.changeAnimation("collided", trex_collided);

    //Vamos definir o tempo de vida para os sprites
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    //Vamos zerar a velocidade dos grupos de sprites
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }

  //Vamos impedir que o Trex caia fazendo com que ele colida no chão
  trex.collide(invisibleGround);

  //Vamos chamar a função que desenha todos os sprites na tela de jogo
  drawSprites();

  //console.log(frameCount);
}

//Vamos definir uma função que quando for chamada irá desenhar nuvens
function spawnClouds() {
  //vamos definir uma condição que verifica se o tempo de jogo é multiplo de 60
  if (frameCount % 60 === 0) {
    //Vamos criar um sprite para a nuvem com uma posição inical de x = 600px, y = 100px, largura de 40px e altura de 10px
    cloud = createSprite(600, 100, 40, 10);

    //Vamos adicionar ao sprite cloud uma imagem
    cloud.addImage(cloudImage);

    //Vamos definir um tamanho para o sprite cloud
    cloud.scale = 0.4;

    //vamos definir uma velocidade horizontal para o sprite cloud
    cloud.velocityX = -3;

    //vamos definir uma posição vertical Y aleatoria para os sprites cloud
    //A função Math.round() arredonda o valor, já a função random() escolhe um numero aleatorio dentro de um intervalo de numeros
    cloud.y = Math.round(random(10, 60));

    //Vamos atribuir a profundidade da nuvem como a mesma do trex
    cloud.depth = trex.depth;
    //Logo após, aumentamos a profundidade do trex para que ele fique acima do sprite cloud
    trex.depth = trex.depth + 1;

    //vamos determinar um tempo de vida para os sprites cloud
    //para determinar esse tempo você pode dividir o valor da largura da tela de jogo pela velocidade do sprite, no nosso caso 600/3
    cloud.lifetime = 200;

    //Vamos adicionar as nuvens ao grupo
    cloudsGroup.add(cloud);
  }
}

//Vamos definir uma função que quando for chamada irá desenhar os obstaculos
function spawnObstacles() {
  //vamos definir uma condição que verifica se o tempo de jogo é multiplo de 60
  if (frameCount % 60 === 0) {
    //Vamos criar um sprite para o obstaculo com uma posição inical de x = 600px, y = 165px, largura de 10px e altura de 40px
    obstacle = createSprite(600, 165, 10, 40);

    //Vamos aumentar a velocidade dos obstaculos a cada 100 pontos
    obstacle.velocityX = -(6+score/100);

    //vamos definir uma velocidade horizontal para o sprite obstacle
    //obstacle.velocityX = -6;

    //Vamos definir um tamanho para o sprite obstacle
    obstacle.scale = 0.4;

    //Vamos definir uma variável para guardar valores aleatorios de 1 a 6
    //A função Math.round() arredonda o valor, já a função random() escolhe um numero aleatorio dentro de um intervalo de numeros
    var rand = Math.round(random(1, 6));

    //Vamos usar a declaração switch para verivicar 6 casos
    //A declaração switch está verificando qual o valor da variável rand para selecionar um caso para executar
    switch (rand) {
      //Se rand for igual a  1, logo ele carrega no sprite obstacle a imagem do obstaculo 1
      case 1:
        obstacle.addImage(obstacle1);

        break;

      //Se rand for igual a  2, logo ele carrega no sprite obstacle a imagem do obstaculo 2
      case 2:
        obstacle.addImage(obstacle2);

        break;

      //Se rand for igual a  3, logo ele carrega no sprite obstacle a imagem do obstaculo 3
      case 3:
        obstacle.addImage(obstacle3);

        break;

      //Se rand for igual a  4, logo ele carrega no sprite obstacle a imagem do obstaculo 4
      case 4:
        obstacle.addImage(obstacle4);

        break;

      //Se rand for igual a  5, logo ele carrega no sprite obstacle a imagem do obstaculo 5
      case 5:
        obstacle.addImage(obstacle5);

        break;

      //Se rand for igual a  6, logo ele carrega no sprite obstacle a imagem do obstaculo 6
      case 6:
        obstacle.addImage(obstacle6);

        break;
      default:
        break;
    }

    //Vamos definir um tamanho para o sprite obstacle
    obstacle.scale = 0.5;

    //Vamos definir um tempo de vida para o sprite obstacle
    obstacle.lifetime = 200;

    //Vamos adicionar os obstaculos ao grupo
    obstaclesGroup.add(obstacle);
  }
}
