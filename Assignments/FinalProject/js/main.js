import Game from './game.js';
import { stage1, ryuSprite, kenSprite, chunSprite, loadScreen, KO, sfLogo, ryu_potrait, ken_potrait, chun_potrait, p1Select, p2Select } from './img/images.js';

let images = [stage1, ryuSprite, kenSprite, chunSprite, loadScreen, KO, sfLogo, ryu_potrait, ken_potrait, chun_potrait, p1Select, p2Select];
let imgCount = 0;
let img = [];

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

function startGame() {
	let game = new Game('container', 'game');
	game.init();
}

loadImages();
