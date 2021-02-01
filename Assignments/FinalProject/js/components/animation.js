import { CANVAS_WIDTH, SCALE_SPRITE } from '../utility/constant.js';

export default class Animation {
	constructor(ctx, sprite, rotation, spritePosition, position, time, loop) {
		this.ctx = ctx; //canvas context

		this.sprite = sprite; //sprite used for animation

		this.rotation = rotation; // weather to mirror the image or not

		this.spritePosition = spritePosition; //position of image on sprite

		this.animationPosition = position; //position to draw the image

		this.animationTime = time; //time taken to complete the animation

		this.loop = loop; //weather the animation loops or stops after once

		this.counter = 0;
	}

	animate() {
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
			this.animationPosition.x,
			this.animationPosition.y,
			this.spritePosition[this.counter].width * SCALE_SPRITE,
			this.spritePosition[this.counter].height * SCALE_SPRITE
		);

		this.ctx.restore();
	}
}
