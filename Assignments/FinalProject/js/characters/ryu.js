class Ryu {
   constructor(ctx, rotation) {
      this.ctx = ctx;

      this.position = {
         x: 1000,
         y: 320,
      };

      this.rotation = rotation;
      this.animation = new Animation(this.ctx, ryuSprite, this.rotation, RYU_SPRITE_POSITION.idle, this.position, RYU_IDLE_ANIMATION_TIME, true, false, this);
      this.currentState = {
         isIdle: true,

         lowPunch: false,

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
      if (this.currentState.isMovingRight && this.currentState.isMovingLeft) {
         this.counter = 0;
      } else if (this.currentState.lowPunch) {
         this.lowPunch();
      } else if (this.currentState.isJumping && this.currentState.isMovingRight) {
         this.frontFlip();
      } else if (this.currentState.isJumping && this.currentState.isMovingLeft) {
         this.backFlip();
      } else if (this.currentState.isCrouching && (this.currentState.isMovingLeft || this.currentState.isMovingRight)) {
         this.crouch();
      } else if (this.currentState.isJumping && this.currentState.isCrouching) {
         this.crouch();
      } else if (this.currentState.isMovingRight) {
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
   lowPunch() {
      console.log(this);
      this.animation.spritePosition = RYU_SPRITE_POSITION.lowPuch;
      this.animation.animationTime = RYU_IDLE_ANIMATION_TIME;
      this.animation.loop = false;
   }
   makeIdle() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.idle;
      this.animation.animationTime = RYU_IDLE_ANIMATION_TIME;
      this.animation.loop = true;
      this.animation.increaseHeight = false;
   }

   moveRight() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.moveRight;
      this.position.x -= MOVE_SPEED;
      this.animation.loop = false;
   }

   moveLeft() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.moveLeft;
      this.position.x += MOVE_SPEED;
      this.animation.loop = false;
   }
   jump() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.jump;
      this.animation.increaseHeight = true;
      this.animation.changeFactor = 30;
      this.animation.loop = false;
   }
   crouch() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.crouch;
      this.animation.animationTime = RYU_IDLE_ANIMATION_TIME;
      this.animation.loop = false;
   }
   frontFlip() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.frontFlip;
      this.position.x -= MOVE_SPEED;
      this.animation.changeFactor = 35;
      this.animation.loop = false;
      this.animation.increaseHeight = true;
      this.animation.animationTime = RYU_IDLE_ANIMATION_TIME - 3;
   }
   backFlip() {
      this.animation.spritePosition = RYU_SPRITE_POSITION.backFlip;
      this.position.x += MOVE_SPEED;
      this.animation.changeFactor = 35;
      this.animation.loop = false;
      this.animation.increaseHeight = true;
      this.animation.animationTime = RYU_IDLE_ANIMATION_TIME - 3;
   }
}
