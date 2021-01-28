class Player {
   constructor(ctx, rotation) {
      this.ctx = ctx;

      this.position = {
         x: 300,
         y: 100,
      };

      this.rotation = rotation;
      this.animation = new Animation(this.ctx, ryuSprite, this.rotation, RYU_SPRITE_POSITION.idle, this.position, RYU_IDLE_ANIMATION_TIME, true, false, this);
      this.currentState = {
         isIdle: true,

         lowPunch: false,
         mediumPunch: false,
         heavyPunch: false,

         lowKick: false,
         mediumKick: false,
         heavyKick: false,

         isMovingRight: false,
         isMovingLeft: false,
         isJumping: false,
         isCrouching: false,
      };
      this.animationComplete = false;
      this.keyListener = true;
   }
}
