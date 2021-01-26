class Game {
   constructor(containerId, canvasId) {
      this.container = document.getElementById(containerId);
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
      this.stage;
      this.frameCount = 0;
      this.isIdle = true;

      this.player1;
      //function binding
      this.gameLoop = this.gameLoop.bind(this);
      this.keyDownHandler = this.keyDownHandler.bind(this);
      this.keyUpHandler = this.keyUpHandler.bind(this);
   }

   init() {
      this.stage = new Stage(this.ctx);
      this.stage.init();
      this.player1 = new Ryu(this.ctx);
      this.gameLoop();
      document.addEventListener('keydown', this.keyDownHandler);
      document.addEventListener('keyup', this.keyUpHandler);
   }
   gameLoop() {
      this.frameCount++;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.stage.init();
      this.player1.updatePlayer();
      this.player1.drawPlayer(this.frameCount);

      requestAnimationFrame(this.gameLoop);
   }

   keyDownHandler(event) {
      this.player1.animationComplete = false;
      console.log(event.keyCode);
      switch (event.keyCode) {
         case ARROW_LEFT:
            // console.log('left pressed');
            this.player1.currentState.isMovingLeft = true;
            break;
         case ARROW_RIGHT:
            // console.log('RIGHT pressed');
            this.player1.currentState.isMovingRight = true;
            break;
         case ARROW_UP:
            // console.log('UP pressed');
            this.player1.currentState.isJumping = true;
            break;
         case ARROW_DOWN:
            // console.log('Down pressed');
            // this.player1.currentState = resetState(this.player1.currentState);
            // this.player1.currentState.isCrouching = true;
            break;
      }
   }

   keyUpHandler(event) {
      console.log(this.player1.currentState);
      console.log(this.player1.animationComplete);
      if (this.player1.animationComplete) {
         this.player1.currentState = resetState(this.player1.currentState);
         this.player1.currentState.isIdle = true;
         this.player1.animationComplete = false;
      }
   }
}
