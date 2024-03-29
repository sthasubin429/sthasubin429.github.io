export const KEN_WIDTH = 100;

export const KEN_HEIGHT = 250;

export const KEN_IDLE_ANIMATION_TIME = 10;

export const KEN_POSITON = {
	x: 300,
	y: 100,
};

export const KEN_HADUKEN_MANA = 45;

export const KEN_SPRITE_POSITION = {
	idle: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 43,
			height: 81,
			x: 55,
			y: 19,
		},
		{
			width: 43,
			height: 81,
			x: 105,
			y: 18,
		},
		{
			width: 43,
			height: 82,
			x: 154,
			y: 17,
		},
	],
	moveRight: [
		{
			width: 43,
			height: 75,
			x: 205,
			y: 24,
		},
		{
			width: 43,
			height: 80,
			x: 252,
			y: 19,
		},
		{
			width: 43,
			height: 81,
			x: 301,
			y: 18,
		},
		{
			width: 43,
			height: 80,
			x: 351,
			y: 19,
		},
		{
			width: 43,
			height: 80,
			x: 401,
			y: 19,
		},
	],
	moveLeft: [
		{
			width: 43,
			height: 75,
			x: 205,
			y: 24,
		},
		{
			width: 43,
			height: 80,
			x: 252,
			y: 19,
		},
		{
			width: 43,
			height: 81,
			x: 301,
			y: 18,
		},
		{
			width: 43,
			height: 80,
			x: 351,
			y: 19,
		},
		{
			width: 43,
			height: 80,
			x: 401,
			y: 19,
		},
	],
	jump: [
		{
			width: 43,
			height: 75,
			x: 452,
			y: 24,
		},
		{
			width: 43,
			height: 90,
			x: 498,
			y: 9,
		},
		{
			width: 36,
			height: 78,
			x: 540,
			y: 17,
		},
		{
			width: 36,
			height: 67,
			x: 579,
			y: 19,
		},
		{
			width: 36,
			height: 78,
			x: 616,
			y: 17,
		},
		{
			width: 36,
			height: 90,
			x: 656,
			y: 9,
		},
		{
			width: 43,
			height: 75,
			x: 696,
			y: 24,
		},
	],
	crouch: [
		// {
		//    width: 43,
		//    height: 75,
		//    x: 1113,
		//    y: 24,
		// },
		{
			width: 43,
			height: 55,
			x: 1160,
			y: 44,
		},
		{
			width: 43,
			height: 55,
			x: 1160,
			y: 44,
		},
		{
			width: 43,
			height: 55,
			x: 1160,
			y: 44,
		},
		{
			width: 43,
			height: 55,
			x: 1160,
			y: 44,
		},
		// {
		//    width: 43,
		//    height: 75,
		//    x: 1113,
		//    y: 24,
		// },
	],
	frontFlip: [
		{
			width: 43,
			height: 75,
			x: 747,
			y: 24,
		},
		{
			width: 34,
			height: 90,
			x: 795,
			y: 9,
		},
		{
			width: 61,
			height: 37,
			x: 835,
			y: 40,
		},
		{
			width: 31,
			height: 67,
			x: 902,
			y: 24,
		},
		{
			width: 72,
			height: 40,
			x: 942,
			y: 36,
		},
		{
			width: 43,
			height: 74,
			x: 1021,
			y: 25,
		},
		{
			width: 34,
			height: 90,
			x: 1070,
			y: 9,
		},
		{
			width: 43,
			height: 75,
			x: 747,
			y: 24,
		},
	],
	backFlip: [
		{
			width: 43,
			height: 75,
			x: 747,
			y: 24,
		},
		{
			width: 34,
			height: 90,
			x: 795,
			y: 9,
		},

		{
			width: 43,
			height: 74,
			x: 1021,
			y: 25,
		},
		{
			width: 72,
			height: 40,
			x: 942,
			y: 36,
		},
		{
			width: 31,
			height: 67,
			x: 902,
			y: 24,
		},

		{
			width: 61,
			height: 37,
			x: 835,
			y: 40,
		},

		{
			width: 34,
			height: 90,
			x: 1070,
			y: 9,
		},
		{
			width: 43,
			height: 75,
			x: 747,
			y: 24,
		},
	],
	standingBlock: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 43,
			height: 83,
			x: 1211,
			y: 16,
		},
		{
			width: 43,
			height: 83,
			x: 1211,
			y: 16,
		},
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
	],

	crouchingBlock: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 43,
			height: 61,
			x: 1260,
			y: 38,
		},
		{
			width: 43,
			height: 61,
			x: 1260,
			y: 38,
		},
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
	],
	lowPuch: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 43,
			height: 81,
			x: 3,
			y: 134,
		},
		{
			width: 57,
			height: 81,
			x: 52,
			y: 134,
		},
		{
			width: 43,
			height: 81,
			x: 117,
			y: 134,
		},
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
	],
	punch: [
		{
			width: 43,
			height: 81,
			x: 170,
			y: 134,
		},
		{
			width: 51,
			height: 85,
			x: 218,
			y: 130,
		},
		{
			width: 72,
			height: 85,
			x: 274,
			y: 130,
		},
		{
			width: 51,
			height: 85,
			x: 353,
			y: 130,
		},
		{
			width: 43,
			height: 81,
			x: 411,
			y: 134,
		},
	],
	forwardLowPunch: [
		{
			width: 43,
			height: 81,
			x: 170,
			y: 134,
		},
		{
			width: 47,
			height: 88,
			x: 512,
			y: 127,
		},
		{
			width: 47,
			height: 88,
			x: 512,
			y: 127,
		},
		{
			width: 43,
			height: 81,
			x: 170,
			y: 134,
		},
	],
	forwardMediumPuch: [
		{
			width: 43,
			height: 81,
			x: 616,
			y: 134,
		},
		{
			width: 50,
			height: 85,
			x: 665,
			y: 130,
		},
		{
			width: 61,
			height: 86,
			x: 719,
			y: 130,
		},
		{
			width: 47,
			height: 84,
			x: 786,
			y: 131,
		},
		{
			width: 61,
			height: 85,
			x: 839,
			y: 130,
		},
		{
			width: 49,
			height: 85,
			x: 906,
			y: 130,
		},
		{
			width: 43,
			height: 81,
			x: 961,
			y: 134,
		},
	],
	forwardHeavyPunch: [
		{
			width: 41,
			height: 85,
			x: 1012,
			y: 130,
		},
		{
			width: 60,
			height: 85,
			x: 1060,
			y: 129,
		},
		{
			width: 57,
			height: 103,
			x: 1125,
			y: 112,
		},
		{
			width: 60,
			height: 85,
			x: 1060,
			y: 129,
		},
		{
			width: 43,
			height: 81,
			x: 1253,
			y: 134,
		},
	],
	kick: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 49,
			height: 85,
			x: 6,
			y: 261,
		},
		{
			width: 67,
			height: 87,
			x: 62,
			y: 259,
		},
		{
			width: 49,
			height: 85,
			x: 135,
			y: 261,
		},
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
	],
	heavyKick: [
		{
			width: 43,
			height: 81,
			x: 195,
			y: 265,
		},
		{
			width: 55,
			height: 84,
			x: 245,
			y: 262,
		},
		{
			width: 69,
			height: 84,
			x: 306,
			y: 262,
		},
		{
			width: 58,
			height: 70,
			x: 382,
			y: 276,
		},
		{
			width: 43,
			height: 73,
			x: 448,
			y: 273,
		},
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
	],
	forwardLowKick: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 47,
			height: 84,
			x: 498,
			y: 262,
		},
		{
			width: 71,
			height: 82,
			x: 551,
			y: 264,
		},
		{
			width: 47,
			height: 84,
			x: 628,
			y: 262,
		},
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
	],
	forwardMediumKick: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 50,
			height: 81,
			x: 685,
			y: 265,
		},
		{
			width: 51,
			height: 83,
			x: 739,
			y: 263,
		},
		{
			width: 55,
			height: 92,
			x: 795,
			y: 254,
		},
		{
			width: 50,
			height: 83,
			x: 855,
			y: 263,
		},
		{
			width: 50,
			height: 81,
			x: 910,
			y: 265,
		},
	],
	forwardHeavyKick: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 47,
			height: 84,
			x: 969,
			y: 262,
		},
		{
			width: 79,
			height: 99,
			x: 1023,
			y: 248,
		},
		{
			width: 53,
			height: 109,
			x: 1107,
			y: 237,
		},
		{
			width: 79,
			height: 98,
			x: 1166,
			y: 248,
		},
		{
			width: 47,
			height: 84,
			x: 1251,
			y: 262,
		},
	],
	stomachHit: [
		{
			width: 43,
			height: 75,
			x: 5,
			y: 785,
		},
		{
			width: 47,
			height: 71,
			x: 53,
			y: 789,
		},
		{
			width: 49,
			height: 65,
			x: 106,
			y: 795,
		},
		{
			width: 43,
			height: 81,
			x: 163,
			y: 779,
		},
	],
	faceHit: [
		{
			width: 48,
			height: 78,
			x: 217,
			y: 782,
		},
		{
			width: 53,
			height: 77,
			x: 270,
			y: 782,
		},
		{
			width: 60,
			height: 83,
			x: 326,
			y: 777,
		},
		{
			width: 43,
			height: 81,
			x: 391,
			y: 779,
		},
	],
	normalHit: [
		{
			width: 43,
			height: 81,
			x: 6,
			y: 18,
		},
		{
			width: 51,
			height: 79,
			x: 1003,
			y: 781,
		},
		{
			width: 43,
			height: 81,
			x: 1060,
			y: 779,
		},
		{
			width: 43,
			height: 81,
			x: 1110,
			y: 779,
		},
	],

	haduken: [
		{
			width: 51,
			height: 82,
			x: 616,
			y: 532,
		},
		{
			width: 66,
			height: 76,
			x: 672,
			y: 538,
		},
		{
			width: 66,
			height: 73,
			x: 743,
			y: 541,
		},

		{
			width: 70,
			height: 70,
			x: 814,
			y: 544,
		},
		{
			width: 70,
			height: 70,
			x: 814,
			y: 544,
		},
	],
	projectileStart: [
		{
			width: 0,
			height: 0,
			x: 0,
			y: 0,
		},
		{
			width: 0,
			height: 0,
			x: 0,
			y: 0,
		},
		{
			width: 0,
			height: 0,
			x: 0,
			y: 0,
		},
		{
			width: 34,
			height: 48,
			x: 377,
			y: 642,
		},
		{
			width: 34,
			height: 48,
			x: 377,
			y: 642,
		},
	],

	projectileMove: [
		{
			width: 37,
			height: 28,
			x: 419,
			y: 652,
		},
		{
			width: 33,
			height: 24,
			x: 465,
			y: 646,
		},
		{
			width: 33,
			height: 23,
			x: 551,
			y: 646,
		},
	],
	projectileHit: [
		{
			width: 22,
			height: 26,
			x: 702,
			y: 653,
		},
		{
			width: 24,
			height: 30,
			x: 732,
			y: 651,
		},
		{
			width: 32,
			height: 52,
			x: 761,
			y: 639,
		},
		{
			width: 40,
			height: 46,
			x: 802,
			y: 643,
		},
	],
};
