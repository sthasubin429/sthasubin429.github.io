//Main Class that runs the game
class Main{
    /**
     * 
     * @param {String} canvasID ID of Canvas
     * @param {String} containerID ID of Container
     */
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

    //init function of the class, Renders Main screen 
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

    //Main Game loop
    update(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.world.init();
        

        // this.bird.frameCount();
        this.bird.updateBird();
        this.bird.drawBird();
        

        if(this.bird.wallCollision()){
            cancelAnimationFrame(this. animationID);
            this.gameOver();
            return;
        }

        this.generatePipe();
        let temp = [...this.pipeArray];
        for(let i =0;i<temp.length;i++){
            temp[i].updatePipe();
            temp[i].drawPipe();

            if(temp[i].detectCollision(this.bird)){
                cancelAnimationFrame(this.animationID);
                this.gameOver();
                return;
            }

            if(temp[i].checkPipePosition()){
                this.pipeArray.splice(i,1);
                this.updateScore();
            }
        }
        this.drawScore();

        this.animationID = requestAnimationFrame(this.update);
    }

    //Resets the game and calls update function
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

    //Renders GameOver Screen
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
        this.ctx.fillText(`Your Score  :  ${currentScore}`, 40, 400);
        this.ctx.fillText(`Highest Score  :  ${this.highestScore}`, 40, 440);

        this.container.addEventListener('click', this.playGame);
    }

    //resets all necessary game values
    restGame(){
        this.pipeArray = [];
        this.animationID = 0;
        this.score = 0;
    }

    //Function to generate pipes
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

    //Function that draws score and highest score on top of the screen
    drawScore(){
        this.ctx.font = "500 16px Noto Sans JP";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Score : ${this.score}`, 10, 30);
        this.ctx.fillText(`Highest Score : ${this.highestScore}`, 150, 30);

    }

    //Updates current score and also checks for highest score
    //Stores the highest schore in local storage
    updateScore(){
        this.score ++;
        this.drawScore();
        if(this.score >= this.highestScore){
            this.highestScore = this.score;
            localStorage.setItem(STORAGE_KEY, this.highestScore);
        }

    }

    //Gets High score from local storage
    getHighScore(){
        if(localStorage.getItem(STORAGE_KEY) != null){
            this.highestScore = parseInt(localStorage.getItem(STORAGE_KEY));
        }
    }

    //On Click listener Function
    canvasClick(){
        this.bird.jumpBird();
    }

    //Space PressDown Listener Fuction
    canvasSpaceKey(event){
        switch (event.key) {
            case " ":
                this.bird.jumpBird();
                break;
        }

    }

}

//Functio to Load Game
function runGame(){
    var g = new Main('game','container');
    g.init();    
}
window.onload = runGame;