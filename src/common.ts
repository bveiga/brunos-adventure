export async function loadImage(imageSrc: string) {
	let image = new Image();
	image.src = imageSrc;

	try {
		await image.decode();
	} catch {
		console.log('Error 001: Error decoding image.');
	}
	return image;
};

export async function loadMultipleImages(imageSources: string[]) {
	let images: HTMLImageElement[] = [];
	for(let src of imageSources) {
		let image = await loadImage(src);
		images.push(image);
	}

	return images;
};