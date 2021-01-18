    /**
     * 
     * @param {Int} x Initial x position
     * @param {Int} y Initial y position
     * @param {Int} radius Ball Radius
     */
    function ball(x ,y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.position = {
            x : this.x,
            y : this.y
        }
        this.directionX = 1;
        this.directionY = 0.6;
        this.smashed = false;    
    }
    /**
     * Function that draws circle in canvas
     */
    ball.prototype.draw = function() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        //arc(x pox, ypox ,radius, start angle, end angle)
        // console.log(this.position)
    };

    /**
     * Function to update postion of circle in canvas
     */
    ball.prototype.update = function() {
        // console.log(this.position);
        if((Math.abs(this.position.x-width) < this.radius*1.2) ||  (this.position.x < this.radius*1.2) ){
            this.directionX *= -1; 
            // console.log(this.direction);
            this.position.x += (speedX * this.directionX);
            this.position.y += (speedY * this.directionY);
        }
        if((Math.abs(this.position.y-height) < this.radius*1.2) ||(this.position.y < this.radius*1.2)){
            this.directionY *= -1;
            // console.log(this.direction);
            this.position.x += (speedX * this.directionX);
            this.position.y += (speedY * this.directionY);
        }

        else{
            this.position.x += (speedX * this.directionX);
            this.position.y += (speedY * this.directionY);
        }
    }

/**
 * 
 * @param {Array} balls Array of all the balls
 */
ball.prototype.detectColison = function(balls){
    for(var j = 0; j<balls.length;j++){
        if(!(balls[j] === this)){
            var circle1 = {
                radius: this.radius,
                x: this.position.x,
                y: this.position.y
            }
            var circle2 = {
                radius: balls[j].radius,
                x: balls[j].position.x,
                y: balls[j].position.y
            }

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                this.directionX *= -1;
                this.directionY *= -1;
                balls[j].directionX *= -1;
                balls[j].directionY *= -1;
                balls[j].update();
                this.position.x += (speedX * this.directionX);
                this.position.y += (speedY * this.directionY);
            }  
        }
        
    }
}
