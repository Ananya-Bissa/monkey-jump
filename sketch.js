
var PLAY=1,END=0,gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup;
var score=0,ground,survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(500, 400);
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  
  ground = createSprite(200,390,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.175;
  
}
  

function draw() {
 
  background(180);
  //displaying score
  text("Survival time: "+ score, 400,50);
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if(gameState === PLAY){

    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/80);
    
    if(score>0 && score%100 === 0){
        
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    spawnBanana();
  
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        gameState = END;
      
    }
    
  }
   else if (gameState === END) {
         
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      monkey.velocityY = 0;
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);   
   }
  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  


  drawSprites();
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,350,10,10);
    
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6 + score/100);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.185;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 
    }
   
    
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,40,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    //add each banana to the group
    bananaGroup.add(banana);
  }
}


  








