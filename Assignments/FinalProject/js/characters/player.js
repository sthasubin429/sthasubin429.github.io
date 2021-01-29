class Player {
   constructor(props) {
      this.ctx = props.ctx;

      this.position = props.position;
      this.rotation = props.rotation;

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

      this.animation = new Animation(this.ctx, props.sprite, this.rotation, props.animationArray, this.position, props.animationTime, true, false);

      this.increaseHeight = false;
      this.changeFactor = 30;

      //function binding
      this.updateState = this.updateState.bind(this);
      this.changeHeight = this.changeHeight.bind(this);
      this.updateHeight = this.updateHeight.bind(this);
   }
   drawPlayer(frameCount) {
      this.changeHeight(frameCount);
      if (frameCount % this.animation.animationTime === 0) {
         this.animation.counter++;
         if (this.animation.counter >= this.animation.spritePosition.length - 1) {
            this.animation.counter = 0;
            this.increaseHeight = false;
            if (!this.animation.loop) {
               this.currentState = resetState(this.currentState);
               this.currentState.isIdle = true;
               this.animationComplete = true;
            }
         }
      }
      this.animation.position = this.position;
      this.animation.animate();
   }
   changeHeight() {
      if (this.increaseHeight) {
         this.position.y -= MOVE_SPEED + this.changeFactor;

         if (this.animation.counter >= this.animation.spritePosition.length - 2 && this.animation.spritePosition.length > 2) {
            this.position.y = this.updateHeight();
         }
      } else {
         this.position.y = this.updateHeight();
      }
   }
   updateHeight() {
      return CANVAS_HEIGHT - STAGE_HEIGHT - this.animation.spritePosition[this.animation.counter].height * SCALE_SPRITE;
   }

   updateState(spritePosition, animationTime, loop) {
      this.animation.spritePosition = spritePosition;
      this.animation.animationTime = animationTime;
      this.animation.loop = loop;
   }

   makeIdle(spritePosition, animationTime, loop) {
      this.updateState(spritePosition, animationTime, loop);
      this.increaseHeight = false;
   }

   moveRight(spritePosition, animationTime, loop, moveSpeed) {
      this.updateState(spritePosition, animationTime, loop);
      this.position.x -= moveSpeed;
   }

   moveLeft(spritePosition, animationTime, loop, moveSpeed) {
      this.updateState(spritePosition, animationTime, loop);
      this.position.x += moveSpeed;
   }
   jump(spritePosition, animationTime, loop, changeFactor) {
      this.updateState(spritePosition, animationTime, loop);
      this.increaseHeight = true;
      this.changeFactor = changeFactor;
   }

   frontFlip(spritePosition, animationTime, loop, changeFactor, moveSpeed) {
      this.updateState(spritePosition, animationTime, loop);
      this.increaseHeight = true;
      this.changeFactor = changeFactor;
      this.position.x += moveSpeed;
   }
   backFlip(spritePosition, animationTime, loop, changeFactor, moveSpeed) {
      this.updateState(spritePosition, animationTime, loop);
      this.increaseHeight = true;
      this.changeFactor = changeFactor;
      this.position.x -= moveSpeed;
   }
}
