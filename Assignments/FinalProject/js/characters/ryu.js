class Ryu {
   constructor(ctx) {
      this.ctx = ctx;

      this.position = {
         x: 1000,
         y: 320,
      };

      this.rotation = true;
      this.animation = new Animation(this.ctx, ryuSprite, this.rotation, RYU_SPRITE_POSITION.idle, this.position, RYU_IDLE_ANIMATION_TIME, true, this);
      this.currentState = {
         isIdle: true,
         isMovingRight: false,
         isMovingLeft: false,
         isJumping: false,
         isCrouching: false,
      };
   }

   drawPlayer(frameCount) {
      this.animation.animate(frameCount);
      // resetState(this.currentState);
   }
   updatePlayer() {
      if (this.currentState.isIdle) {
         this.makeIdle();
      } else if (this.currentState.isMovingRight) {
         this.moveRight();
      } else if (this.currentState.isMovingLeft) {
         this.moveLeft();
      }
   }
   makeIdle() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.idle;
      this.animation.loop = true;
      this.animation.counter = 0;
   }
   moveRight() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.moveRight;
      this.position.x -= moveSpeed;
      this.animation.loop = false;
   }
   moveLeft() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.moveLeft;
      this.position.x += moveSpeed;
      this.animation.loop = false;
   }
}
