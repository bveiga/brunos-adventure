import GameEngine from './GameEngine';

let gameEngine = new GameEngine();

function animate() {
	requestAnimationFrame(animate);
	gameEngine.context?.clearRect(0, 0, gameEngine.canvas.width, gameEngine.canvas.height);

	gameEngine.player.draw(gameEngine.context);
	gameEngine.player.update();
	gameEngine.handleInput();

	gameEngine.platforms.forEach((platform) => {
		platform.draw(gameEngine.context);
		gameEngine.handleCollision(platform);
	});
}
animate();