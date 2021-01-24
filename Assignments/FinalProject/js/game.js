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
      this.buttonDown = this.buttonDown.bind(this);
   }

   init() {
      this.stage = new Stage(this.ctx);
      this.stage.init();
      this.player1 = new Ryu(this.ctx);
      this.gameLoop();
      document.addEventListener('keydown', this.buttonDown);
   }
   gameLoop() {
      this.frameCount++;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.stage.init();
      this.player1.updatePlayer();
      this.player1.drawPlayer(this.frameCount);

      requestAnimationFrame(this.gameLoop);
   }

   buttonDown(event) {
      switch (event.key) {
         case ARROW_LEFT:
            console.log('left pressed');
            this.player1.currentState = resetState(this.player1.currentState);
            this.player1.currentState.isMovingLeft = true;
            break;
         case ARROW_RIGHT:
            console.log('RIGHT pressed');
            this.player1.currentState = resetState(this.player1.currentState);
            this.player1.currentState.isMovingRight = true;
            break;
         case ARROW_UP:
            console.log('UP pressed');
            break;
         case ARROW_DOWN:
            console.log('Down pressed');
            break;
      }
   }
}
