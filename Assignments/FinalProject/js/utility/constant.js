export const CANVAS_WIDTH = 1176;
export const CANVAS_HEIGHT = 494;

//stage height
export const STAGE_HEIGHT = 50;

//Move Codes for Player 1
export const PLAYER1_LEFT = 65;
export const PLAYER1_RIGHT = 68;
export const PLAYER1_UP = 87;
export const PLAYER1_DOWN = 83;

//Attack Codes for Player 1
export const PLAYER1_LOW_PUNCH = 85;
export const PLAYER1_HEAVY_PUNCH = 79;
export const PLAYER1_MEDIUM_PUNCH = 73;

export const PLAYER1_LOW_KICK = 74;
export const PLAYER1_MEDIUM_KICK = 75;
export const PLAYER1_HEAVY_KICK = 76;

export const PLAYER1_SPECIAL_MOVE1 = 77;

//Move codes for player 2
export const PLAYER2_LEFT = 37;
export const PLAYER2_RIGHT = 39;
export const PLAYER2_UP = 38;
export const PLAYER2_DOWN = 40;

//Attack Codes for Player 2
export const PLAYER2_LOW_PUNCH = 103;
export const PLAYER2_MEDIUM_PUNCH = 104;
export const PLAYER2_HEAVY_PUNCH = 105;

export const PLAYER2_LOW_KICK = 100;
export const PLAYER2_MEDIUM_KICK = 101;
export const PLAYER2_HEAVY_KICK = 102;

export const PLAYER2_SPECIAL_MOVE1 = 97;

//move speed
export const MOVE_SPEED = 2;

export const SCALE_SPRITE = 2;

export const CHARACTER_PADDING = 30;

export const PROJECTILE_SPEED = 3;

//damage types
export const DAMAGE = 1;

//HIT TYPES
export const FACE_HIT = 'faceHit';
export const STOMACH_HIT = 'stomachHit';
export const NORMAL_HIT = 'normalHit';

//projectile States
export const STATE_START = 'start';
export const STATE_MOVE = 'move';
export const STATE_HIT = 'hit';

//healthbar position
export const PLAYER_HEALTHBAR = {
	width: 400,
	height: 30,
	x: 150,
	y: 20,
};

export const HEALTHBAR_PADDING = 3;

export const TIME_POSITION = {
	x: 590,
	y: 50,
};

export const PLAYER_MANABAR = {
	width: 400,
	height: 15,
	x: 150,
	y: 60,
};

export const MANABAR_PADDING = 2;
export const DEFAULT_MANA = 50;

//Game navigation key codes
export const ENTER = 13;

export const CHARACTER_SELECTION = {
	streetFighter: {
		width: 224,
		height: 123,
		x: 50,
		y: 30,
	},

	ryu: {
		width: 54,
		height: 93,
		x: 570,
		y: 165,
	},

	ken: {
		width: 54,
		height: 93,
		x: 770,
		y: 165,
	},

	chun: {
		width: 54,
		height: 93,
		x: 970,
		y: 165,
	},
};

//Positions of selector pointer
export const SELECTION_POSITION = [
	{ x: 560, y: 120 },
	{ x: 760, y: 120 },
	{ x: 960, y: 120 },
];
