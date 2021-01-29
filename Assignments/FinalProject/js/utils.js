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
