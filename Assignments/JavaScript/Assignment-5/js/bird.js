//Bird Class
class Bird{
    /**
     * 
     * @param {Context} ctx Canvas Context
     * @param {Integer} y Position of Bird along Y axis
     */
    constructor(ctx, y){
        this.ctx = ctx;
        this.birdPosition={
            x:BIRD_POS_X,
            y:y
        }
        this.frame = 1;
        this.count = 1;
        this.rotation = 0;
        this.isJumping = false;
        this.positionBeforeJump = this.birdPosition.y;

        //funciton binding
        this.drawBird = this.drawBird.bind(this);
        this.updateBird = this.updateBird.bind(this);
        this.jumpBird = this.jumpBird.bind(this);
        this.wallCollision = this.wallCollision.bind(this);
        this.frameCount = this.frameCount.bind(this);

        this.d = new Date();
    }

    //Function That draws Bird on Canvas
    drawBird(){
        // this.ctx.drawImage(birdImages[this.count%birdImages.length],this.birdPosition.x,this.birdPosition.y,BIRD_WIDTH,BIRD_HEIGHT);

        //for rotation
        this.ctx.save();
        this.ctx.translate(this.birdPosition.x,this.birdPosition.y);
        this.ctx.rotate(this.rotation*Math.PI/180);
        this.ctx.drawImage(birdImages[this.count%birdImages.length],-BIRD_WIDTH/2,-BIRD_HEIGHT/2);
        this.ctx.restore();

    }

    //Function that updates Bird's position
    updateBird(){
        this.count++;
        if(this.isJumping){
            if(Math.abs(this.birdPosition.y-this.positionBeforeJump) > BIRD_JUMP_DISTANCE){
                this.isJumping = false;
            }
            this.birdPosition.y  = this.birdPosition.y  - BIRD_JUMP;
            
        }
        else{
            this.rotation = 30;
            this.birdPosition.y = this.birdPosition.y+(GRAVITY*this.frame)/2
        }
    }

    //Function to make the bird jump
    jumpBird(){
        this.positionBeforeJump = this.birdPosition.y;
        this.rotation = -30;
        this.frame = 1;
        this.isJumping = true;
        this.birdPosition.y  = this.birdPosition.y  - BIRD_JUMP;
    }

    //Function to see if the bird collides with top or bottom part of screen
    wallCollision(){
        if(this.birdPosition.y < 5  || this.birdPosition.y > (CANVAS_HEIGHT-BIRD_HEIGHT)){
            return true;
        }
        else{return false;}
    }

    //Increases framecount ot simulate time passing
    frameCount(){
        
        this.frame ++;
        setTimeout(this.frameCount, 500)

        // this.frame += (1/30);
        // setTimeout(this.frameCount, 1000/60)

    }
    

}