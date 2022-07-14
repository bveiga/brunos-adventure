import GameEngine from './modules/GameEngine';

let gameEngine = new GameEngine();

function animate() {
	requestAnimationFrame(animate);
	gameEngine.context.fillStyle = 'white';
	gameEngine.context?.fillRect(0, 0, gameEngine.canvas.width, gameEngine.canvas.height);
	gameEngine.handleInput();

	gameEngine.genericObjects.forEach((genericObject) => {
		genericObject.draw(gameEngine.context);
	});

	gameEngine.platforms.forEach((platform) => {
		platform.draw(gameEngine.context);
		gameEngine.handleCollision(platform);
	});

	gameEngine.player.draw(gameEngine.context);
	gameEngine.player.update();

	// Win Condition
	if(gameEngine.scrollOffset >= 4000) {
		console.log('You Win!');
		gameEngine.reset();
	}

	// Lose Condition
	if (gameEngine.player.position.y > gameEngine.canvas.height - gameEngine.player.height) {
		console.log('You Lose!');
		gameEngine.reset();
	}
}

async function init() {
	await gameEngine.reset();

	animate();
}

init();