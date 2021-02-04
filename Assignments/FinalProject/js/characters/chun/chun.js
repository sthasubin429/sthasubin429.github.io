import Player from '../player.js';

import { chunSprite } from '../../img/images.js';
import { resetState } from '../../utility/utils.js';

import Projectile from '../../components/projectile.js';

import { MOVE_SPEED, FACE_HIT, NORMAL_HIT, STOMACH_HIT, DAMAGE } from '../../utility/constant.js';
import { CHUN_IDLE_ANIMATION_TIME, CHUN_POSITON, CHUN_SPRITE_POSITION, CHUN_KIKOUKEN_MANA } from './chunConstant.js';

/**
 *
 * For Chun Li Character
 */
export default class Chun extends Player {
	constructor(ctx, rotation) {
		/**
		 *
		 * @param {Object} ctx Canvas Context
		 * @param {Boolen} rotation Weather the Character is mirored or not
		 */
		let props = {
			ctx: ctx,
			position: CHUN_POSITON,
			rotation: rotation,
			sprite: chunSprite,
			animationArray: CHUN_SPRITE_POSITION.idle,
			animationTime: CHUN_IDLE_ANIMATION_TIME,
		};

		super(props);

		this.moveLeft = this.moveLeft.bind(this);

		this.projectile = false;
	}

	/**
	 *
	 * @param {Object} otherPlayer Opponent Player object
	 * @param {Integer} frameCount Current Frame count
	 *
	 * Updates the state of player based on input from user
	 */
	updatePlayer(otherPlayer, frameCount) {
		super.checkWallColision();

		super.checkCollision(otherPlayer);

		this.keyListener = false;

		if (this.currentState.specialMove1 === true) {
			if (!this.projectile && this.checkMana(CHUN_KIKOUKEN_MANA)) {
				this.kikouken();

				this.projectile = new Projectile(
					this,
					otherPlayer,

					this.ctx,

					chunSprite,
					this.position,

					CHUN_SPRITE_POSITION.projectileStart,
					CHUN_SPRITE_POSITION.projectileMove,
					CHUN_SPRITE_POSITION.projectileHit,

					CHUN_IDLE_ANIMATION_TIME
				);

				this.manaBar.decreaseMana(CHUN_KIKOUKEN_MANA);
			} else if (this.projectile) {
				this.kikouken();
			} else {
				this.currentState = resetState(this.currentState);
				this.currentState.isIdle = true;
				this.makeIdle();
			}
		} else if (this.currentState.isMovingRight && this.currentState.isMovingLeft) {
			this.standingBlock();
		} else if (this.currentState.lowKick && this.currentState.isMovingRight) {
			this.forwardLowKick();
		} else if (this.currentState.mediumKick && this.currentState.isMovingRight) {
			this.forwardMediumKick();
		} else if (this.currentState.heavyKick && this.currentState.isMovingRight) {
			this.forwardHeavyKick();
		} else if (this.currentState.lowPunch && this.currentState.isMovingRight) {
			this.forwardLowPunch();
		} else if (this.currentState.mediumPunch && this.currentState.isMovingRight) {
			this.forwardMediumPunch();
		} else if (this.currentState.heavyPunch && this.currentState.isMovingRight) {
			this.forwardHeavyPunch();
		} else if (this.currentState.isJumping && this.currentState.isMovingRight) {
			if (this.rotation) {
				this.backFlip();
			} else {
				this.frontFlip();
			}
		} else if (this.currentState.isJumping && this.currentState.isMovingLeft) {
			if (this.rotation) {
				this.frontFlip();
			} else {
				this.backFlip();
			}
		} else if (this.currentState.isCrouching && (this.currentState.isMovingLeft || this.currentState.isMovingRight)) {
			this.crouchingBlock();
		} else if (this.currentState.isJumping && this.currentState.isCrouching) {
			this.standingBlock();
		} else if (this.currentState.lowKick) {
			this.lowKick();
		} else if (this.currentState.mediumKick) {
			this.mediumKick();
		} else if (this.currentState.heavyKick) {
			this.heavyKick();
		} else if (this.currentState.lowPunch) {
			this.lowPunch();
		} else if (this.currentState.mediumPunch) {
			this.mediumpunch();
		} else if (this.currentState.heavyPunch) {
			this.heavyPunch();
		} else if (this.currentState.isMovingRight) {
			if (this.rotation) {
				this.moveRight();
			} else {
				this.moveLeft();
			}
		} else if (this.currentState.isMovingLeft) {
			if (this.rotation) {
				this.moveLeft();
			} else {
				this.moveRight();
			}
		} else if (this.currentState.isJumping) {
			this.jump();
		} else if (this.currentState.isCrouching) {
			this.crouch();
		} else if (this.currentState.isIdle) {
			this.makeIdle();
			this.keyListener = true;
		}

		if (this.projectile) {
			this.updateProjectile(frameCount);
		}

		this.checkAttacked(otherPlayer);

		this.writePlayerName('Chun Li');
	}

