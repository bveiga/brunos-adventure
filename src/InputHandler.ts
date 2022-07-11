export default class InputHandler {
	keys: Set<string>;

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