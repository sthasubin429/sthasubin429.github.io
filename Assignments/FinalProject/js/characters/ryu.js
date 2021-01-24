class Ryu {
   constructor(ctx) {
      this.ctx = ctx;

      this.width = RYU_WIDTH;
      this.height = RYU_HEIGHT;

      this.position = {
         x: 1000,
         y: 320,
      };

      this.rotation = true;
      this.animation = new Animation(
         this.ctx,
         ryuSprite,
         RYU_WIDTH,
         RYU_HEIGHT,
         this.rotation,
         RYU_SPRITE_POSITION.idle,
         this.position,
         RYU_IDLE_ANIMATION_TIME,
         true
      );
   }

   drawPlayer() {
      this.animation.animate();
   }
}
