class Game{

   constructor(){}
  
   readGameState(){
    var gameStateRef = db.ref("gameState")
    gameStateRef.on("value",function(data){
        gameState = data.val();
    })
   }

   updateGameState(stateValue){
       db.ref("/").update({
           gameState : stateValue
       })
   }

   start(){
      if(gameState === 0){ 
       player = new createPlayer();
       player.readPlayerCount()
       form = new Form();
       form.display()
      }
   }

   updatePositions(){
       form.greeting.hide();
       player.readPlayersAndDisc();
       if(gameObject !== undefined){
           p1.body.position.x = gameObject.player1.x
           p1.body.position.y = gameObject.player1.y
           p2.body.position.x = gameObject.player2.x
           p2.body.position.y = gameObject.player2.y
           disc.body.position.x = gameObject.disc.x
           disc.body.position.y = gameObject.disc.y
     }
       if(keyDown(LEFT_ARROW)){
           player.x = player.x - 10
           player.updatePlayerDetails();
       }
       if(keyDown(RIGHT_ARROW)){
           player.x = player.x + 10 
           player.updatePlayerDetails();
       }
       if(keyDown(UP_ARROW)){
           player.y = player.y - 10 
           player.updatePlayerDetails();
       }
       if(keyDown(DOWN_ARROW)){
           player.y = player.y + 10
           player.updatePlayerDetails();
       }
       var currentPlayer = null;
       var force = 0
       if(player.index === 1){
           currentPlayer = p1
           force=random(-5,-1)
       }else if(player.index === 2){
           currentPlayer = p2
           force=random(1,5)
       }
       var collision = Matter.SAT.collides(currentPlayer.body,disc.body);
       var flag = collision.collided
       console.log(collision.collided);
       if(flag){
           //Matter.Body.setStatic(disc.body,false)
           Matter.Body.applyForce(disc.body,disc.body.position,{x:0,y:force})
           //disc.y=disc.y+force
           flag = false
       }
       disc.updateDiscDetails();
   }

}