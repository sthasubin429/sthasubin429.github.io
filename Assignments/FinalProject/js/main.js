import Game from './game.js';

import { audioStart } from './audio/audio.js';

import { stage1, ryuSprite, kenSprite, chunSprite, loadScreen, KO, sfLogo, ryu_potrait, ken_potrait, chun_potrait, p1Select, p2Select } from './img/images.js';

let images = [stage1, ryuSprite, kenSprite, chunSprite, loadScreen, KO, sfLogo, ryu_potrait, ken_potrait, chun_potrait, p1Select, p2Select];

let imgCount = 0;

let img = [];

/**
 * Loades images, after the images are loaded, loads Sounds
 */
function loadImages() {
	images.forEach((image) => {
		image.onload = () => {
			imgCount++;
			if (imgCount === images.length) {
				startGame();
			}
		};
		img.push(image);
	});
}

/**
 * Starts the Game
 */
function startGame() {
	let game = new Game('container', 'game');
	game.init();
	audioStart.play();
}

loadImages();
