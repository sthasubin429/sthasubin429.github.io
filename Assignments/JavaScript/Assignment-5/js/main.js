class Main{
    constructor(canvasID, containerID){
        this.container = document.getElementById(containerID);
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.world;
        this.bird;
        this.pipeArray = [];
        this.animationID = 0;
        this.isStart = true;
        this.score = 0;
        this.highestScore = 0;

        //function binding
        this.init = this.init.bind(this);
        this.update = this.update.bind(this);
        this.generatePipe = this.generatePipe.bind(this);
        this.playGame = this.playGame.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.restGame = this.restGame.bind(this);
        this.drawScore = this.drawScore.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.getHighScore = this.getHighScore.bind(this);
        
        this.canvasClick = this.canvasClick.bind(this);
        this.canvasSpaceKey = this.canvasSpaceKey.bind(this);
    }

    init(){
        if(this.isStart){
            this.world = new World(this.ctx);
            this.world.init();   
        
            this.ctx.drawImage(flappyBird, 69,100,FLAPPY_BIRD_WIDTH,FLAPPY_BIRD_HEIGHT);      
            this.ctx.drawImage(birdNormal, 120,145,BIRD_WIDTH,BIRD_HEIGHT);      
            this.ctx.drawImage(getReady, 72,220,GET_READY_WIDTH,GET_READY_HEIGHT);      
            this.ctx.drawImage(tap, 72,300,TAP_WIDTH,TAP_HEIGHT); 

            this.ctx.font = "500 30px Noto Sans JP";
            this.ctx.fillStyle = "white";
            this.ctx.fillText("Click To Start", 60, 450);

            this.getHighScore();
            this.drawScore();

            this.container.addEventListener('click', this.playGame);
        }
    }

    update(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.world.init();
        

        this.bird.updateBird();
        this.bird.drawBird();
        

        if(this.bird.wallCollision()){
            cancelAnimationFrame(this. animationID);
            this.gameOver();
            return;
        }

        this.generatePipe();
        
        for(let i =0;i<this.pipeArray.length;i++){
            this.pipeArray[i].updatePipe();
            this.pipeArray[i].drawPipe();

            if(this.pipeArray[i].detectCollision(this.bird)){
                cancelAnimationFrame(this.animationID);
                this.gameOver();
                return;
            }

            if(this.pipeArray[i].checkPipePosition()){
                this.pipeArray.splice(i,1);
                this.updateScore();
            }
        }
        this.drawScore();

        this.animationID = requestAnimationFrame(this.update);
    }

    playGame(){
        this.container.removeEventListener('click', this.playGame);

        this.isStart = false;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.world = new World(this.ctx);
        this.world.init();

        this.bird = new Bird(this.ctx, CANVAS_HEIGHT/2);
        this.bird.drawBird();
        this.bird.frameCount();

        this.generatePipe();

        this.drawScore();

        this.update();

        this.container.addEventListener('click', this.canvasClick);
        document.addEventListener('keydown', this.canvasSpaceKey); 
    }

    gameOver(){
        let currentScore = this.score;
        this.restGame();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.world.init();
        this.ctx.drawImage(gameOver, 69,100,GAME_OVER_WIDTH,GAME_OVER_HEIGHT);

        this.ctx.font = "400 24px Noto Sans JP";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Click To Play Again", 50, 240);

        this.ctx.font = "400 24px Noto Sans JP";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Your Score  :  ${currentScore}`, 60, 400);
        this.ctx.fillText(`Highest Score  :  ${this.highestScore}`, 60, 440);

        this.container.addEventListener('click', this.playGame);
    }

    restGame(){
        this.pipeArray = [];
        this.animationID = 0;
        this.score = 0;
    }

    generatePipe(){
        if(this.pipeArray.length <1){
            this.pipeArray.push(new Pipe(this.ctx));
        }
        else if (this.pipeArray.length === 1){
            if(this.pipeArray[0].pipePosition.x < PIPE_WIDTH/2.5){
                this.pipeArray.push(new Pipe(this.ctx));
            }
        }   
    }

    drawScore(){
        this.ctx.font = "500 16px Noto Sans JP";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Score : ${this.score}`, 10, 30);
        this.ctx.fillText(`Highest Score : ${this.highestScore}`, 150, 30);

    }

    updateScore(){
        this.score ++;
        this.drawScore();
        if(this.score >= this.highestScore){
            this.highestScore = this.score;
            localStorage.setItem(STORAGE_KEY, this.highestScore);
        }

    }

    getHighScore(){
        if(localStorage.getItem(STORAGE_KEY) != null){
            this.highestScore = parseInt(localStorage.getItem(STORAGE_KEY));
        }
    }

    canvasClick(){
        this.bird.jumpBird();
    }

    canvasSpaceKey(event){
        switch (event.key) {
            case " ":
                this.bird.jumpBird();
                break;
        }

    }

}

function runGame(){
    var g = new Main('game','container');
    g.init();    
}
window.onload = runGame;