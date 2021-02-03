import { CANVAS_WIDTH, CANVAS_HEIGHT, SCALE_SPRITE, CHARACTER_SELECTION } from '../utility/constant.js';

import { sfLogo, ryu_potrait, ken_potrait, chun_potrait } from '../img/images.js';

export default function selection(ctx) {
	const text = {
		x: 400,
		y: 400,
	};

	ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	ctx.fillStyle = '#000050';
	ctx.fill();

	ctx.drawImage(
		sfLogo,
		CHARACTER_SELECTION.streetFighter.x,
		CHARACTER_SELECTION.streetFighter.y,
		CHARACTER_SELECTION.streetFighter.width * SCALE_SPRITE,
		CHARACTER_SELECTION.streetFighter.height * SCALE_SPRITE
	);

	ctx.drawImage(ryu_potrait, CHARACTER_SELECTION.ryu.x, CHARACTER_SELECTION.ryu.y, CHARACTER_SELECTION.ryu.width * 1.5, CHARACTER_SELECTION.ryu.height * 1.5);

	ctx.drawImage(ken_potrait, CHARACTER_SELECTION.ken.x, CHARACTER_SELECTION.ken.y, CHARACTER_SELECTION.ken.width * 1.5, CHARACTER_SELECTION.ken.height * 1.5);

	ctx.drawImage(
		chun_potrait,
		CHARACTER_SELECTION.chun.x,
		CHARACTER_SELECTION.chun.y,
		CHARACTER_SELECTION.chun.width * 1.5,
		CHARACTER_SELECTION.chun.height * 1.5
	);

	ctx.font = '500 35px Noto Sans JP';
	ctx.fillStyle = 'white';
	ctx.fillText('Select Your Character', text.x, text.y);
}
