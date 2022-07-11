window.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('game-canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	class InputHandler {
		constructor() {
			this.keys = new Set();
			window.addEventListener('keydown', (evt) => {
				switch(evt.key) {
					case 'ArrowDown':
					case 'ArrowUp':
					case 'ArrowLeft':
					case 'ArrowRight':
						this.keys.add(evt.key);
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
						this.keys.delete(evt.key);
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
			this.width = 30;
			this.height = 30;
			this.gravity = 1;

			this.position = {
				x: 100,
				y: 100
			};

			this.velocity = {
				x: 0,
				y: 1
			};

			// Image
			this.image = document.getElementById('player-image');
			this.frameX = 0;
			this.frameY = 0;
		}

		draw(context) {
			context.fillStyle = 'white';
			context.fillRect(this.position.x, this.position.y, this.width, this.height);
			context.drawImage(
				this.image,
				this.frameX * this.width,
				this.frameY * this.height,
				this.width,
				this.height,
				this.position.x,
				this.position.y,
				this.width,
				this.height
			);
		}

		update(input) {
			// Horizontal movement
			if (input.keys.has('ArrowRight')) {
				this.velocity.x = 5;
			} else if(input.keys.has('ArrowLeft')) {
				this.velocity.x = -5;
			} else {
				this.velocity.x = 0;
			}

			this.position.x += this.velocity.x;
			if(this.position.x < 0) {
				this.position.x = 0;
			} else if(this.position.x > this.gameWidth - this.width) {
				this.position.x = this.gameWidth - this.width;
			}

			// Vertical movement
			if(input.keys.has('ArrowUp') && !this.isInTheAir()) {
				this.velocity.y = -20;
			}

			this.position.y += this.velocity.y;
			if(this.isInTheAir()) {
				this.velocity.y += this.gravity;
			} else {
				this.velocity.y = 0;
			}

			if (this.position.y > this.gameHeight - this.height) {
				this.position.y = this.gameHeight - this.height;
			}
		}

		isInTheAir() {
			return this.position.y + this.height + this.velocity.y <= this.gameHeight;
		}
	}

	class Platform {
		constructor(gameWidth, gameHeight) {
			this.gameWidth = gameWidth;
			this.gameHeight = gameHeight;

			this.position = {
				x: 100,
				y: this.gameHeight - 100
			};

			this.width = 200;
			this.height = 20;
		}

		draw(context) {
			context.fillStyle = 'Blue';
			context.fillRect(
				this.position.x,
				this.position.y,
				this.width,
				this.height
			);
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
	const platform = new Platform(canvas.width, canvas.height);
	const background = new Background(canvas.width, canvas.height);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		platform.draw(ctx);

		// background.draw(ctx);
		// background.update();

		player.draw(ctx);
		player.update(input);

		requestAnimationFrame(animate);
	}
	animate();
});