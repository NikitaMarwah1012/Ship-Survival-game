var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterng, shipimg, helicopterimg, bombimg, restartimg;
var water, ship, helicopter, bomb;
var helibombGroup, bombGroup;
var score = 0;


localStorage["HighScore"] = 0;

function preload(){
  skybg = loadImage("images/skybg.jpg");
  waterbg = loadImage("images/waterbg.png");
  shipimg = loadImage("images/ship.png");
  helicopterimg = loadImage("images/helicopter.png");
  bombimg = loadImage("images/bomb.png");
  restartimg = loadImage("images/restart.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(200,350,600,600);
  water.addImage("water ground",waterbg);
 
  //slower speed of animation
  shipimg.frameDelay = 15;
  //creating ship
  ship = createSprite(200,300,50,50);
  ship.addImage("ship",shipimg)
  ship.scale = 0.4;
  
  //creating helicopter group
  helicopterGroup = new Group();

  //creating bomb group
  bombGroup = new Group();
  
  //creating restart button
  restart = createSprite(400,200,50,50);
  restart.addImage("restart",restartimg);
  restart.scale = 0.2;
  
    
  score = 0;

  ship.setCollider("rectangle",0,0,400,400);
  ship.debug = "true";

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  
  if(gameState === PLAY){
    restart.visible = false;
    score = score + Math.round(frameCount/300);
    water.setVelocity(-2,0);
    
    
    if(keyDown("left") && ship.position.x > 60){
      ship.position.x -= 5;
    }
    if(keyDown("right") && ship.position.x < 740){
      ship.position.x += 5;
    }
    

    spawnHelicopter();
    spawnBomb();
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  else if(gameState === END){
    restart.visible = true;
    water.setVelocity(0,0);
   
    bombGroup.destroyEach();
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }
  
  
  
  if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
  if(frameCount%150 === 0){
    bomb = createSprite(random(200,600),90,20,20);
    bomb.addImage("bomb falling",bombimg);
    bomb.setVelocity(0,5);
    
    bomb.scale = 0.1;
    
    bomb.lifetime = 60;
    
    bombGroup.add(bomb);
  }
}


function reset(){
  gameState = PLAY;
  restart.visible = false;
  
  if(localStorage["HighScore"]<score){
    localStorage["HighScore"] = score;
  }
  
  console.log("HIGH SCORE IS: " + localStorage["HighScore"]);
  
  score = 0;
  
}

