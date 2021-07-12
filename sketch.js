var gameState = "START";
var swamp;
var platypus;
var duck;
var border1;
var score = 0;
var ducksGroup;

function preload(){
    platypus_walking = loadImage("platypus.png");
    swamp_background = loadImage("swamp.jpg");
    duck_walking = loadImage("duck.png");
}

function setup() {
    createCanvas(600,400);

    swamp = createSprite(400,200);
    swamp.addImage(swamp_background);
    swamp.scale = 0.5;

    platypus = createSprite(100,350,10,10);
    platypus.addImage(platypus_walking);
    platypus.scale = 0.15;

    ground = createSprite(300,400,600,5);
    ground.visible = false;

    ducksGroup = new Group();
}

function draw() {
    background("green");
    drawSprites();


    if(gameState === "START") {
        border1 = createSprite(475,25,275,50);
        border1.shapeColor = "black";
        textSize(25);
        text("Press space to begin!", 350, 25);

        if(keyDown("space")) {
            gameState = "PLAY";
        }
    }

    if(gameState === "PLAY") {
        textSize(25);
        text("Score: " + score, 350, 25);
        score = score + Math.round(getFrameRate()/60);
        spawnDuck();

        if(keyDown("space") && platypus.y >= 350) {
            platypus.velocityY = -12;
        }

        swamp.velocityX = -(2 + score / 2000);

        if(swamp.x < 200) {
            swamp.x = swamp.width/4;
          }

        platypus.velocityY = platypus.velocityY + 0.5;

        if(ducksGroup.isTouching(platypus)) {
            gameState = "END"
        }
    }

    if(gameState === "END") {
        platypus.velocityY = 0;
        ducksGroup.setVelocityXEach(0);
        ducksGroup.setLifetimeEach(-1);
        swamp.velocityX = 0;
        textSize(25);
        text("Press space to restart", 350, 25);

        if(keyDown("space")) {
            reset();
        }
    }

    console.log(gameState);
    platypus.collide(ground);
}

function spawnDuck() {
  if(frameCount % 120 === 0) {
    duck = createSprite(550,360);
    duck.addImage(duck_walking);
    duck.velocityX = -(7.5 + score / 500);
    duck.scale = 0.04;
    duck.lifetime = 600;
    ducksGroup.add(duck);    
  }

}

function reset() {
    gameState = "PLAY";
    duck.remove();
    score = 0;
    swamp.x = 400;
    swamp.y = 200;
  }