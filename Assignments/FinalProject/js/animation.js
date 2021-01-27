class Animation {
   /**
    *
    * @param {object} ctx Canvas context
    * @param {Object} sprite Image Object of the sprite used
    * @param {Integer} width Width of image on canvas
    * @param {Integer} height Height of image on canvas
    * @param {Boolen} rotation Bollen value weather to mirror the image or not
    * @param {Array} spritePosition Array of objects with width,height, x and y position of clipped image on sprite
    * @param {Object} position Position on canvas to draw the image
    * @param {Integer} time time taken to complete the animation
    * @param {Boolen} loop defines if the animation loops or stops after once
    */
   constructor(ctx, sprite, rotation, spritePosition, position, time, loop, increaseHeight, player) {
      this.ctx = ctx; //canvas context
      this.sprite = sprite; //sprite used for animation
      // this.width = width; //final width of image
      // this.height = height; //final height of image
      this.rotation = rotation; // weather to mirror the image or not
      this.spritePosition = spritePosition; //position of image on sprite
      this.position = position; //position to draw the image
      this.animationTime = time; //time taken to complete the animation
      this.loop = loop; //weather the animation loops or stops after once
      this.counter = 0;
      this.increaseHeight = increaseHeight;
      this.player = player;

      //function binding
      this.changeHeight = this.changeHeight.bind(this);
   }

   animate(frameCount) {
      this.changeHeight(frameCount);
      this.ctx.save();
      if (this.rotation) {
         this.ctx.translate(CANVAS_WIDTH, 0);
         this.ctx.scale(-1, 1);
      }
      this.ctx.drawImage(
         this.sprite,
         this.spritePosition[this.counter].x,
         this.spritePosition[this.counter].y,
         this.spritePosition[this.counter].width,
         this.spritePosition[this.counter].height,
         this.position.x,
         this.position.y,
         this.spritePosition[this.counter].width,
         this.spritePosition[this.counter].height
      );

      this.ctx.restore();
      if (frameCount % this.animationTime === 0) {
         this.counter++;
         if (this.counter === this.spritePosition.length - 1) {
            this.counter = 0;
            this.increaseHeight = false;
            if (!this.loop) {
               this.player.currentState = resetState(this.player.currentState);
               this.player.currentState.isIdle = true;
               this.player.animationComplete = true;
            }
         }
      }
   }

   changeHeight(frameCount) {
      if (this.increaseHeight) {
         if (frameCount % RYU_IDLE_ANIMATION_TIME === 0) {
            this.position.y -= MOVE_SPEED * jumpHeightChange(this.counter) + 30;
         }
         if (this.counter >= this.spritePosition.length - 2) {
            this.position.y = CANVAS_HEIGHT - STAGE_HEIGHT - this.spritePosition[this.counter].height;
         }
      } else {
         this.position.y = CANVAS_HEIGHT - STAGE_HEIGHT - this.spritePosition[this.counter].height;
      }
   }
}
