class Pipe{
    constructor(ctx){
        this.ctx = ctx;
        this.top;
        this.bot;
        this.pipePosition = {
            x: CANVAS_WIDTH,
            y: (getRndInteger(0,150)*PIPE_MUL)+PIPE_MIN_Y
        }
    }

    drawPipe(){
        this.ctx.drawImage(topPipeImg,this.pipePosition.x,this.pipePosition.y,PIPE_WIDTH,PIPE_HEIGHT);
        this.ctx.drawImage(botPipeImg,this.pipePosition.x,this.pipePosition.y+PIPE_HEIGHT+PIPE_GAP, PIPE_WIDTH,PIPE_HEIGHT);
    }
    updatePipe(){
        this.pipePosition.x -= PIPE_SPEED;
    }
    checkPipePosition(){
        return ((this.pipePosition.x+PIPE_WIDTH) < 0) ? true : false; 
    }
}