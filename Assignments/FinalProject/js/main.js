function startGame() {
   // loadSprite();
   var game = new Game('container', 'game');
   game.init();
}

window.onload = startGame;
