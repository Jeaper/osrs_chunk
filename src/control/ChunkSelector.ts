///<reference path="../scene/SceneBuilder.ts"/>

/**
 * Created by jespe on 2019-02-14.
 */
module osrs_chunk.control {

	import SceneBuilder = osrs_chunk.view.SceneBuilder;
	import chunkIDs = osrs_chunk.gameConfig.chunkIDs;

	export class ChunkSelector {
		public selectedTile : number = -1;


		private readonly game;
		private selectorBorder : Phaser.Image;
		private selectedTileMapImage : Phaser.Image;

		constructor(game : osrs_chunk.Game) {
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

			this.game = game;

			this.selectorBorder = SceneBuilder.addImage('selectorBorder', 'border', undefined, this.game.scene.backGroundLayerOverlay);
			this.selectorBorder.width = this.selectorBorder.height = gameConfig.chunkSize * 1.1;
			this.selectorBorder.visible = false;
			this.selectorBorder.exists = false;


			this.selectedTileMapImage = SceneBuilder.addImage('selectedTileMapImage', 'chunks', 0, this.game.scene.backGroundLayerActive);
			this.selectedTileMapImage.visible = false;
			this.selectedTileMapImage.exists = false;

			const chunkMap = this.game.scene.chunkMap;
			chunkMap.inputEnabled = true;
			chunkMap.events.onInputDown.add(this.onBoardClick, this);


		}

		public selectTile : (chunkID : number) => void = (chunkID : number) => {
			console.log('No chunk selection action set.');
		}

		public highlightTile(chunkID : number) {
			this.selectedTile = chunkID;

			const pos = chunkIDs.getPositionFromChunkID(chunkID);

			const sprite = this.game.scene.chunkMap;

			const x = sprite.position.x - (sprite.anchor.x * sprite.width);
			const y = sprite.position.y - (sprite.anchor.y * sprite.height);

			const imagePos = new Phaser.Point(
				x + (gameConfig.chunkSize * (pos.x + 0.5)),
				y + (gameConfig.chunkSize * (pos.y + 0.5)),
			);
			this.selectorBorder.position.x = imagePos.x;
			this.selectorBorder.position.y = imagePos.y;
			this.selectorBorder.visible = true;
			this.selectorBorder.exists = true;

			this.selectedTileMapImage.position.x = imagePos.x;
			this.selectedTileMapImage.position.y = imagePos.y;
			this.selectedTileMapImage.frame = chunkIDs.getSpriteIndexFromChunkID(chunkID);
			this.selectedTileMapImage.visible = true;
			this.selectedTileMapImage.exists = true;
		}

		public deselectTile() {
			this.selectedTileMapImage.visible = false;
			this.selectedTileMapImage.exists = false;
			this.selectorBorder.visible = false;
			this.selectorBorder.exists = false;
			this.selectedTile = -1;

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
			this.selectTile(chunkIDs.getChunkIDFromPosition(pos));

		}
	}
}
