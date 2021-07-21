    /**
     * 
     * @param {Int} x Initial x position
     * @param {Int} y Initial y position
     * @param {Int} radius Ball Radius
     */
    function ball(x ,y, radius){
        this.radius = radius;
        this.position = {
            x : x,
            y : y
        }
        this.directionX = 1;
        this.directionY = 0.4;
        this.smashed = false;    

    }
    var img = new Image();
    img.src="images/ant.svg";

    /**
     * Function that draws circle in canvas
     */
    ball.prototype.draw = function() {

        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, true);
        ctx.drawImage(img, this.position.x-this.radius, this.position.y-this.radius, this.radius*2, this.radius*2);
        ctx.stroke();

    }

    /**
     * Function to update postion of circle in canvas
     */
    ball.prototype.update = function() {
        // if ((this.position.x + this.radius) > width || (this.position.x - this.radius)<this.radius){
        this.position.x += (speedX * this.directionX);
        this.position.y += (speedY * this.directionY);

    }

    ball.prototype.checkWallColison = function(){
        if((Math.abs(this.position.x-width) < this.radius*1.2) ||  (this.position.x < this.radius*1.2) ){
            this.directionX *= -1; 
            this.position.x += (speedX * this.directionX);
            this.position.y += (speedY * this.directionY);
        }
        // else if ((this.position.y + this.radius) > height || (this.position.y - this.radius)<this.radius){
        else if((Math.abs(this.position.y-height) < this.radius*1.2) ||(this.position.y < this.radius*1.2)){
            this.directionY *= -1;
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
                this.position.x += (speedX/3 * this.directionX);
                this.position.y += (speedY/3 * this.directionY);
                balls[j].position.x += (speedX/3 *  balls[j].directionX);
                balls[j].position.y += (speedY/3 *  balls[j].directionY);
                // balls[j].update();
                // this.update();

            }

        }
        
    }
}
