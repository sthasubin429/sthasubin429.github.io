class Bird{
    constructor(ctx, y){
        this.ctx = ctx;
        this.birdPosition={
            x:BIRD_POS_X,
            y:y
        }
        this.frame = 1;

        //funciton binding
        this.drawBird = this.drawBird.bind(this);
        this.updateBird = this.updateBird.bind(this);
        this.jumpBird = this.jumpBird.bind(this);

        this.frameCount = this.frameCount.bind(this);
    }
    drawBird(){
        this.ctx.drawImage(birdNormal,this.birdPosition.x,this.birdPosition.y,BIRD_WIDTH,BIRD_HEIGHT);
    }
    updateBird(){
        this.birdPosition.y = this.birdPosition.y+(GRAVITY*this.frame)/2
        // console.log(this.birdPosition.y)
    }
    jumpBird(){
        this.frame = 1;
        this.birdPosition.y  = this.birdPosition.y  - BIRD_JUMP;
    }
    frameCount(){
        this.frame += 0.78;
        setTimeout(this.frameCount, 500)

    }

}