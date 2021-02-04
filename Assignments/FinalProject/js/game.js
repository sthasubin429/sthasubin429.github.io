import { CANVAS_WIDTH, CANVAS_HEIGHT } from './utility/constant.js';
import { ENTER, SELECTION_POSITION, CHARACTER_SELECTION, SCALE_SPRITE } from './utility/constant.js';

import Stage from './components/stage.js';

import Ryu from './characters/Ryu/ryu.js';
import Ken from './characters/Ken/ken.js';
import Chun from './characters/Chun/Chun.js';

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
import selection from './components/select.js';
import RoundScore from './components/score.js';

import { resetState } from './utility/utils.js';

import { loadScreen, KO, p1Select, p2Select } from './img/images.js';

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

		this.isStart = true;

		this.gameAnimationId;

		this.gameComplete = false;

		this.player1Selction = {
			index: 0,
			isSelected: false,
			wins: 0,
		};

		this.player2Selction = {
			index: 2,
			isSelected: false,
			wins: 0,
		};

		//function binding
		this.gameLoop = this.gameLoop.bind(this);

		this.keyDownHandler = this.keyDownHandler.bind(this);
		this.keyUpHandler = this.keyUpHandler.bind(this);

		this.playGame = this.playGame.bind(this);
		this.selectCharacter = this.selectCharacter.bind(this);

		this.restGame = this.restGame.bind(this);
		this.gameOver = this.gameOver.bind(this);

		this.addCharacterSelection = this.addCharacterSelection.bind(this);
		this.createPlayer = this.createPlayer.bind(this);

		this.drawScore = this.drawScore.bind(this);
		this.roundOver = this.roundOver.bind(this);

		this.selectKeyDown = this.selectKeyDown.bind(this);
		this.startKeyDown = this.startKeyDown.bind(this);
		this.roundOverKeyDown = this.roundOverKeyDown.bind(this);
	}

	init() {
		if (this.isStart) {
			this.isStart = false;
			this.ctx.drawImage(loadScreen, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

			this.ctx.font = '500 30px Noto Sans JP';
			this.ctx.fillStyle = 'white';
			this.ctx.fillText('Press Enter To Start', 500, 390);

			document.addEventListener('keydown', this.startKeyDown);
		} else {
			this.selectCharacter();
		}
	}

	playGame() {
		document.removeEventListener('keydown', this.selectKeyDown);

		document.removeEventListener('keydown', this.roundOverKeyDown);

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.stage = new Stage(this.ctx);
		this.stage.init();

		this.createPlayer();

		this.gameLoop();

		document.addEventListener('keydown', this.keyDownHandler);
		document.addEventListener('keyup', this.keyUpHandler);
	}

	gameLoop() {
		this.frameCount++;

		this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		this.stage.init();

		this.player1.updatePlayer(this.player2, this.frameCount);
		this.player1.drawPlayer(this.frameCount, this.player2);

		this.player2.updatePlayer(this.player1, this.frameCount);
		this.player2.drawPlayer(this.frameCount, this.player1);

		this.timer.updateTime(this.frameCount);

		this.drawScore();

		if (this.timer.checkTime()) {
			cancelAnimationFrame(this.gameAnimationId);
			this.roundOver();
			return;
		}

		if (this.player1.isDead() || this.player2.isDead()) {
			cancelAnimationFrame(this.gameAnimationId);

			if (this.player1.isDead()) {
				this.player1Selction.wins++;
			} else if (this.player2.isDead()) {
				this.player2Selction.wins++;
			}

			if (this.player1Selction.wins > 1 || this.player2Selction.wins > 1) {
				this.gameOver();
				return;
			} else {
				this.roundOver();
				return;
			}
		}

		this.gameAnimationId = requestAnimationFrame(this.gameLoop);
	}

	drawScore() {
		RoundScore(this.ctx, this.player1Selction.wins, false);
		RoundScore(this.ctx, this.player2Selction.wins, true);
	}

	roundOver() {
		this.ctx.drawImage(KO, CANVAS_WIDTH / 4, CANVAS_HEIGHT / 4, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		this.restGame();

		this.ctx.font = '500 30px Noto Sans JP';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText('Round Over, Enter Start Round', 550, 390);
		this.ctx.textAlign = 'center';

		document.addEventListener('keydown', this.roundOverKeyDown);
	}

	gameOver() {
		this.ctx.drawImage(KO, CANVAS_WIDTH / 4, CANVAS_HEIGHT / 4, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		this.restGame();

		this.ctx.font = '500 30px Noto Sans JP';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText('Game Over, Enter To Restart', 550, 390);
		this.ctx.textAlign = 'center';

		this.player1Selction = {
			index: 0,
			isSelected: false,
			wins: 0,
		};

		this.player2Selction = {
			index: 2,
			isSelected: false,
			wins: 0,
		};

		document.addEventListener('keydown', this.startKeyDown);
	}

	restGame() {
		this.frameCount = 0;
		this.gameAnimationId = 0;

		this.timer = new Time(this.ctx);
		this.timer.currentTime = 0;

		this.gameAnimationId = 0;
	}

	createPlayer() {
		if (this.player1Selction.index === 0) {
			this.player1 = new Ryu(this.ctx, false);
		} else if (this.player1Selction.index === 1) {
			this.player1 = new Ken(this.ctx, false);
		} else if (this.player1Selction.index === 2) {
			this.player1 = new Chun(this.ctx, false);
		}

		if (this.player2Selction.index === 0) {
			this.player2 = new Ryu(this.ctx, true);
		} else if (this.player2Selction.index === 1) {
			this.player2 = new Ken(this.ctx, true);
		} else if (this.player2Selction.index === 2) {
			this.player2 = new Chun(this.ctx, true);
		}
	}

	selectCharacter() {
		document.removeEventListener('keydown', this.startKeyDown);

		selection(this.ctx);

		this.addCharacterSelection();

		document.addEventListener('keydown', this.selectKeyDown);

		this.gameAnimationId = requestAnimationFrame(this.selectCharacter);
	}

	addCharacterSelection() {
		this.ctx.drawImage(
			p1Select,
			SELECTION_POSITION[this.player1Selction.index].x,
			SELECTION_POSITION[this.player1Selction.index].y,
			CHARACTER_SELECTION.ryu.width * SCALE_SPRITE,
			CHARACTER_SELECTION.ryu.height * SCALE_SPRITE
		);

		this.ctx.drawImage(
			p2Select,
			SELECTION_POSITION[this.player2Selction.index].x,
			SELECTION_POSITION[this.player2Selction.index].y,
			CHARACTER_SELECTION.ryu.width * SCALE_SPRITE,
			CHARACTER_SELECTION.ryu.height * SCALE_SPRITE
		);
	}

	roundOverKeyDown(event) {
		switch (event.keyCode) {
			case ENTER:
				this.playGame();
				break;
		}
	}
	startKeyDown(event) {
		switch (event.keyCode) {
			case ENTER:
				this.selectCharacter();
				break;
		}
	}

	selectKeyDown(event) {
		switch (event.keyCode) {
			case ENTER:
				cancelAnimationFrame(this.gameAnimationId);

				this.playGame();

				break;

			case PLAYER1_RIGHT:
				if (this.player1Selction.index === SELECTION_POSITION.length - 1) {
					this.player1Selction.index = 0;
				} else {
					this.player1Selction.index++;
				}

				break;

			case PLAYER1_LEFT:
				if (this.player1Selction.index === 0) {
					this.player1Selction.index = SELECTION_POSITION.length - 1;
				} else {
					this.player1Selction.index--;
				}

				break;

			case PLAYER2_RIGHT:
				if (this.player2Selction.index === SELECTION_POSITION.length - 1) {
					this.player2Selction.index = 0;
				} else {
					this.player2Selction.index++;
				}

				break;

			case PLAYER2_LEFT:
				if (this.player2Selction.index === 0) {
					this.player2Selction.index = SELECTION_POSITION.length - 1;
				} else {
					this.player2Selction.index--;
				}

				break;
		}
	}

	keyDownHandler(event) {
		if (this.player1.keyListener) {
			this.player1.animationComplete = false;
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
					this.player1.currentState.isMovingLeft = true;
					break;
				case PLAYER1_RIGHT:
					this.player1.currentState.isMovingRight = true;
					break;
				case PLAYER1_UP:
					this.player1.currentState.isJumping = true;
					break;
				case PLAYER1_DOWN:
					this.player1.currentState.isCrouching = true;
					break;
			}
		}
		if (this.player2.keyListener) {
			this.player2.animationComplete = false;
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
					this.player2.currentState.isMovingLeft = true;
					break;
				case PLAYER2_RIGHT:
					this.player2.currentState.isMovingRight = true;
					break;
				case PLAYER2_UP:
					this.player2.currentState.isJumping = true;
					break;
				case PLAYER2_DOWN:
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
