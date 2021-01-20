class Bird{
    constructor(ctx, y){
        this.ctx = ctx;
        this.birdPosition={
            x:BIRD_POS_X,
            y:y
        }
        this.frame = 1;
        this.count = 1;

        //funciton binding
        this.drawBird = this.drawBird.bind(this);
        this.updateBird = this.updateBird.bind(this);
        this.jumpBird = this.jumpBird.bind(this);
        this.wallCollision = this.wallCollision.bind(this);
        this.frameCount = this.frameCount.bind(this);
    }

    drawBird(){
        this.ctx.drawImage(birdImages[this.count%birdImages.length],this.birdPosition.x,this.birdPosition.y,BIRD_WIDTH,BIRD_HEIGHT);
    }

    updateBird(){
        this.count++;
        this.birdPosition.y = this.birdPosition.y+(GRAVITY*this.frame)/2
    }

    jumpBird(){
        this.frame = 1;
        this.birdPosition.y  = this.birdPosition.y  - BIRD_JUMP;
    }

    wallCollision(){
        if(this.birdPosition.y < 5  || this.birdPosition.y > (CANVAS_HEIGHT-BIRD_HEIGHT)){
            return true;
        }
        else{return false;}
    }

    frameCount(){
        this.frame += 0.8;
        setTimeout(this.frameCount, 500)

    }
    

}