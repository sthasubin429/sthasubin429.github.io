class Player {
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

		//function binding
		this.updateState = this.updateState.bind(this);

		this.changeHeight = this.changeHeight.bind(this);

		this.updateHeight = this.updateHeight.bind(this);

		this.checkAttacked = this.checkAttacked.bind(this);

		this.health = 1000;
	}

	drawPlayer(frameCount, otherPlayer) {
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

		this.checkHealth();
	}

	checkWallColision() {
		if (this.position.x <= 0) {
			this.position.x = 0;
		} else if (this.position.x >= CANVAS_WIDTH - this.animation.spritePosition[this.animation.counter].width - CHARACTER_PADDING) {
			this.position.x = CANVAS_WIDTH - this.animation.spritePosition[this.animation.counter].width - CHARACTER_PADDING;
		}
	}

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
			// console.log('hello');
		}
	}

	triggerAttack(damage, type) {
		this.isAttacked = true;

		this.attackState.attackDamage = damage;

		this.attackState.attackType = type;
	}

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

	updateHeight() {
		return CANVAS_HEIGHT - STAGE_HEIGHT - this.animation.spritePosition[this.animation.counter].height * SCALE_SPRITE;
	}

	updateState(spritePosition, animationTime, loop) {
		this.animation.spritePosition = spritePosition;

		this.animation.animationTime = animationTime;

		this.animation.loop = loop;
	}

	makeIdle(spritePosition, animationTime, loop) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = false;
	}

	moveRight(spritePosition, animationTime, loop, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.position.x -= moveSpeed;
	}

	moveLeft(spritePosition, animationTime, loop, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.position.x += moveSpeed;
	}

	jump(spritePosition, animationTime, loop, changeFactor) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = true;

		this.changeFactor = changeFactor;
	}

	frontFlip(spritePosition, animationTime, loop, changeFactor, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = true;

		this.changeFactor = changeFactor;

		this.position.x += moveSpeed;
	}

	backFlip(spritePosition, animationTime, loop, changeFactor, moveSpeed) {
		this.updateState(spritePosition, animationTime, loop);

		this.increaseHeight = true;

		this.changeFactor = changeFactor;

		this.position.x -= moveSpeed;
	}

	checkHealth() {
		if (this.health < 1) {
			console.log('game over');
		}
	}
}
