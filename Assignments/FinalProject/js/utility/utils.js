/**
 *
 * @param {Object} object Current State object of payers
 *
 * Resets all the state values to zero
 */
export function resetState(object) {
	for (let i in object) {
		object[i] = false;
	}
	return object;
}

/**
 *
 * @param {Integer} x X co-ordinate
 * @param {Integer} y Y co-ordinates
 *
 * Heght generation function when player jumps.
 */
export function jumpHeightChange(x, y) {
	let temp = Math.floor(x / 2);
	if (y < temp) {
		return x;
	} else {
		return -y - 2 * temp;
	}
}

/**
 *
 * @param {Object} rectangle1 First Rectangle Object
 * @param {Object} rectangle2 Second Rectange Object
 * @param {Boolean} rotation Weather the player is rotated or not
 *
 * Detects rectangular colision between two rectangles, takes into account if the rectangle has been mirrored
 */
export function rectangularCollision(rectangle1, rectangle2, rotation) {
	if (rotation) {
		if (
			rectangle1.x - rectangle1.width < rectangle2.x + rectangle2.width &&
			rectangle1.x - rectangle1.width > rectangle2.x - rectangle2.width &&
			rectangle1.y < rectangle2.y + rectangle2.height &&
			rectangle1.y + rectangle2.height > rectangle2.y
		) {
			return true;
		} else {
			return false;
		}
	} else {
		if (
			rectangle1.x < rectangle2.x + rectangle2.width &&
			rectangle1.x + rectangle1.width > rectangle2.x &&
			rectangle1.y < rectangle2.y + rectangle2.height &&
			rectangle1.y + rectangle2.height > rectangle2.y
		) {
			return true;
		} else {
			return false;
		}
	}
}
