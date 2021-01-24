class Game {
   constructor(containerId, canvasId) {
      this.container = document.getElementById(containerId);
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
      this.stage;

      this.player1;
      //function binding
      this.gameLoop = this.gameLoop.bind(this);
   }

   init() {
      this.stage = new Stage(this.ctx);
      this.stage.init();
      this.player1 = new Ryu(this.ctx);
      this.gameLoop();
   }
   gameLoop() {
      frameCount++;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.stage.init();
      this.player1.drawPlayer();

      requestAnimationFrame(this.gameLoop);
   }
}
