const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 104;
function enemy(){
    this.enemyPosition = {
        x :LANE_POSITION[getRndInteger(0,3)],
        y : -30
    }
    this.enemyCar = new Image();
    if(getRndInteger(0,3) === 0){
        this.enemyCar.src="images/enemy1.png";
    }
    else if(getRndInteger(0,3) === 1){
        this.enemyCar.src="images/enemy2.png";
    }
    else{
        this.enemyCar.src="images/enemy3.png";

    }

}

enemy.prototype.drawEnemy = function(){
    ctx.drawImage(this.enemyCar,this.enemyPosition.x,this.enemyPosition.y,ENEMY_WIDTH,ENEMY_HEIGHT);
}
enemy.prototype.updateEnemy = function(){
    this.enemyPosition.y += speed;
}
enemy.prototype.enemyCheckOutOfBound = function(){
    if(this.enemyPosition.y >= canvas.height+ENEMY_HEIGHT){
        return true;
    }
    else{
        return false;
    }
}
enemy.prototype.checkCollision = function(player){

    var rect1 = {x: player.position.x,
                 y: player.position.y, 
                 width: PLAYER_WIDTH, 
                 height: PLAYER_HEIGHT}
    var rect2 = {x: this.enemyPosition.x,
                 y: this.enemyPosition.y, 
                 width: ENEMY_WIDTH, 
                 height: ENEMY_HEIGHT}

    if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) {
        return true;
    }
    else{
        return false;
    }
}
enemy.prototype.getPositionY = function(){
    return this.enemyPosition.y;
}
enemy.prototype.detectStrike = function(bullets){
    for(let i =0;i<bullets.length;i++){
        var rect1 = {x: bullets[i].bulletPosition.x,
            y: bullets[i].bulletPosition.y, 
            width: BULLET_WIDTH, 
            height: BULLET_HEIGHT}

        var rect2 = {x: this.enemyPosition.x,
                    y: this.enemyPosition.y, 
                    width: ENEMY_WIDTH, 
                    height: ENEMY_HEIGHT}

        if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
            removeBullet(i)
            return true
        }
        else{
            return false;
        }
    }

}
// enemy.prototype.update = function(){

// }