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
      this.animationComplete = false;
   }

   drawPlayer(frameCount) {
      this.animation.animate(frameCount);
      // resetState(this.currentState);
   }

   updatePlayer() {
      if (this.currentState.isMovingRight) {
         if (this.rotation) {
            this.moveRight();
         } else {
            this.moveLeft();
         }
      } else if (this.currentState.isMovingLeft) {
         if (this.rotation) {
            this.moveLeft();
         } else {
            this.moveRight();
         }
      } else if (this.currentState.isJumping) {
         this.jump();
      } else if (this.currentState.isCrouching) {
         this.crouch();
      } else if (this.currentState.isIdle) {
         this.makeIdle();
      }
   }

   makeIdle() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.idle;
      this.animation.loop = true;
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

   jump() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.jump;
      // this.position.y -= moveSpeed;
      this.animation.animationTime = RYU_IDLE_ANIMATION_TIME + 4;
      this.animation.loop = false;
   }
   crouch() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.crouch;
      // this.position.y -= moveSpeed;
      this.animation.loop = false;
   }
}
