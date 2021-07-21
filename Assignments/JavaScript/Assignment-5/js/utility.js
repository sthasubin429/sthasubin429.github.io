/**
 *
 * @param {Int} min Minimum Integer Value
 * @param {Int} max Maxmium Integer Value
 */
const getRndInteger = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};
