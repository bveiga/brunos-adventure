import { AxisTuple } from "./types";

export default class Platform {
	width: number;
	height: number;
	position: AxisTuple;

	constructor(position: AxisTuple) {
		this.position = {
			x: position.x,
			y: position.y
		};

		this.width = 300;
		this.height = 20;
	}

	draw(context: CanvasRenderingContext2D) {
		context.fillStyle = 'Blue';
		context.fillRect(
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
}