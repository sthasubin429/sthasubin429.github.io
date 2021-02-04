import Player from '../player.js';

import { ryuSprite } from '../../img/images.js';
import { resetState } from '../../utility/utils.js';

import { audioHadouken } from '../../audio/audio.js';

import Projectile from '../../components/projectile.js';

import { MOVE_SPEED, FACE_HIT, NORMAL_HIT, STOMACH_HIT, DAMAGE } from '../../utility/constant.js';
import { RYU_IDLE_ANIMATION_TIME, RYU_POSITON, RYU_SPRITE_POSITION, RYU_HADUKEN_MANA } from './ryuConstant.js';

/**
 *
 * For Ryu Character
 */
export default class Ryu extends Player {
	/**
	 *
	 * @param {Object} ctx Canvas Context
	 * @param {Boolen} rotation Weather the Character is mirored or not
	 */
	constructor(ctx, rotation) {
		let props = {
			ctx: ctx,
			position: RYU_POSITON,
			rotation: rotation,
			sprite: ryuSprite,
			animationArray: RYU_SPRITE_POSITION.idle,
			animationTime: RYU_IDLE_ANIMATION_TIME,
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
			if (!this.projectile && this.checkMana(RYU_HADUKEN_MANA)) {
				this.haduken();
				audioHadouken.play();

				this.projectile = new Projectile(
					this,
					otherPlayer,

					this.ctx,

					ryuSprite,
					this.position,

					RYU_SPRITE_POSITION.projectileStart,
					RYU_SPRITE_POSITION.projectileMove,
					RYU_SPRITE_POSITION.projectileHit,

					RYU_IDLE_ANIMATION_TIME
				);

				this.manaBar.decreaseMana(RYU_HADUKEN_MANA);
			} else if (this.projectile) {
				this.haduken();
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
		} else if (this.currentState.lowKick || this.currentState.mediumKick) {
			this.kick();
		} else if (this.currentState.heavyKick) {
			this.heavyKick();
		} else if (this.currentState.lowPunch) {
			this.lowPunch();
		} else if (this.currentState.mediumPunch || this.currentState.heavyPunch) {
			this.punch();
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

		this.writePlayerName('Ryu');
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
			this.updateState(RYU_SPRITE_POSITION.faceHit, RYU_IDLE_ANIMATION_TIME, false);
		} else if (attackState.attackType === STOMACH_HIT) {
			this.updateState(RYU_SPRITE_POSITION.stomachHit, RYU_IDLE_ANIMATION_TIME, false);
		} else {
			this.updateState(RYU_SPRITE_POSITION.normalHit, RYU_IDLE_ANIMATION_TIME, false);
		}

		this.position.x -= MOVE_SPEED * 1.5;
		this.health -= attackState.attackDamage;

		attackState.attackDamage = 0;
	}

	/**
	 *
	 * Updates state to animate haduken
	 */
	haduken() {
		this.updateState(RYU_SPRITE_POSITION.haduken, RYU_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Forward Heavy Kick
	 */
	forwardHeavyKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardHeavyKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Medium Kick
	 */
	forwardMediumKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardMediumKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Low Kick
	 */
	forwardLowKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardLowKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Heavy kick
	 */
	heavyKick() {
		this.updateState(RYU_SPRITE_POSITION.heavyKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	/**
	 *
	 * Updates state to animate Low and Medium Kick
	 */
	kick() {
		this.updateState(RYU_SPRITE_POSITION.kick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Heavy punch
	 */
	forwardHeavyPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardHeavyPunch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Medium punch
	 */
	forwardMediumPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardMediumPuch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Forward Low Punch
	 */
	forwardLowPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardLowPunch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Medium and heavy punch
	 */
	punch() {
		this.updateState(RYU_SPRITE_POSITION.punch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Update state to animate Low punch
	 */
	lowPunch() {
		this.updateState(RYU_SPRITE_POSITION.lowPuch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	/**
	 *
	 * Updates state to animate Standing Block
	 */
	standingBlock() {
		this.updateState(RYU_SPRITE_POSITION.standingBlock, RYU_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Crouching Block
	 */
	crouchingBlock() {
		this.updateState(RYU_SPRITE_POSITION.crouchingBlock, RYU_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Idle state
	 */
	makeIdle() {
		super.makeIdle(RYU_SPRITE_POSITION.idle, RYU_IDLE_ANIMATION_TIME, true);
	}

	/**
	 *
	 * Updates state to animate Moving right
	 */
	moveRight() {
		super.moveRight(RYU_SPRITE_POSITION.moveRight, RYU_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	/**
	 *
	 * Updates state to animate Moving left
	 */
	moveLeft() {
		super.moveLeft(RYU_SPRITE_POSITION.moveLeft, RYU_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	/**
	 *
	 * Updates state to animate Jump
	 */
	jump() {
		super.jump(RYU_SPRITE_POSITION.jump, RYU_IDLE_ANIMATION_TIME, false, 1);
	}

	/**
	 *
	 * Updates state to animte Crouch
	 */
	crouch() {
		this.updateState(RYU_SPRITE_POSITION.crouch, RYU_IDLE_ANIMATION_TIME, false);
	}

	/**
	 *
	 * Updates state to animate Front flip
	 */
	frontFlip() {
		super.frontFlip(RYU_SPRITE_POSITION.frontFlip, RYU_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}

	/**
	 *
	 * Updates state to animate Back flip
	 */
	backFlip() {
		super.backFlip(RYU_SPRITE_POSITION.backFlip, RYU_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}
}