	/**
	 *
	 * @param {Object} otherPlayer Opponent player object
	 * @param {Object} attackState Attack state of current player
	 *
	 * Animates hit for player
	 */
	setAttackedState(attackState) {
		this.currentState = resetState(this.currentState);
		this.animation.counter = 0;

		if (attackState.attackType === FACE_HIT) {
			this.updateState(CHUN_SPRITE_POSITION.faceHit, CHUN_IDLE_ANIMATION_TIME, false);
		} else if (attackState.attackType === STOMACH_HIT) {
			this.updateState(CHUN_SPRITE_POSITION.stomachHit, CHUN_IDLE_ANIMATION_TIME, false);
		} else {
			this.updateState(CHUN_SPRITE_POSITION.normalHit, CHUN_IDLE_ANIMATION_TIME, false);
		}

		this.position.x -= MOVE_SPEED * 1.5;
		this.health -= attackState.attackDamage;

		attackState.attackDamage = 0;
	}

	/**
	 *
	 * Updates state to animate Kikouken
	 */
	kikouken() {
		this.updateState(CHUN_SPRITE_POSITION.kikouken, CHUN_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Forward Heavy Kick
	 */
	forwardHeavyKick() {
		this.updateState(CHUN_SPRITE_POSITION.forwardHeavyKick, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Medium Kick
	 */
	forwardMediumKick() {
		this.updateState(CHUN_SPRITE_POSITION.forwardMediumKick, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Low Kick
	 */
	forwardLowKick() {
		this.updateState(CHUN_SPRITE_POSITION.forwardLowKick, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Heavy kick
	 */
	heavyKick() {
		this.updateState(CHUN_SPRITE_POSITION.heavyKick, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE / 2, FACE_HIT);
	}

	/**
	 *
	 * Updates state to animate Medium Kick
	 */
	mediumKick() {
		this.updateState(CHUN_SPRITE_POSITION.mediumKick, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE / 2, FACE_HIT);
	}

	/**
	 *
	 * Updates state to animate Low Kick
	 */
	lowKick() {
		this.updateState(CHUN_SPRITE_POSITION.lowKick, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE / 2, FACE_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Heavy punch
	 */
	forwardHeavyPunch() {
		this.updateState(CHUN_SPRITE_POSITION.forwardHeavyPunch, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Medium punch
	 */
	forwardMediumPunch() {
		this.updateState(CHUN_SPRITE_POSITION.forwardMediumPuch, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Low Punch
	 */
	forwardLowPunch() {
		this.updateState(CHUN_SPRITE_POSITION.forwardLowPunch, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate heavy punch
	 */
	heavyPunch() {
		this.updateState(CHUN_SPRITE_POSITION.heavyPunch, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Medium punch
	 */
	mediumpunch() {
		this.updateState(CHUN_SPRITE_POSITION.mediumPunch, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Update state to animate Low punch
	 */
	lowPunch() {
		this.updateState(CHUN_SPRITE_POSITION.lowPuch, CHUN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Standing Block
	 */
	standingBlock() {
		this.updateState(CHUN_SPRITE_POSITION.standingBlock, CHUN_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Crouching Block
	 */
	crouchingBlock() {
		this.updateState(CHUN_SPRITE_POSITION.crouchingBlock, CHUN_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Idle state
	 */
	makeIdle() {
		super.makeIdle(CHUN_SPRITE_POSITION.idle, CHUN_IDLE_ANIMATION_TIME, true);
	}

	/**
	 *
	 * Updates state to animate Moving right
	 */
	moveRight() {
		super.moveRight(CHUN_SPRITE_POSITION.moveRight, CHUN_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	/**
	 *
	 * Updates state to animate Moving left
	 */
	moveLeft() {
		super.moveLeft(CHUN_SPRITE_POSITION.moveLeft, CHUN_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	/**
	 *
	 * Updates state to animate Jump
	 */
	jump() {
		super.jump(CHUN_SPRITE_POSITION.jump, CHUN_IDLE_ANIMATION_TIME, false, 1);
	}

	/**
	 *
	 * Updates state to animte Crouch
	 */
	crouch() {
		this.updateState(CHUN_SPRITE_POSITION.crouch, CHUN_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Front flip
	 */
	frontFlip() {
		super.frontFlip(CHUN_SPRITE_POSITION.frontFlip, CHUN_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}

	/**
	 *
	 * Updates state to animate Back flip
	 */
	backFlip() {
		super.backFlip(CHUN_SPRITE_POSITION.backFlip, CHUN_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}
}
