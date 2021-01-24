function startGame() {
   // loadSprite();
   let game = new Game('container', 'game');
   game.init();
}

window.onload = startGame;
