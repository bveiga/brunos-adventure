import GameEngine from './GameEngine';

let gameEngine = new GameEngine();

function animate() {
	requestAnimationFrame(animate);
	gameEngine.context?.clearRect(0, 0, gameEngine.canvas.width, gameEngine.canvas.height);

	gameEngine.player.draw(gameEngine.context);
	gameEngine.player.update();
	gameEngine.handleInput();

	// this.platforms.forEach((platform) => {
		gameEngine.platform.draw(gameEngine.context);
		gameEngine.playerCollision(gameEngine.platform);
	// });
}
animate();