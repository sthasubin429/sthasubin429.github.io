import { MOVE_SPEED, CANVAS_WIDTH, CANVAS_HEIGHT, CHARACTER_PADDING, SCALE_SPRITE, STAGE_HEIGHT } from '../utility/constant.js';

import { rectangularCollision, resetState } from '../utility/utils.js';

import Animation from '../components/animation.js';

import Health from '../components/health.js';

import Mana from '../components/mana.js';

/**
 *
 * Player Super class for all characters
 */
export default class Player {
	/**
	 *
	 * @param {Objects} props Object of values passed from child class
	 */
	constructor(props) {
		this.ctx = props.ctx;

		this.position = { ...props.position };
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

			specialMove1: false,
		};

		this.attackState = {
			attackType: null,
			attackDamage: 0,
		};

		this.animationComplete = false;
		this.keyListener = true;

		this.animation = new Animation(this.ctx, props.sprite, this.rotation, [...props.animationArray], this.position, props.animationTime, true, false);

		this.increaseHeight = false;
		this.changeFactor = 2;

		this.colision = false;

		this.isAttacked = false;

		this.health = 100;

		this.healthBar = new Health(this.ctx, this);

		this.manaBar = new Mana(this.ctx, this);

		//function binding
		this.updateState = this.updateState.bind(this);
		this.changeHeight = this.changeHeight.bind(this);
		this.updateHeight = this.updateHeight.bind(this);
		this.checkAttacked = this.checkAttacked.bind(this);
		this.writePlayerName = this.writePlayerName.bind(this);
	}

	/**
	 *
	 * @param {Integer} frameCount Current Frame count
	 *
	 * Draws Player on canvas
	 */
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
		this.colision = false;

		this.healthBar.drawHealthBar(this.health);
		this.manaBar.drawManabar(frameCount);

		this.isDead();
	}

	/**
	 *
	 * @param {Integer} frameCount
	 *
	 * Updates Projectile state
	 */
	updateProjectile(frameCount) {
		if (this.projectile.checkProjectilePosition()) {
			this.projectile = null;
			this.currentState = resetState(this.currentState);
			this.animation.counter = 0;
		}

		this.projectile.update(frameCount);

		if (this.projectile) {
			this.projectile.animate();
		}
	}

	/**
	 *
	 * @param {Object} otherPlayer Object of other player
	 *
	 * Checks if the attack is triggerd and hit the other player
	 */
	checkAttacked(otherPlayer) {
		if (this.colision && this.isAttacked) {
			otherPlayer.setAttackedState(otherPlayer, this.attackState);

			this.attackState = {
				attackType: null,
				attackDamage: 0,
			};
		}

		this.isAttacked = false;
		this.colision = false;
	}

	/**
	 *
	 * @param {String} name Player Name
	 *
	 * Writes the name of player  on canvas
	 */
	writePlayerName(name) {
		this.ctx.font = '600 26px Noto Sans JP';
		this.ctx.fillStyle = '#d83060';
		if (this.rotation) {
			this.ctx.fillText(`${name}`, 1080, 45);
		} else {
			this.ctx.fillText(`${name}`, 100, 45);
		}
	}

	/**
	 *
	 * @param {Integer} requiredMana Required mana to perform special move
	 *
	 * Checks if the mana is enough to perform special move
	 */
	checkMana(requiredMana) {
		if (this.manaBar.currentMana > requiredMana) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 *
	 * Checks if the player has colided with the wall
	 */
	checkWallColision() {
		if (this.position.x <= 0) {
			this.position.x = 0;
		} else if (this.position.x >= CANVAS_WIDTH - this.animation.spritePosition[this.animation.counter].width - CHARACTER_PADDING) {
			this.position.x = CANVAS_WIDTH - this.animation.spritePosition[this.animation.counter].width - CHARACTER_PADDING;
		}
	}

	/**
	 *
	 * @param {Object} otherPlayer Object of Opponent
	 *
	 * Colision detection between two players
	 */
	checkCollision(otherPlayer) {
		let player1Rectangle = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};

		let player2Rectangle = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};

		//
		player1Rectangle.y = this.position.y;

		player1Rectangle.width = this.animation.spritePosition[this.animation.counter].width * SCALE_SPRITE;
		player1Rectangle.height = this.animation.spritePosition[this.animation.counter].height * SCALE_SPRITE;

		//
		player2Rectangle.y = otherPlayer.position.y;

		player2Rectangle.width = otherPlayer.animation.spritePosition[otherPlayer.animation.counter].width * SCALE_SPRITE;
		player2Rectangle.height = otherPlayer.animation.spritePosition[otherPlayer.animation.counter].height * SCALE_SPRITE;
		if (this.rotation) {
			player1Rectangle.x = this.position.x * -1 + CANVAS_WIDTH + player1Rectangle.width - CHARACTER_PADDING * 2.1;
		} else {
			player1Rectangle.x = this.position.x + player1Rectangle.width - CHARACTER_PADDING * 2.1;
		}

		if (otherPlayer.rotation) {
			player2Rectangle.x = otherPlayer.position.x * -1 + CANVAS_WIDTH + player2Rectangle.width - CHARACTER_PADDING * 2.1;
		} else {
			player2Rectangle.x = otherPlayer.position.x + player2Rectangle.width - CHARACTER_PADDING * 2.1;
		}

		//checking Collision
		if (rectangularCollision(player1Rectangle, player2Rectangle, this.rotation)) {
			this.colision = true;
		}
	}

	/**
	 *
	 * @param {Integer} damage Damage for the triggerd attack
	 * @param {String} type Hit Type for opponent
	 */
	triggerAttack(damage, type) {
		this.isAttacked = true;

		this.attackState.attackDamage = damage;

		this.attackState.attackType = type;
	}

	/**
	 *
	 * chanes the height of player when any jump task is performed
	 */
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

	/**
	 *
	 * Returns requred height for change height function
	 */
	updateHeight() {
		return CANVAS_HEIGHT - STAGE_HEIGHT - this.animation.spritePosition[this.animation.counter].height * SCALE_SPRITE;
	}

	/**
	 *
	 * @param {Object} spritePosition Position of Image on sprite
	 * @param {Integer} animationTime Animation time for sprite
	 * @param {Boolen} loop Weather to loop the state or not
	 */
	updateState(spritePosition, animationTime, loop) {
		this.animation.spritePosition = spritePosition;

		this.animation.animationTime = animationTime;

		this.animation.loop = loop;
	}

	/**
	 *
	 * @param {Object} spritePosition Position of Image on sprite
	 * @param {Integer} animationTime Animation time for sprite
	 * @param {Boolen} loop Weather to loop the state or not
	 */
	makeIdle(spritePosition, animationTime, loop) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = false;
	}

	/**
	 *
	 * @param {Object} spritePosition Position of Image on sprite
	 * @param {Integer} animationTime Animation time for sprite
	 * @param {Boolen} loop Weather to loop the state or not
	 * @param {Integer} moveSpeed Speed at which x position is changed
	 */
	moveRight(spritePosition, animationTime, loop, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.position.x -= moveSpeed;
	}

	/**
	 *
	 * @param {Object} spritePosition Position of Image on sprite
	 * @param {Integer} animationTime Animation time for sprite
	 * @param {Boolen} loop Weather to loop the state or not
	 * @param {Integer} moveSpeed Speed at which x position is changed
	 */
	moveLeft(spritePosition, animationTime, loop, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.position.x += moveSpeed;
	}

	/**
	 *
	 * @param {Object} spritePosition Position of Image on sprite
	 * @param {Integer} animationTime Animation time for sprite
	 * @param {Boolen} loop Weather to loop the state or not
	 * @param {Integer} changeFactor How high to jump
	 */
	jump(spritePosition, animationTime, loop, changeFactor) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = true;

		this.changeFactor = changeFactor;
	}

	/**
	 *
	 * @param {Object} spritePosition Position of Image on sprite
	 * @param {Integer} animationTime Animation time for sprite
	 * @param {Boolen} loop Weather to loop the state or not
	 * @param {Integer} changeFactor How high to jump
	 * @param {Integer} moveSpeed Speed at which x position is changed
	 */
	frontFlip(spritePosition, animationTime, loop, changeFactor, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = true;

		this.changeFactor = changeFactor;

		this.position.x += moveSpeed;
	}

	/**
	 *
	 * @param {Object} spritePosition Position of Image on sprite
	 * @param {Integer} animationTime Animation time for sprite
	 * @param {Boolen} loop Weather to loop the state or not
	 * @param {Integer} changeFactor How high to jump
	 * @param {Integer} moveSpeed Speed at which x position is changed
	 */
	backFlip(spritePosition, animationTime, loop, changeFactor, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = true;

		this.changeFactor = changeFactor;

		this.position.x -= moveSpeed;
	}

	/**
	 *
	 * Checks if the player has died or not.
	 * Returns true of the player has died
	 */
	isDead() {
		if (this.health < 1) {
			return true;
		}
	}
}
