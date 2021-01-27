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
      this.player1 = new Ryu(this.ctx, false);
      this.player2 = new Ryu(this.ctx, true);
      this.gameLoop();
      document.addEventListener('keydown', this.keyDownHandler);
      document.addEventListener('keyup', this.keyUpHandler);
   }
   gameLoop() {
      this.frameCount++;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.stage.init();
      this.player1.updatePlayer(this.frameCount);
      this.player1.drawPlayer(this.frameCount);
      this.player2.updatePlayer(this.frameCount);
      this.player2.drawPlayer(this.frameCount);

      requestAnimationFrame(this.gameLoop);
   }

   keyDownHandler(event) {
      if (this.player1.keyListener) {
         this.player1.animationComplete = false;
         switch (event.keyCode) {
            case PLAYER1_LOW_PUNCH:
               this.player1.currentState.lowPunch = true;
               break;
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
               this.player1.currentState.isCrouching = true;
               break;
         }
      }
   }

   keyUpHandler(event) {
      if (this.player1.animationComplete) {
         this.player1.currentState = resetState(this.player1.currentState);
         this.player1.currentState.isIdle = true;
         this.player1.keyListener = true;
         this.player1.animationComplete = false;
      }
   }
}
