import GameEngine from './modules/GameEngine';
import { loadImage, loadMultipleImages } from './common';
import { Assets } from './types';

import HillImageSrc from './images/hills.png';
import PlatformImageSrc from './images/platform.png';
import PlatformSmallImageSrc from "./images/platformSmallTall.png";
import BgImageSrc from './images/background.png';
import spriteRunLeftSrc from './images/spriteRunLeft.png';
import spriteRunRightSrc from './images/spriteRunRight.png';
import spriteStandLeftSrc from './images/spriteStandLeft.png';
import spriteStandRightSrc from './images/spriteStandRight.png';


let gameEngine: GameEngine;
function animate() {
	requestAnimationFrame(animate);
	gameEngine.context.fillStyle = 'white';
	gameEngine.context?.fillRect(0, 0, gameEngine.canvas.width, gameEngine.canvas.height);
	gameEngine.handleInput();

	// Drawing
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
		gameEngine.reset(true);
	}

	// Lose Condition
	if (gameEngine.player.position.y > gameEngine.canvas.height - gameEngine.player.height) {
		console.log('You Lose!');
		gameEngine.reset(true);
	}
}

async function loadAssets() {
	let gameAssets = {} as Assets;
	let playerSprites = [
		spriteRunLeftSrc,
		spriteRunRightSrc,
		spriteStandLeftSrc,
		spriteStandRightSrc
	];

	gameAssets.bgImage = await loadImage(BgImageSrc);
	gameAssets.platformImage = await loadImage(PlatformImageSrc);
	gameAssets.platformSmallImage = await loadImage(PlatformSmallImageSrc);
	gameAssets.hillsImage = await loadImage(HillImageSrc);
	gameAssets.playerSprites = await loadMultipleImages(playerSprites);

	return gameAssets;
}

async function init() {
	let gameAssets = await loadAssets();

	gameEngine = new GameEngine(gameAssets);
	animate();
}

init();