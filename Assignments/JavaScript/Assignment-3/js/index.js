/**
 * 
 * @param {string} canvas Canvas class
 * @param {Int} width Canvas Width
 * @param {Int} height Canvas Heignt
 * @param {Int} radius Ball Radius
 * @param {Int} ballNumber Number of Balls
 */
function boxColision(canvas, width, height, radius, ballNumber){
    this.canvas = document.getElementById(canvas);
    this.width = width;
    this.height = height;
    this.radius = radius;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext("2d");
    this.speedX = 3;
    this.speedY = 2;
    this.ballNumber = ballNumber;
    this.balls = [];
    this.score = 0;
    this.gameAnimation;
    
    this.canvas.addEventListener('click', function(e){
        var container = document.getElementsByClassName('container')[0];
        const containerStyle = getComputedStyle(container);
        var relativeX = e.clientX - parseInt(containerStyle.marginLeft);
        var relativeY = e.clientY - parseInt(containerStyle.marginTop);
        checkSmash(relativeX,relativeY);
    });

    for(var i = 0; i<ballNumber;i++){
        balls[i] = new ball(randomIntFromInterval(this.radius, this.width-this.radius), randomIntFromInterval(this.radius, this.width-this.radius), this.radius);7
        balls[i].detectColison(balls);

    }

    updateScore();

    game();

    /**
     * Initial Game function
     */
    function game(){
        ctx.clearRect(0, 0, width, height);
        for(var j = 0; j<balls.length;j++){
            if(!balls[j].smashed){
                balls[j].detectColison(this.balls);
                balls[j].checkWallColison();
                balls[j].update();
                balls[j].draw();
            }
        }
        this.gameAnimation = requestAnimationFrame(game);
    }

    /**
     * 
     * @param {Int} min Minimum Integer Value
     * @param {Int} max Maxmium Integer Value
     */
    function randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * 
     * @param {Int} x Relative X position of mouse
     * @param {Int} y Relative Y position of mouse
     */
    function checkSmash (x,y){
        for(var j = 0; j<balls.length;j++){
                var circle1 = {
                    x: balls[j].position.x,
                    y: balls[j].position.y
                }
                var circle2 = {
                    x: x,
                    y: y
                }
    
                var dx = circle1.x - circle2.x;
                var dy = circle1.y - circle2.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.radius*1.2) {
                    balls[j].smashed = true;
                    balls.splice(j, 1);
                    score ++;
                    updateScore();
                    checkGame();
                }  
            
         }
    }
    /**
     * Updates Score
     */
    function updateScore(){
        var scoreElement = document.getElementById('score');
        scoreElement.innerHTML = `Score ${this.score}`;
    }
    /**
     * Stops the Game and Displays You Won in Canvas
     */
    function checkGame(){
        if(balls.length === 0){
            cancelAnimationFrame(gameAnimation);
            this.gameAnimation = undefined;
            ctx.clearRect(0, 0, width, height);
            ctx.font = "60px Comic Sans MS";
            ctx.fillText("You Won !!", this.canvas.width/3, this.canvas.height/2);

        }
    }
}
boxColision('boxColision', 800, 800, 20, 25);
