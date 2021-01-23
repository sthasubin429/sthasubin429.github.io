class Game {
   constructor(containerId, canvasId) {
      this.container = document.getElementById(containerId);
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
      this.stage;

      this.ryu;
      //function binding
      this.gameLoop = this.gameLoop.bind(this);
   }

   init() {
      this.stage = new Stage(this.ctx);
      this.stage.init();
      this.gameLoop();
   }
   gameLoop() {
      frameCount++;
      this.stage.init();
      this.ryu = new Ryu(this.ctx);
      this.ryu.drawRyu();
      requestAnimationFrame(this.gameLoop);
   }
}
