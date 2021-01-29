class Ryu extends Player {
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
	}

	updatePlayer() {
		this.keyListener = false;
		if (this.currentState.isMovingRight && this.currentState.isMovingLeft) {
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
	}

	forwardHeavyKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardHeavyKick, RYU_IDLE_ANIMATION_TIME, false);
	}

	forwardMediumKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardMediumKick, RYU_IDLE_ANIMATION_TIME, false);
	}

	forwardLowKick() {
		this.updateState(RYU_SPRITE_POSITION.forwardLowKick, RYU_IDLE_ANIMATION_TIME, false);
	}

	heavyKick() {
		this.updateState(RYU_SPRITE_POSITION.heavyKick, RYU_IDLE_ANIMATION_TIME, false);
	}

	kick() {
		this.updateState(RYU_SPRITE_POSITION.kick, RYU_IDLE_ANIMATION_TIME, false);
	}

	forwardHeavyPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardHeavyPunch, RYU_IDLE_ANIMATION_TIME, false);
	}

	forwardMediumPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardMediumPuch, RYU_IDLE_ANIMATION_TIME, false);
	}

	forwardLowPunch() {
		this.updateState(RYU_SPRITE_POSITION.forwardLowPunch, RYU_IDLE_ANIMATION_TIME, false);
	}

	punch() {
		this.updateState(RYU_SPRITE_POSITION.punch, RYU_IDLE_ANIMATION_TIME, false);
	}

	lowPunch() {
		this.updateState(RYU_SPRITE_POSITION.lowPuch, RYU_IDLE_ANIMATION_TIME, false);
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
		super.jump(RYU_SPRITE_POSITION.jump, RYU_IDLE_ANIMATION_TIME, false, 2);
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
