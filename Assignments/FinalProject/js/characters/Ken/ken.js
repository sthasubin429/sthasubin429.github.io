import { KEN_IDLE_ANIMATION_TIME, KEN_POSITON, KEN_SPRITE_POSITION } from './kenConstant.js';

import { kenSprite, ryuSprite } from '../../img/images.js';

import Player from '../player.js';

import Projectile from '../../components/projectile.js';

import { MOVE_SPEED, FACE_HIT, NORMAL_HIT, STOMACH_HIT, DAMAGE } from '../../utility/constant.js';

import { resetState } from '../../utility/utils.js';

export default class Ken extends Player {
	constructor(ctx, rotation) {
		let props = {
			ctx: ctx,
			position: KEN_POSITON,
			rotation: rotation,
			sprite: kenSprite,
			animationArray: KEN_SPRITE_POSITION.idle,
			animationTime: KEN_IDLE_ANIMATION_TIME,
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
			if (!this.projectile) {
				this.haduken();

				this.projectile = new Projectile(
					this,
					otherPlayer,

					this.ctx,

					ryuSprite,
					this.position,

					KEN_SPRITE_POSITION.projectileStart,
					KEN_SPRITE_POSITION.projectileMove,
					KEN_SPRITE_POSITION.projectileHit,

					KEN_IDLE_ANIMATION_TIME
				);
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
			otherPlayer.updateState(KEN_SPRITE_POSITION.faceHit, KEN_IDLE_ANIMATION_TIME, false);
		} else if (attackState.attackType === STOMACH_HIT) {
			otherPlayer.updateState(KEN_SPRITE_POSITION.stomachHit, KEN_IDLE_ANIMATION_TIME, false);
		} else {
			otherPlayer.updateState(KEN_SPRITE_POSITION.normalHit, KEN_IDLE_ANIMATION_TIME, false);
		}

		otherPlayer.position.x -= MOVE_SPEED * 1.5;

		otherPlayer.health -= attackState.attackDamage;

		console.log(otherPlayer.health);
	}

	haduken() {
		this.updateState(KEN_SPRITE_POSITION.haduken, KEN_IDLE_ANIMATION_TIME, false);
	}

	forwardHeavyKick() {
		this.updateState(KEN_SPRITE_POSITION.forwardHeavyKick, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, FACE_HIT);
	}

	forwardMediumKick() {
		this.updateState(KEN_SPRITE_POSITION.forwardMediumKick, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	forwardLowKick() {
		this.updateState(KEN_SPRITE_POSITION.forwardLowKick, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	heavyKick() {
		this.updateState(KEN_SPRITE_POSITION.heavyKick, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE / 2, FACE_HIT);
	}

	kick() {
		this.updateState(KEN_SPRITE_POSITION.kick, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE / 2, FACE_HIT);
	}

	forwardHeavyPunch() {
		this.updateState(KEN_SPRITE_POSITION.forwardHeavyPunch, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	forwardMediumPunch() {
		this.updateState(KEN_SPRITE_POSITION.forwardMediumPuch, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	forwardLowPunch() {
		this.updateState(KEN_SPRITE_POSITION.forwardLowPunch, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	punch() {
		this.updateState(KEN_SPRITE_POSITION.punch, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE / 2, NORMAL_HIT);
	}

	lowPunch() {
		this.updateState(KEN_SPRITE_POSITION.lowPuch, KEN_IDLE_ANIMATION_TIME, false);
		this.triggerAttack(DAMAGE, NORMAL_HIT);
	}

	standingBlock() {
		this.updateState(KEN_SPRITE_POSITION.standingBlock, KEN_IDLE_ANIMATION_TIME, false);
	}

	crouchingBlock() {
		this.updateState(KEN_SPRITE_POSITION.crouchingBlock, KEN_IDLE_ANIMATION_TIME, false);
	}

	makeIdle() {
		super.makeIdle(KEN_SPRITE_POSITION.idle, KEN_IDLE_ANIMATION_TIME, true);
	}

	moveRight() {
		super.moveRight(KEN_SPRITE_POSITION.moveRight, KEN_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	moveLeft() {
		super.moveLeft(KEN_SPRITE_POSITION.moveLeft, KEN_IDLE_ANIMATION_TIME, false, MOVE_SPEED);
	}

	jump() {
		super.jump(KEN_SPRITE_POSITION.jump, KEN_IDLE_ANIMATION_TIME, false, 1);
	}

	crouch() {
		this.updateState(KEN_SPRITE_POSITION.crouch, KEN_IDLE_ANIMATION_TIME, false);
	}

	frontFlip() {
		super.frontFlip(KEN_SPRITE_POSITION.frontFlip, KEN_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}

	backFlip() {
		super.backFlip(KEN_SPRITE_POSITION.backFlip, KEN_IDLE_ANIMATION_TIME - 3, false, 2, MOVE_SPEED + 3);
	}
}
