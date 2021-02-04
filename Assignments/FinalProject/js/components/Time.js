import { TIME_POSITION } from '../utility/constant.js';

export default class Time {
	constructor(ctx) {
		this.ctx = ctx;

		this.currentTime = 0;

		//function binding
		this.drawTime = this.drawTime.bind(this);
	}

	updateTime(frameCount) {
		if (frameCount % 100 === 0) {
			this.currentTime++;
		}

		this.drawTime();
	}

	drawTime() {
		this.ctx.font = '500 40px Noto Sans JP';
		this.ctx.fillStyle = '#fb5607';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(`${this.currentTime}`, TIME_POSITION.x, TIME_POSITION.y);
	}

	checkTime() {
		if (this.currentTime >= 99) {
			return true;
		}
	}
}
