import { PLAYER_MANABAR, CANVAS_WIDTH, MANABAR_PADDING, DEFAULT_MANA } from '../utility/constant.js';

/**
 *
 * For Mana of players
 */
export default class Mana {
	/**
	 *
	 * @param {Object} ctx Canvas Context
	 * @param {Object} player Correnponding player object for mana bar
	 */
	constructor(ctx, player) {
		this.ctx = ctx;
		this.player = player;

		this.position = PLAYER_MANABAR;
		this.currentMana = DEFAULT_MANA;

		//function binding
		this.getWidth = this.getWidth.bind(this);
		this.decreaseMana = this.decreaseMana.bind(this);
		this.drawCurrentMana = this.drawCurrentMana.bind(this);
	}

	/**
	 *
	 * @param {Integer} frameCount Current frame count
	 *
	 * Increases mana by 2 every 2 seconds and stops if greater than 100
	 */
	drawManabar(frameCount) {
		if (frameCount % 50 === 0) {
			this.currentMana++;
		}

		if (this.currentMana >= 100) {
			this.currentMana = 100;
		}

		this.drawCurrentMana();
	}

	/**
	 *
	 * Draws the Mana Bar on Canvas
	 */
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

	/**
	 *
	 * Calculates the width of current Mana bar as a percentage
	 */
	getWidth() {
		let manaPercentage = this.currentMana / 100;
		if (manaPercentage < 0) {
			return 0;
		}

		return PLAYER_MANABAR.width * manaPercentage;
	}

	/**
	 *
	 * @param {Integer} mana Decrease Mana Value
	 *
	 * Decreases the supplied mana value from cureen mana when special move is used
	 */
	decreaseMana(mana) {
		this.currentMana -= mana;
	}
}
