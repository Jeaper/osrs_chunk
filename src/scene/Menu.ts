/**
 * Created by jespe on 2019-02-13.
 */
module osrs_chunk.view {
	import game = PIXI.game;
	export class Menu {

		private menuLayer : Phaser.Group;
		private readonly game;

		private selectedTile : number;
		private selectedTileImage : Phaser.Image;

		constructor(game : osrs_chunk.Game) {
			this.game = game;
			const gameWidth = gameConfig.gameSize.width;
			const gameHeight = gameConfig.gameSize.height;
			// this.menuLayer = SceneBuilder.addGroup('menuLayer', game.scene.topRoot, -gameWidth / 2 , -gameHeight / 2);
			this.menuLayer = SceneBuilder.addGroup('menuLayer', game.scene.topRoot,
				(gameWidth * gameConfig.mapAreaScale) - (gameWidth / 2),
				-gameHeight / 2,
			);
			this.menuLayer.alpha = 0.7;
			const graphics = game.add.graphics(0, 0);
			this.menuLayer.add(graphics);
			graphics.beginFill(0xfffffff, 1);

			graphics.drawRect(
				0,
				0,
				gameWidth * (1 - gameConfig.mapAreaScale),
				gameHeight,
			);
			graphics.endFill();

			this.selectedTileImage = SceneBuilder.addImage('chunkMap', 'chunks', 48, this.menuLayer, 0, 0);
			this.selectedTileImage.anchor.set(0, 0);

			this.game.scene.chunkSelector.selectTile = (chunkID : number) => {
				this.selectedTileImage.frame = gameConfig.chunkIDs.getSpriteIndexFromChunkID(chunkID);
				this.game.scene.chunkSelector.selectTileByTilePos(chunkID);
			};
		}


		public selectTileBySpriteIndex(tileIndex : number) {
			this.selectedTileImage.frame = tileIndex;
		}

	}
}
