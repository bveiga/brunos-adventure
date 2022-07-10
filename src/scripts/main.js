window.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('game-canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = 800;
	canvas.height = 720;

	class InputHandler {
		constructor() {
			this.keys = new Set();
			window.addEventListener('keydown', (evt) => {
				switch(evt.key) {
					case 'ArrowDown':
					case 'ArrowUp':
					case 'ArrowLeft':
					case 'ArrowRight':
						this.keys.add(evt.key)
					default:
						break;
				}
				console.log(evt.key, this.keys);
			});

			window.addEventListener('keyup', (evt) => {
				switch(evt.key) {
					case 'ArrowDown':
					case 'ArrowUp':
					case 'ArrowLeft':
					case 'ArrowRight':
						this.keys.delete(evt.key)
					default:
						break;
				}
				console.log(evt.key, this.keys);
			});
		}
	}

	class Player {
		constructor(gameWidth, gameHeight) {
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;

			// Positions
			this.width = 200;
			this.height = 200;
			this.x = 0;
			this.y = this.gameHeight - this.height;
			this.speed = 0;
			this.vy = 0;
			this.weight = 1;

			// Image
			this.image = document.getElementById('player-image');
			this.frameX = 0;
			this.frameY = 0;
		}

		draw(context) {
			context.fillStyle = 'white';
			context.fillRect(this.x, this.y, this.width, this.height);
			context.drawImage(
				this.image,
				this.frameX * this.width,
				this.frameY * this.height,
				this.width,
				this.height,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}

		update(input) {
			// Horizontal movement
			if (input.keys.has('ArrowRight')) {
				this.speed = 5;
			} else if(input.keys.has('ArrowLeft')) {
				this.speed = -5;
			} else {
				this.speed = 0;
			}

			this.x += this.speed;
			if(this.x < 0) {
				this.x = 0;
			} else if(this.x > this.gameWidth - this.width) {
				this.x = this.gameWidth - this.width;
			}

			// Vertical movement
			if(input.keys.has('ArrowUp') && this.onGround()) {
				this.vy = -30;
			}

			this.y += this.vy;
			if(!this.onGround()) {
				this.vy += this.weight;
			} else {
				this.vy = 0;
			}

			if (this.y > this.gameHeight - this.height) {
				this.y = this.gameHeight - this.height;
			}
		}

		onGround() {
			return this.y >= this.gameHeight - this.height;
		}
	}

	class Background {
		constructor(gameWidth, gameHeight) {
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;
			this.image = document.getElementById('bg-image');
			this.x = 0;
			this.y = 0;
			this.width = 2400;
			this.height = 720;
			this.speed = 5;
		}

		draw(context) {
			context.drawImage(this.image, this.x, this.y, this.width, this.height);
			context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
		}

		update() {
			this.x -= this.speed;
			if(this.x < 0 - this.width) this.x = 0;
		}
	}

	const input = new InputHandler();
	const player = new Player(canvas.width, canvas.height);
	const background = new Background(canvas.width, canvas.height);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		background.draw(ctx);
		background.update();
		player.draw(ctx);
		player.update(input);
		requestAnimationFrame(animate);
	}
	animate();
});