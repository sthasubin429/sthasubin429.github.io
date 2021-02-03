//sets all the values in an object to false

export function resetState(object) {
	for (let i in object) {
		object[i] = false;
	}
	return object;
}

export function jumpHeightChange(x, y) {
	let temp = Math.floor(x / 2);
	if (y < temp) {
		return x;
	} else {
		return -y - 2 * temp;
	}
}

export function rectangularCollision(rectangle1, rectangle2, rotation) {
	if (rotation) {
		// console.log(rectangle1, rectangle2);
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
