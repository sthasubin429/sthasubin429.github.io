export default function RoundScore(ctx, wins, rotation) {
	let p1x = 158;
	let p2x = 1015;
	let y = 87;
	let radius = 6;
	let padding = 20;

	if (rotation) {
		if (wins === 1) {
			ctx.beginPath();
			ctx.arc(p1x, y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = 'green';
			ctx.fill();
		} else {
			ctx.beginPath();
			ctx.arc(p1x, y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = 'red';
			ctx.fill();
		}

		ctx.beginPath();
		ctx.arc(p1x + padding, y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'red';
		ctx.fill();
	} else {
		if (wins === 1) {
			ctx.beginPath();
			ctx.arc(p2x, y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = 'green';
			ctx.fill();
		} else {
			ctx.beginPath();
			ctx.arc(p2x, y, radius, 0, 2 * Math.PI);
			ctx.fillStyle = 'red';
			ctx.fill();
		}

		ctx.beginPath();
		ctx.arc(p2x - padding, y, radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'red';
		ctx.fill();
	}
}
