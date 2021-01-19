var playerCar = new Image();
playerCar.src="images/player.png";
const PLAYER_POSITION = 680;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 104;

function player(x){
    
    this.position = {
        x :LANE_POSITION[x],
        y : PLAYER_POSITION
    }

}

player.prototype.drawPlayer = function(x){
    this.position.x = LANE_POSITION[x];
    ctx.drawImage(playerCar,this.position.x,this.position.y,PLAYER_WIDTH, PLAYER_HEIGHT);
}