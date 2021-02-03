import { PLAYER_MANABAR, CANVAS_WIDTH, MANABAR_PADDING } from '../utility/constant.js';

export default class Mana {
	constructor(ctx, player) {
		this.ctx = ctx;
		this.player = player;
		this.position = PLAYER_MANABAR;

		this.currentMana = 0;
		//function binding
		this.drawCurrentMana = this.drawCurrentMana.bind(this);
		this.getWidth = this.getWidth.bind(this);
		this.decreaseMana = this.decreaseMana.bind(this);
	}

	drawManabar(frameCount) {
		if (frameCount % 50 === 0) {
			this.currentMana++;
		}

		if (this.currentMana >= 100) {
			this.currentMana = 100;
		}

		this.drawCurrentMana();
	}

	drawCurrentMana() {
		this.ctx.save();

		if (this.player.rotation) {
			this.ctx.translate(CANVAS_WIDTH, 0);
			this.ctx.scale(-1, 1);
		}

		this.ctx.beginPath();
		this.ctx.rect(PLAYER_MANABAR.x, PLAYER_MANABAR.y, PLAYER_MANABAR.width, PLAYER_MANABAR.height);
		this.ctx.fillStyle = 'white';
		this.ctx.fill();

		this.ctx.lineWidth = MANABAR_PADDING;
		this.ctx.strokeStyle = 'white';
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.rect(
			PLAYER_MANABAR.x + MANABAR_PADDING * 0.3,
			PLAYER_MANABAR.y + MANABAR_PADDING * 0.3,
			this.getWidth(),
			PLAYER_MANABAR.height - MANABAR_PADDING * 0.5
		);
		this.ctx.fillStyle = '#00b4d8';
		this.ctx.fill();

		this.ctx.restore();
	}

	getWidth() {
		let manaPercentage = this.currentMana / 100;
		if (manaPercentage < 0) {
			return 0;
		}

		return PLAYER_MANABAR.width * manaPercentage;
	}
	decreaseMana(mana) {
		this.currentMana -= mana;
	}
}
