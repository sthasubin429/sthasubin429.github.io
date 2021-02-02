import {
	CANVAS_WIDTH,
	STATE_START,
	STATE_MOVE,
	STATE_HIT,
	CHARACTER_PADDING,
	PROJECTILE_SPEED,
	SCALE_SPRITE,
	STOMACH_HIT,
	DAMAGE,
} from '../utility/constant.js';

import { rectangularCollision } from '../utility/utils.js';

export default class Projectile {
	constructor(creator, target, ctx, sprite, projectilePosition, start, move, hit, animationTime) {
		this.ctx = ctx;
		this.creator = creator;
		this.target = target;

		this.sprite = sprite;
		this.projectilePosition = { ...projectilePosition };

		this.start = start;
		this.move = move;
		this.hit = hit;

		this.spritePosition = this.start;

		this.animationTime = animationTime;

		this.counter = 0;

		this.state = STATE_START;

		this.projectilePosition.y += 20;

		//Function Binding
		this.moveProjectile = this.moveProjectile.bind(this);
		this.checkProjectilePosition = this.checkProjectilePosition.bind(this);
		this.checkHit = this.checkHit.bind(this);
	}

	update(frameCount) {
		if (!(this.state === STATE_HIT)) {
			this.moveProjectile();
		}

		if (this.counter === this.start.length - 1 && this.state === STATE_START) {
			this.counter = 0;
			this.state = STATE_MOVE;
			this.spritePosition = this.move;
		}

		if (this.state === STATE_MOVE && this.counter === this.move.length - 1) {
			this.counter = 0;
		}

		if (frameCount % this.animationTime === 0) {
			this.counter++;
		}

		if (this.checkHit()) {
			this.state = STATE_HIT;
			this.spritePosition = this.hit;
			this.creator.colision = true;
			this.target.animation.counter = 0;
			this.target.animationComplete = true;
			this.target.increaseHeight = false;
			this.creator.triggerAttack(DAMAGE, STOMACH_HIT);
		}

		if (this.state === STATE_HIT && this.counter === this.hit.length - 1) {
			this.counter = 0;
			this.creator.projectile = null;
		}
	}

	animate() {
		this.ctx.save();

		if (this.creator.rotation) {
			this.ctx.translate(CANVAS_WIDTH, 0);
			this.ctx.scale(-1, 1);
		}

		this.ctx.drawImage(
			this.sprite,
			this.spritePosition[this.counter].x,
			this.spritePosition[this.counter].y,
			this.spritePosition[this.counter].width,
			this.spritePosition[this.counter].height,
			this.projectilePosition.x + this.spritePosition[this.counter].width * SCALE_SPRITE,
			this.projectilePosition.y,
			this.spritePosition[this.counter].width * SCALE_SPRITE,
			this.spritePosition[this.counter].height * SCALE_SPRITE
		);

		this.ctx.restore();
	}

	checkProjectilePosition() {
		if (this.projectilePosition.x <= 0 || this.projectilePosition.x >= CANVAS_WIDTH - this.spritePosition[this.counter].width - CHARACTER_PADDING) {
			return true;
		}
	}

	moveProjectile() {
		this.projectilePosition.x += PROJECTILE_SPEED;
	}

	checkHit() {
		let prjectileRectangle = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};

		let targetRecangle = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};

		//
		prjectileRectangle.y = this.projectilePosition.y;

		prjectileRectangle.width = this.spritePosition[this.counter].width * SCALE_SPRITE;
		prjectileRectangle.height = this.spritePosition[this.counter].height * SCALE_SPRITE;

		//
		targetRecangle.y = this.target.position.y;

		targetRecangle.width = this.target.animation.spritePosition[this.target.animation.counter].width * SCALE_SPRITE;
		targetRecangle.height = this.target.animation.spritePosition[this.target.animation.counter].height * SCALE_SPRITE;
		if (this.creator.rotation) {
			prjectileRectangle.x = this.projectilePosition.x * -1 + CANVAS_WIDTH + prjectileRectangle.width - CHARACTER_PADDING * 2.1;
		} else {
			prjectileRectangle.x = this.projectilePosition.x + prjectileRectangle.width - CHARACTER_PADDING * 2.1;
		}

		if (this.target.rotation) {
			targetRecangle.x = this.target.position.x * -1 + CANVAS_WIDTH - targetRecangle.width;
		} else {
			targetRecangle.x = this.target.position.x + targetRecangle.width - CHARACTER_PADDING * 2.1;
		}

		//checking Collision
		if (rectangularCollision(prjectileRectangle, targetRecangle, this.creator.rotation)) {
			return true;
		}
	}
}
