import InputHandler from './InputHandler';
import Platform from './Platform';
import Player from './Player';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;

// Set game dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);
const platform = new Platform(canvas.width, canvas.height);

// Game loop
function animate() {
	// Resets canvas
	ctx?.clearRect(0, 0, canvas.width, canvas.height);

	platform.draw(ctx);

	// background.draw(ctx);
	// background.update();

	player.draw(ctx);
	player.update(input);

	requestAnimationFrame(animate);
}
animate();
