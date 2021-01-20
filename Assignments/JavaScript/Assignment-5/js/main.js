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

        //function binding
        this.init = this.init.bind(this);
        this.update = this.update.bind(this);
        this.generatePipe = this.generatePipe.bind(this);

        this.canvasClick = this.canvasClick.bind(this);
        this.canvasSpaceKey = this.canvasSpaceKey.bind(this);
    }
    init(){
        this.world = new World(this.ctx);
        this.world.init();
        this.bird = new Bird(this.ctx, CANVAS_HEIGHT/2);
        this.bird.drawBird();
        this.bird.frameCount();

        this.generatePipe();

        this.update();

        this.container.addEventListener('click', this.canvasClick);
        document.addEventListener('keydown', this.canvasSpaceKey); 

    }
    update(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.world.init();
        this.bird.updateBird();
        this.bird.drawBird();
        this.generatePipe();
        
        for(let i =0;i<this.pipeArray.length;i++){
            this.pipeArray[i].updatePipe();
            this.pipeArray[i].drawPipe();
            if(this.pipeArray[i].checkPipePosition()){
                this.pipeArray.splice(i,1);
            }
            
        }

        requestAnimationFrame(this.update);
    }
    loadGame(){
        
    }
    generatePipe(){
        if(this.pipeArray.length <1){
            this.pipeArray.push(new Pipe(this.ctx));
        }
        else if (this.pipeArray.length === 1){
            if(this.pipeArray[0].pipePosition.x < PIPE_WIDTH/2.5){
                this.pipeArray.push(new Pipe(this.ctx));
            }
            // console.log(this.pipeArray[0].pipePosition.x);
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