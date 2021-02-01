import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../utility/constant.js';
import { stage1 } from '../img/images.js';

export default class Stage {
	constructor(ctx) {
		this.ctx = ctx;
	}

	init() {
		// this.ctx.scale(-1, 1);

		this.ctx.drawImage(stage1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}
