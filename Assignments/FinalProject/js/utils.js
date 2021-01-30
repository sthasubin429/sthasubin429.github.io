//sets all the values in an object to false

function resetState(object) {
	for (let i in object) {
		object[i] = false;
	}
	return object;
}

function jumpHeightChange(x, y) {
	let temp = Math.floor(x / 2);
	if (y < temp) {
		return x;
	} else {
		return -y - 2 * temp;
	}
}

function rectangularCollision(rectangle1, rectangle2) {
	// var rectangle1 = { x: 5, y: 5, width: 50, height: 50 };
	// var rectangle2 = { x: 20, y: 10, width: 10, height: 10 };

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
