class Pipe{
    /**
     * 
     * @param {Context} ctx Canvas Context
     */
    constructor(ctx){
        this.ctx = ctx;
        this.top;
        this.bot;
        this.pipePosition = {
            x: CANVAS_WIDTH,
            y: (getRndInteger(0,150)*PIPE_MUL)+PIPE_MIN_Y
        }
    }

    //Function that draws the pipe
    drawPipe(){
        this.ctx.drawImage(topPipeImg,this.pipePosition.x,this.pipePosition.y,PIPE_WIDTH,PIPE_HEIGHT);
        this.ctx.drawImage(botPipeImg,this.pipePosition.x,this.pipePosition.y+PIPE_HEIGHT+PIPE_GAP, PIPE_WIDTH,PIPE_HEIGHT);
    }

    //Function to update pipe position
    updatePipe(){
        this.pipePosition.x -= PIPE_SPEED;
    }

    //Function that checks if the pipe is out of screen
    checkPipePosition(){
        return ((this.pipePosition.x+PIPE_WIDTH) < 0) ? true : false; 
    }

    /**
     * 
     * @param {Object} bird Bird Object to detect Colision
     */
    detectCollision(bird){
        let rect1 = {x: bird.birdPosition.x, y: bird.birdPosition.y, width: BIRD_WIDTH, height: BIRD_HEIGHT}
        let rect2 = {x: this.pipePosition.x+20, y: this.pipePosition.y+10, width: PIPE_WIDTH, height: PIPE_HEIGHT}
        let rect3 = {x: this.pipePosition.x+36, y: (this.pipePosition.y+PIPE_HEIGHT+PIPE_GAP)+5, width: PIPE_WIDTH, height: PIPE_HEIGHT}

        if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
            return true
        }
        if (rect1.x < rect3.x + rect3.width &&
            rect1.x + rect3.width > rect3.x &&
            rect1.y < rect3.y + rect3.height &&
            rect1.y + rect1.height > rect3.y) {
                return true
            }
        else{
            return false
        }
    }
    
    //Checks if the bird passed the pipe
    // checkPipePassed(){
    //     return this.pipePosition.x+PIPE_WIDTH<BIRD_POS_X; 
    // }
}