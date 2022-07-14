import { AxisTuple } from "../types";

export default class Platform {
	height: number;
	image: HTMLImageElement;
	position: AxisTuple;
	width: number;

	constructor(position: AxisTuple, image: HTMLImageElement) {
		this.position = {
			x: position.x,
			y: position.y
		};

		this.image = image;
		this.width = image.width;
		this.height = image.height;
	}

	draw(context: CanvasRenderingContext2D) {
		context.drawImage(
			this.image,
			this.position.x,
			this.position.y
		);
	}
}