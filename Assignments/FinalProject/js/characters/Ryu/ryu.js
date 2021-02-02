import { RYU_IDLE_ANIMATION_TIME, RYU_POSITON, RYU_SPRITE_POSITION, RYU_HADUKEN_MANA } from './ryuConstant.js';

import { ryuSprite } from '../../img/images.js';

import Player from '../player.js';

import Projectile from '../../components/projectile.js';

import { MOVE_SPEED, FACE_HIT, NORMAL_HIT, STOMACH_HIT, DAMAGE } from '../../utility/constant.js';

import { resetState } from '../../utility/utils.js';

export default class Ryu extends Player {
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

	updatePlayer(otherPlayer, frameCount) {
		super.checkWallColision();

		super.checkCollision(otherPlayer);

		this.keyListener = false;

		if (this.currentState.specialMove1 === true) {
			if (!this.projectile && this.checkMana(RYU_HADUKEN_MANA)) {
				this.haduken();

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
			this.frontFlip();
		} else if (this.currentState.isJumping && this.currentState.isMovingLeft) {
			this.backFlip();
		} else if (this.currentState.isCrouching && (this.currentState.isMovingLeft || this.currentState.isMovingRight)) {
			this.crouchingBlock();
		} else if (this.currentState.isJumping && this.currentState.isCrouching) {
			this.standingBlock();
		} else if (this.currentState.lowKick) {
			this.kick();
		} else if (this.currentState.mediumKick) {
			this.kick();
		} else if (this.currentState.heavyKick) {
			this.heavyKick();
		} else if (this.currentState.lowPunch) {
			this.lowPunch();
		} else if (this.currentState.mediumPunch) {
			this.punch();
		} else if (this.currentState.heavyPunch) {
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
	}

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

	setAttackedState(otherPlayer, attackState) {
		otherPlayer.currentState = resetState(otherPlayer.currentState);

		if (attackState.attackType === FACE_HIT) {
			otherPlayer.updateState(RYU_SPRITE_POSITION.faceHit, RYU_IDLE_ANIMATION_TIME, false);
		} else if (attackState.attackType === STOMACH_HIT) {
			otherPlayer.updateState(RYU_SPRITE_POSITION.stomachHit, RYU_IDLE_ANIMATION_TIME, false);
		} else {
			otherPlayer.updateState(RYU_SPRITE_POSITION.normalHit, RYU_IDLE_ANIMATION_TIME, false);
		}

		otherPlayer.position.x -= MOVE_SPEED * 1.5;
		otherPlayer.health -= attackState.attackDamage;

		attackState.attackDamage = 0;

		console.log(otherPlayer.health);
	}

	haduken() {
		this.updateState(RYU_SPRITE_POSITION.haduken, RYU_IDLE_ANIMATION_TIME, false);
	}

	forwardHeavyKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardHeavyKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	forwardMediumKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardMediumKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	forwardLowKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardLowKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	heavyKick() {
		this.updateState(RYU_SPRITE_POSITION.heavyKick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	kick() {
		this.updateState(RYU_SPRITE_POSITION.kick, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	forwardHeavyPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardHeavyPunch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	forwardMediumPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardMediumPuch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	forwardLowPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardLowPunch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	punch() {
		this.updateState(RYU_SPRITE_POSITION.punch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	lowPunch() {
		this.updateState(RYU_SPRITE_POSITION.lowPuch, RYU_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	standingBlock() {
		this.updateState(RYU_SPRITE_POSITION.standingBlock, RYU_IDLE_ANIMATION_TIME, false);
	}

	crouchingBlock() {
		this.updateState(RYU_SPRITE_POSITION.crouchingBlock, RYU_IDLE_ANIMATION_TIME, false);
	}

	makeIdle() {
		super.makeIdle(RYU_SPRITE_POSITION.idle, RYU_IDLE_ANIMATION_TIME, true);
	}

	moveRight() {
		super.moveRight(RYU_SPRITE_POSITION.moveRight, RYU_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	moveLeft() {
		super.moveLeft(RYU_SPRITE_POSITION.moveLeft, RYU_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	jump() {
		super.jump(RYU_SPRITE_POSITION.jump, RYU_IDLE_ANIMATION_TIME, false, 1);
	}

	crouch() {
		this.updateState(RYU_SPRITE_POSITION.crouch, RYU_IDLE_ANIMATION_TIME, false);
	}

	frontFlip() {
		super.frontFlip(RYU_SPRITE_POSITION.frontFlip, RYU_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}

	backFlip() {
		super.backFlip(RYU_SPRITE_POSITION.backFlip, RYU_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}
}