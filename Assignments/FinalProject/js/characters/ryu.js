class Ryu {
   constructor(ctx) {
      this.ctx = ctx;
   }
   drawRyu() {
      this.ctx.save();
      this.ctx.translate(CANVAS_WIDTH, 0);
      this.ctx.scale(-1, 1);

      this.ctx.drawImage(ryuSprite, 1496, 98, 128, 230, 1000, 320, 100, 250);
      this.ctx.restore();
   }
}
