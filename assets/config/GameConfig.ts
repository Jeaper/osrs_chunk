///<reference path="../../src/scene/SceneBuilder.ts"/>
/**
 * Created by jespe on 2019-02-13.
 */

module osrs_chunk.gameConfig {
	import SceneBuilder = osrs_chunk.view.SceneBuilder;
	export const gameSize = {
		width : 1280,
		height : 720,
	};

	export const mapAreaScale = 0.8;
	export const chunkSize = 156;

	export const chunks = {
		width : 43,
		height : 25,
	};
	export const KNOWN_LOCATIONS ={
		LUMBRIDGE : 12850,
		GRAND_EXCHANGE : 12598
	}
	/**
	 * starting at top left 4671, 256 for each x,  -1 for each y cool
	 */
	export const chunkIDs = {
		topLeft : 4671,
		topRight : 15422,
		xIncrease : 256,
		yIncrease : -1,

		getChunkIDFromSpriteIndex : (spriteIndex : number) => {
			const pos = chunkIDs.getPositionFromSpriteIndex(spriteIndex);

			return chunkIDs.getChunkIDFromPosition(pos);
		},

		getChunkIDFromPosition(pos : Phaser.Point) {
			return (chunkIDs.topLeft + (chunkIDs.yIncrease * pos.y) + (chunkIDs.xIncrease * pos.x));
		},

		getSpriteIndexFromChunkID : (chunkID : number) => {
			return chunkIDs.getSpriteIndexFromPosition(chunkIDs.getPositionFromChunkID(chunkID));
		},

		getSpriteIndexFromPosition : (pos : Phaser.Point) => {
			const widthInTiles : number = Math.floor(SceneBuilder.game.scene.chunkMap.texture.width / gameConfig.chunkSize);
			return (pos.y * widthInTiles) + pos.x;
		},

		getPositionFromSpriteIndex : (spriteIndex : number) => {
			const widthInTiles : number = Math.floor(SceneBuilder.game.scene.chunkMap.texture.width / gameConfig.chunkSize);

			return new Phaser.Point(Math.floor(spriteIndex / widthInTiles), spriteIndex % widthInTiles);
		},

		getPositionFromChunkID : (chunkID : number) => {
			chunkID -= (chunkIDs.topLeft);

			const widthInIDs = chunkID / chunkIDs.xIncrease;
			let x = Math.floor((chunkID) / chunkIDs.xIncrease);
			let y = ((((widthInIDs) - Math.floor(widthInIDs))) * chunkIDs.xIncrease);
			if (y > 0) {
				y = chunkIDs.xIncrease - y;
			}
			if (chunkID > 0) {
				x += 1;
			}
			return new Phaser.Point(x, y);
		},


		getCenterChunk:(chunkIds : (number | string)[])=>{
			const centerPositionOfTiles = {x:0,y:0};
			chunkIds.forEach((chunkId)=>{
				const position = gameConfig.chunkIDs.getPositionFromChunkID(Number(chunkId));
				centerPositionOfTiles.x+=position.x;
				centerPositionOfTiles.y+=position.y;
			});
			centerPositionOfTiles.x /= chunkIds.length;
			centerPositionOfTiles.y /= chunkIds.length;

			let centerChunk = {
				chunkId:0,
				delta: 999999
			};
			chunkIds.forEach((chunkId)=>{
				const position = gameConfig.chunkIDs.getPositionFromChunkID(Number(chunkId));
				// Math.
				const delta = Math.abs(centerPositionOfTiles.x-position.x) + Math.abs(centerPositionOfTiles.y-position.y);
				if (delta < centerChunk.delta){
					centerChunk.delta = delta;
					centerChunk.chunkId = Number(chunkId);
				}
			});

			return Number(centerChunk.chunkId);
		}
	};
}
