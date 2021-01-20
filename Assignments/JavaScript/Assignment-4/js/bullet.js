const BULLET_POSITION = 650;
const BULLET_WIDTH = 16;
const BULLET_HEIGHT = 38;
const BULLET_SPEED = 5;
var bulletImg = new Image();
bulletImg.src="images/bullet.png";

function Bullet(x){

    this.bulletPosition = {
        x : LANE_POSITION[x]+PLAYER_WIDTH/3,
        y : BULLET_POSITION
    }
}

Bullet.prototype.drawBullet = function(){
    ctx.drawImage(bulletImg,this.bulletPosition.x,this.bulletPosition.y,BULLET_WIDTH,BULLET_HEIGHT);

}
Bullet.prototype.updateBullet = function(){
    this.bulletPosition.y -= BULLET_SPEED+speed;
}
Bullet.prototype.BulletCheckOutOfBound = function(){
    if(this.bulletPosition.y < 1){
        return true;
    }
    else{
        return false;
    }
}
