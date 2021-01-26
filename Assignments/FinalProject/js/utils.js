//sets all the values in an object to false
function resetState(object) {
   for (let i in object) {
      object[i] = false;
   }
   return object;
}
function jumpHeightChange(x) {
   let temp = Math.floor(x / 2);
   if (x < temp) {
      return x;
   } else {
      return -x - 2 * temp;
   }
}
