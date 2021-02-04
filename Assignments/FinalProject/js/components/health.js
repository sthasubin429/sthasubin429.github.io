import { PLAYER_HEALTHBAR, CANVAS_WIDTH, HEALTHBAR_PADDING } from '../utility/constant.js';

export default class Health {
	constructor(ctx, player) {
		this.ctx = ctx;
		this.player = player;
		this.position = PLAYER_HEALTHBAR;

		this.currentHealth = 100;

		//function binding
		this.drawCurrentHealth = this.drawCurrentHealth.bind(this);
	}

	drawHealthBar(health) {
		this.health = health;
		this.drawCurrentHealth();
	}

	drawCurrentHealth() {
		this.ctx.save();

		if (this.player.rotation) {
			this.ctx.translate(CANVAS_WIDTH, 0);
			this.ctx.scale(-1, 1);
		}

		this.ctx.beginPath();
		this.ctx.rect(PLAYER_HEALTHBAR.x, PLAYER_HEALTHBAR.y, PLAYER_HEALTHBAR.width, PLAYER_HEALTHBAR.height);
		this.ctx.fillStyle = 'red';
		this.ctx.fill();

		this.ctx.lineWidth = HEALTHBAR_PADDING;
		this.ctx.strokeStyle = 'white';
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.rect(
			PLAYER_HEALTHBAR.x + HEALTHBAR_PADDING * 0.3,
			PLAYER_HEALTHBAR.y + HEALTHBAR_PADDING * 0.3,
			this.getWidth(),
			PLAYER_HEALTHBAR.height - HEALTHBAR_PADDING * 0.5
		);
		this.ctx.fillStyle = 'yellow';
		this.ctx.fill();

		this.ctx.restore();
	}

	getWidth() {
		let healthPercentage = this.health / 100;
		if (healthPercentage < 0) {
			return 0;
		}

		return PLAYER_HEALTHBAR.width * healthPercentage;
	}
}
