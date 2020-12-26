var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds,cloudsGroup,cloudim
var cactus,cactusGroup,cactim,cactim2,cactim3,cactim4,cactim5, cacim6
var gamestate = "play"
var checkpoint
var die,jump
var gameover, gameoverimage, restart, restartimage
var score = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudim=loadImage("cloud.png")
  
   cactim=loadImage("obstacle1.png")
    cactim2=loadImage("obstacle2.png")
cactim3=loadImage("obstacle3.png")
     cactim4=loadImage("obstacle4.png")
      cactim5=loadImage("obstacle5.png")
     cactim6=loadImage("obstacle6.png")
  
  trex_collided=loadAnimation("trex_collided.png")
  
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("Checkpoint.mp3")
  die=loadSound("Die.mp3")
  
   gameoverimage = loadImage("game oveeer.png")
  restartimage = loadImage("restart.png")
}

function setup() {
  background(220)
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  
   trex.addAnimation("trex_collided",trex_collided)
 
cactusGroup = new Group()
cloudsGroup = new Group()
  
  gameover=createSprite(300,50)
  gameover.addImage("gameover",  gameoverimage)
  gameover.visible=false
  gameover.scale = 0.5
  
  restart=createSprite(300,110)
  restart.addImage("restart", restartimage)
  restart.visible=false
  restart.scale = 0.5
  
}

function draw() {
  //set background color
  background("white");
  
  text("Score :"+score,450,50)
  
  if(gamestate === "play"){
    score = score + Math.round(frameCount/40)
    
    // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 160) {
    jump.play()
    trex.velocityY = -13;
  }
    trex.velocityY = trex.velocityY + 0.8
    trex.setCollider("circle",0,0,45)
  
  if (ground.x < 0){
    ground.x = ground.width/2;
    
    
  }
    
   
    cactusSpawner()
  cloudSpawner()
  if(cactusGroup.isTouching(trex))  {
    gamestate = "end"
    die.play()
    gameover.visible=true
 restart.visible=true 
    
  }
}

  else if(gamestate === "end"){
    ground.velocityX = 0 
    cactusGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cactusGroup.setLifetimeEach(-2)
    cloudsGroup.setLifetimeEach(-2)
    trex.velocityX=0
   trex.changeAnimation("trex_collided",trex_collided)
    
    
    if(mousePressedOver(restart)){
      gamestate="play"
      gameover.visible=false
      restart.visible=false
      score = 0
      trex.changeAnimation("running", trex_running)
      cactusGroup.destroyEach();
      cloudsGroup.destroyEach();
        ground.velocityX = -4;
    }
  
  }
  
  
  
  
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}



function cloudSpawner(){
  if(frameCount%80 === 0){
    clouds = createSprite(600,100,40,10)
    clouds.y = Math.round(random(10,100))
    clouds.addImage(cloudim)
    clouds.velocityX=-2
    clouds.depth = trex.depth
    trex.depth = trex.depth +1
      
    clouds.lifetime=130
    cloudsGroup.add(clouds)
  }
  

}

function cactusSpawner(){
  if(frameCount%60===0){
    cactus = createSprite(600,160,10,50)
    cactus.velocityX = -4
    var randomNo = Math.round(random(1,6))
    switch(randomNo){
      case 1 : cactus.addImage(cactim)
        break
          case 2 : cactus.addImage(cactim2)
        break
          case 3 : cactus.addImage(cactim3)
        break
          case 4 : cactus.addImage(cactim4)
        break
          case 5 : cactus.addImage(cactim5)
        break
          case 6 : cactus.addImage(cactim6)
        break
        
        
    }
        
        cactus.scale = 0.5
        cactus.lifetime = 300
    
    cactusGroup.add(cactus)
  }
    
    
  
}
  




 