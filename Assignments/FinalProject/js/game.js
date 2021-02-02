import { CANVAS_WIDTH, CANVAS_HEIGHT } from './utility/constant.js';

import Stage from './components/stage.js';

import Ryu from './characters/Ryu/ryu.js';
import Ken from './characters/Ken/ken.js';

//for player 1
import { PLAYER1_LEFT, PLAYER1_RIGHT, PLAYER1_UP, PLAYER1_DOWN } from './utility/constant.js';
import { PLAYER1_LOW_PUNCH, PLAYER1_HEAVY_PUNCH, PLAYER1_MEDIUM_PUNCH } from './utility/constant.js';
import { PLAYER1_LOW_KICK, PLAYER1_MEDIUM_KICK, PLAYER1_HEAVY_KICK } from './utility/constant.js';
import { PLAYER1_SPECIAL_MOVE1 } from './utility/constant.js';

//for player 2
import { PLAYER2_LEFT, PLAYER2_RIGHT, PLAYER2_UP, PLAYER2_DOWN } from './utility/constant.js';
import { PLAYER2_LOW_PUNCH, PLAYER2_HEAVY_PUNCH, PLAYER2_MEDIUM_PUNCH } from './utility/constant.js';
import { PLAYER2_LOW_KICK, PLAYER2_MEDIUM_KICK, PLAYER2_HEAVY_KICK } from './utility/constant.js';
import { PLAYER2_SPECIAL_MOVE1 } from './utility/constant.js';

import Time from './components/Time.js';

import { resetState } from './utility/utils.js';

export default class Game {
	constructor(containerId, canvasId) {
		this.container = document.getElementById(containerId);
		this.canvas = document.getElementById(canvasId);

		this.ctx = this.canvas.getContext('2d');

		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;

		this.stage;

		this.frameCount = 0;
		this.isIdle = true;

		this.player1;
		this.player2;

		this.timer = new Time(this.ctx);

		//function binding
		this.gameLoop = this.gameLoop.bind(this);
		this.keyDownHandler = this.keyDownHandler.bind(this);
		this.keyUpHandler = this.keyUpHandler.bind(this);
	}

	init() {
		this.stage = new Stage(this.ctx);
		this.stage.init();

		this.player1 = new Ryu(this.ctx, false);
		this.player2 = new Ken(this.ctx, true);

		this.gameLoop();

		document.addEventListener('keydown', this.keyDownHandler);
		document.addEventListener('keyup', this.keyUpHandler);
	}
	gameLoop() {
		this.frameCount++;

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.stage.init();

		this.player1.updatePlayer(this.player2, this.frameCount);
		this.player1.drawPlayer(this.frameCount, this.player2);

		this.player2.updatePlayer(this.player1, this.frameCount);
		this.player2.drawPlayer(this.frameCount, this.player1);

		this.timer.updateTime(this.frameCount);

		requestAnimationFrame(this.gameLoop);
	}

	keyDownHandler(event) {
		if (this.player1.keyListener) {
			this.player1.animationComplete = false;
			// this.player1.animation.counter = 0;
			switch (event.keyCode) {
				case PLAYER1_SPECIAL_MOVE1:
					this.player1.currentState.specialMove1 = true;
					break;
				case PLAYER1_LOW_KICK:
					this.player1.currentState.lowKick = true;
					break;
				case PLAYER1_MEDIUM_KICK:
					this.player1.currentState.mediumKick = true;
					break;
				case PLAYER1_HEAVY_KICK:
					this.player1.currentState.heavyKick = true;
					break;
				case PLAYER1_LOW_PUNCH:
					this.player1.currentState.lowPunch = true;
					break;
				case PLAYER1_MEDIUM_PUNCH:
					this.player1.currentState.mediumPunch = true;
					break;
				case PLAYER1_HEAVY_PUNCH:
					this.player1.currentState.heavyPunch = true;
					break;
				case PLAYER1_LEFT:
					// console.log('left pressed');
					this.player1.currentState.isMovingLeft = true;
					break;
				case PLAYER1_RIGHT:
					// console.log('RIGHT pressed');
					this.player1.currentState.isMovingRight = true;
					break;
				case PLAYER1_UP:
					// console.log('UP pressed');
					this.player1.currentState.isJumping = true;
					break;
				case PLAYER1_DOWN:
					// console.log('Down pressed');
					this.player1.currentState.isCrouching = true;
					break;
			}
		}
		if (this.player2.keyListener) {
			this.player2.animationComplete = false;
			// this.player1.animation.counter = 0;
			switch (event.keyCode) {
				case PLAYER2_SPECIAL_MOVE1:
					this.player2.currentState.specialMove1 = true;
					break;
				case PLAYER2_LOW_KICK:
					this.player2.currentState.lowKick = true;
					break;
				case PLAYER2_MEDIUM_KICK:
					this.player2.currentState.mediumKick = true;
					break;
				case PLAYER2_HEAVY_KICK:
					this.player2.currentState.heavyKick = true;
					break;
				case PLAYER2_LOW_PUNCH:
					this.player2.currentState.lowPunch = true;
					break;
				case PLAYER2_MEDIUM_PUNCH:
					this.player2.currentState.mediumPunch = true;
					break;
				case PLAYER2_HEAVY_PUNCH:
					this.player2.currentState.heavyPunch = true;
					break;
				case PLAYER2_LEFT:
					// console.log('left pressed');
					this.player2.currentState.isMovingLeft = true;
					break;
				case PLAYER2_RIGHT:
					// console.log('RIGHT pressed');
					this.player2.currentState.isMovingRight = true;
					break;
				case PLAYER2_UP:
					// console.log('UP pressed');
					this.player2.currentState.isJumping = true;
					break;
				case PLAYER2_DOWN:
					// console.log('Down pressed');
					this.player2.currentState.isCrouching = true;
					break;
			}
		}
	}

	keyUpHandler(event) {
		if (this.player1.animationComplete) {
			this.player1.currentState = resetState(this.player1.currentState);
			this.player1.currentState.isIdle = true;
			this.player1.keyListener = true;
			this.player1.animationComplete = false;
		}
		if (this.player2.animationComplete) {
			this.player2.currentState = resetState(this.player2.currentState);
			this.player2.currentState.isIdle = true;
			this.player2.keyListener = true;
			this.player2.animationComplete = false;
		}
	}
}
