/**
 * Created by jespe on 2019-02-14.
 */
module osrs_chunk.control {
	import SceneBuilder = osrs_chunk.view.SceneBuilder;
	import chunkIDs = osrs_chunk.gameConfig.chunkIDs;
	export class ChunkSelector {

		private readonly game;

		private selectedTile : number;


		constructor(game : osrs_chunk.Game) {
			this.game = game;

			const chunkMap = this.game.scene.chunkMap;
			chunkMap.inputEnabled = true;
			chunkMap.events.onInputDown.add(this.onBoardClick, this);

			window['printChunks'] = () => {
				const border = '-------------';
				console.log(border);
				const point = new Phaser.Point(0, 0);
				for (let i = 0; i < 10; i++) {
					point.x = point.y = i;
					console.log(point);
					const spriteIndex = gameConfig.chunkIDs.getSpriteIndexFromPosition(point);
					console.log('spriteIndex : ' + spriteIndex);
					const chunkID = gameConfig.chunkIDs.getChunkIDFromSpriteIndex(spriteIndex);
					console.log('chunkID : ' + chunkID);
					console.log(gameConfig.chunkIDs.getPositionFromChunkID(chunkID));
					console.log(border);
				}
			};
		}

		public selectTile : (chunkID : number) => void = (chunkID : number) => {
			console.log('No chunk selection action set.');
		}

		public selectTileByTilePos(chunkID : number) {
			const pos = gameConfig.chunkIDs.getPositionFromChunkID(chunkID);
			const widthInTiles : number = Math.floor(this.game.scene.chunkMap.texture.width / gameConfig.chunkSize);
			const heightInTiles : number = Math.floor(this.game.scene.chunkMap.texture.height / gameConfig.chunkSize);
			const tileSpriteIndex = (pos.y * widthInTiles) + pos.x;

			this.selectedTile = chunkID;

			const sprite = this.game.scene.chunkMap;
			const x = sprite.position.x - (sprite.anchor.x * sprite.width);
			const y = sprite.position.y - (sprite.anchor.y * sprite.height);

			const graphics = this.game.add.graphics(x + (gameConfig.chunkSize * pos.x), y + (gameConfig.chunkSize * pos.y));
			this.game.scene.backGroundLayer.add(graphics);

			graphics.beginFill(0x4CBB17, 0.6);
			graphics.drawRect(
				0,
				0,
				gameConfig.chunkSize,
				gameConfig.chunkSize,
			);
			graphics.endFill();
		}


		private onBoardClick(sprite : Phaser.Sprite, pointer : Phaser.Pointer) {
			const x = sprite.worldPosition.x - (sprite.anchor.x * sprite.width);
			const y = sprite.worldPosition.y - (sprite.anchor.y * sprite.height);

			const onImageY = (pointer.y - y);
			const onImageX = (pointer.x - x);
			const frameWidth = gameConfig.chunkSize * sprite.worldScale.x;
			const row = Math.floor((onImageY / frameWidth));
			const column = Math.floor((onImageX / frameWidth));

			const pos = new Phaser.Point(column, row);
			this.selectTile(gameConfig.chunkIDs.getChunkIDFromPosition(pos));

		}
	}
}
