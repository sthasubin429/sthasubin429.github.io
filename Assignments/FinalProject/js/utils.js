//sets all the values in an object to false
function resetState(object) {
   for (let i in object) {
      object[i] = false;
   }
   return object;
}
