var img = new Image();
img.src="images/road.png";
const LANE_POSITION = [42, 178,310];
const GAP = 130;
const MAX_BULLET = 5;
const STORAGE_KEY = 'GameHighScore'
function game(){
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 400;
    this.canvas.height = 800;
    this.gameLoad = false;
    this.backgroudPositionY = 1;
    this.player;
    this.playerPosition = 1;
    this.enemies = [];
    this.speed = 3;
    this.count = 1;
    this.previousGeneration = 13;
    this.score = 0;
    this.worldAnimation;
    this.gameOver = false;
    this.bullet = [];
    this.bulletFired = 0;
    this.collisionBullet;
    this.removeBullet = removeBullet.bind(this);
    this.highestScore = 0;

    if(localStorage.getItem(STORAGE_KEY) != null){
        this.highestScore = parseInt(localStorage.getItem(STORAGE_KEY));
        var highScoreElement = document.getElementById('highest-score');
        highScoreElement.innerHTML = `Highest Score: ${this.highestScore}`;
    }
    loadGame();
    updateScore();
    document.addEventListener('keypress', function(e){
        if(e.key === 'Enter' && !gameLoad){
            gameLoad = true;
            runGame();
            //
        }
    });
    document.addEventListener('keypress', function(e){
        if(e.code === 'Enter' && gameOver){
            location.reload(true);
        }
    });
    
    document.addEventListener('keydown', changeLane); 

    function changeLane(event){
        if(gameLoad){
            switch (event.key) {
                case "ArrowLeft":
                    if(playerPosition != 0){
                        playerPosition = playerPosition-1;
                    }
                    break;

                case "ArrowRight":
                    if(playerPosition != 2){
                        playerPosition = playerPosition+1;
                    }
                    break;   

                case "ArrowUp":
                    createBullet();
                    bulletCountUpdate();
                    break;
            }

        }
    }

    function runGame(){
        this.ctx.drawImage(img,0,0,400,800);
        this.player = new player(1);
        update();
        updateSpeed();
        randomGenerator();
        reload();
        bulletCountUpdate();
    }

    function update(){
        if(this.backgroudPositionY >= this.canvas.height){
            this.backgroudPositionY = 0;
        }
        else{
            this.backgroudPositionY += this.speed;
        }

        randomGenerator();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img,0,this.backgroudPositionY,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(img,0,(this.backgroudPositionY-this.canvas.height),this.canvas.width,this.canvas.height);
        //drawImage(image, top,left,width,height)
        
        
        this.player.drawPlayer(this.playerPosition);

        
        for(let i =0; i<enemies.length;i++){
            this.enemies[i].updateEnemy();
            this.enemies[i].drawEnemy();
            if(this.enemies[i].checkCollision(this.player)){
                cancelAnimationFrame(this.worldAnimation );
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height);
                ctx.font = "50px Comic Sans MS";
                ctx.fillText("Game Over", 70, this.canvas.height/3);
                ctx.fillStyle = "Green";
                ctx.font = "30px Comic Sans MS";
                ctx.fillText("Press Enter To Play Again", 20, this.canvas.height/2);
                this.gameOver = true;
                return;
            }
            if( this.enemies[i].enemyCheckOutOfBound()){
                this.enemies.splice(i, 1); 
                this.score ++;
                updateScore();
            }
            else if(this.enemies[i].detectStrike(this.bullet)){
                this.enemies.splice(i, 1); 
                this.score ++;
                updateScore();
            }
        }

        for(let j =0;j<this.bullet.length;j++){
            this.bullet[j].updateBullet();
            this.bullet[j].drawBullet();
            
            if( this.bullet[j].BulletCheckOutOfBound()){
                this.bullet.splice(j, 1); 
            };
        }   
        this.worldAnimation = requestAnimationFrame(update);
        
    }

    function loadGame(){
        this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height);
        ctx.font = "50px Comic Sans MS";
        ctx.fillText("Welcome", 100, 200);
        ctx.fillStyle = "Green";
        ctx.font = "40px Comic Sans MS";
        ctx.fillText("How To Play", 50, 320);
        ctx.fillStyle = "Blue";
        ctx.font = "26px Comic Sans MS";
        ctx.fillText("Press Enter to Start", 50, 400);
        ctx.fillText("Left Arrow to move Left", 50, 450);
        ctx.fillText("Right Arrow to move Right", 50, 500);
        ctx.fillText("Up Arrow to Fire", 50, 550);
        ctx.fillStyle = "red";
        ctx.font = "20px Comic Sans MS";
        ctx.fillText("Notes:", 50, 650);
        ctx.font = "16px Comic Sans MS";
        ctx.fillText("Max Bullets: 5", 50, 670);
        ctx.fillText("Bullets Reloaded every 8 Seconds", 50, 690);
    }

    function createEnemy(){
        var newEnemy = new enemy();
        this.enemies.push(newEnemy);
        if(getRndInteger(0,9) === 0){
            var newEnemy = new enemy();
            this.enemies.push(newEnemy); 
        }
    }
    function updateSpeed(){
        this.speed += 0.2;
        setTimeout(updateSpeed, 1000);
    }
    function updateScore(){
        var scoreElement = document.getElementById('current-score');
        scoreElement.innerHTML = `Score : ${this.score}`;
        if(this.score >= this.highestScore){
            this.highestScore = this.score;
            var highScoreElement = document.getElementById('highest-score');
            highScoreElement.innerHTML = `Highest Score : ${this.highestScore}`;
            localStorage.setItem(STORAGE_KEY, this.highestScore);
        }
        
    }
    function randomGenerator(){
        var d = new Date(0);
        if(this.enemies.length<1){
            createEnemy();
        }
        else if(this.backgroudPositionY >= this.canvas.height/2.3 && this.enemies.length === 1){
            if(getRndInteger(0,3) === 2){
                createEnemy();  
            } 
        }

    }
    function createBullet(){
        if(this.bulletFired < MAX_BULLET){
            var newBullet = new Bullet(this.playerPosition);
            this.bullet.push(newBullet);
            bulletFired ++;
        }
    }
    function reload(){
        this.bulletFired = 0;
        bulletCountUpdate();
        setTimeout(reload, 8000);
    }
    function removeBullet(x){
        this.bullet.splice(x, 1); 
    }
    function bulletCountUpdate(){
        var scoreElement = document.getElementById('bullets');
        let remainingBullets = MAX_BULLET - this.bulletFired
        scoreElement.innerHTML = `Remaining Bullets : ${remainingBullets}`;
    }
}
        

/**
 * 
 * @param {Int} min Minimum Integer Value
 * @param {Int} max Maxmium Integer Value
 */
const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

window.onload = game;