import { TIME_POSITION } from '../utility/constant.js';

/**
 *
 * Shows the round time
 */
export default class Time {
	/**
	 *
	 * @param {Object} ctx Canvas context
	 */
	constructor(ctx) {
		this.ctx = ctx;

		this.currentTime = 0;

		//function binding
		this.drawTime = this.drawTime.bind(this);
	}

	/**
	 *
	 * @param {Integer} frameCount Current frame count
	 *
	 * Updates time every 100 frames i.e 1 second
	 */
	updateTime(frameCount) {
		if (frameCount % 100 === 0) {
			this.currentTime++;
		}

		this.drawTime();
	}

	/**
	 *
	 * Draws crrent Time on canvas
	 */
	drawTime() {
		this.ctx.font = '500 40px Noto Sans JP';
		this.ctx.fillStyle = '#fb5607';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(`${this.currentTime}`, TIME_POSITION.x, TIME_POSITION.y);
	}

	/**
	 *
	 * Returns truw if the time has reached 100 seconds
	 */
	checkTime() {
		if (this.currentTime >= 99) {
			return true;
		}
	}
}
