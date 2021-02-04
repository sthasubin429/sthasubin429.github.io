import { stage1 } from '../img/images.js';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../utility/constant.js';

/**
 *
 * Stage object
 */
export default class Stage {
	/**
	 *
	 * @param {Object} ctx Canvas Context
	 */
	constructor(ctx) {
		this.ctx = ctx;
	}

	/**
	 *
	 * Draws Stage
	 */
	init() {
		this.ctx.drawImage(stage1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}
