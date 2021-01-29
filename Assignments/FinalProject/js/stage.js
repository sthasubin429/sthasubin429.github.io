class Stage {
	constructor(ctx) {
		this.ctx = ctx;
	}

	init() {
		// this.ctx.scale(-1, 1);

		this.ctx.drawImage(stage1, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}
