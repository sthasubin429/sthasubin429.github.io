var img = new Image();
img.src="images/road.png";
const LANE_POSITION = [42, 178,310];
const GAP = 130;
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
                // case "ArrowUp":
                //     // Up pressed
                //     console.log('up arrow')
                //     break;
                // case "ArrowDown":
                //     console.log('down arrow')
                //     break;
            }

        }
    }

    function runGame(){
        this.ctx.drawImage(img,0,0,400,800);
        this.player = new player(1);
        update();
        updateSpeed();
        randomGenerator();
        
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
        }   
        this.worldAnimation = requestAnimationFrame(update);
        
    }

    function loadGame(){
        this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height);
        ctx.font = "30px Comic Sans MS";
        ctx.fillText("Press Enter To start", 70, this.canvas.height/2);
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
        this.speed += 0.25;
        setTimeout(updateSpeed, 1000);
    }
    function updateScore(){

        var scoreElement = document.getElementById('score');
        scoreElement.innerHTML = `Score: ${this.score}`;
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