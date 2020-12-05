/**
 * Created by jespe on 2019-02-13.
 */
module osrs_chunk.view {
	import game = PIXI.game;
	export class Menu {

		public menuLayer : Phaser.Group;
		private readonly game;
		private selectedTileImage : Phaser.Image;

		public readonly menuWidth:number = 200;

		constructor(game : osrs_chunk.Game) {
			this.game = game;
			const gameWidth = gameConfig.gameSize.width;
			const gameHeight = gameConfig.gameSize.height;

			this.menuWidth = gameWidth * (1 - gameConfig.mapAreaScale);
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
				this.menuWidth,
				gameHeight,
			);
			graphics.endFill();

			this.selectedTileImage = SceneBuilder.addImage('chunkMap', 'chunks', 48, this.menuLayer, 0, 0);
			this.selectedTileImage.anchor.set(0, 0);

			const chunkSelector = this.game.scene.chunkSelector;
			chunkSelector.selectTile = (chunkID : number) => {
				if (chunkSelector.selectedTile !== chunkID) {
					this.selectedTileImage.frame = gameConfig.chunkIDs.getSpriteIndexFromChunkID(chunkID);
					this.selectedTileImage.visible = true;
					this.selectedTileImage.exists = true;
					chunkSelector.highlightTile(chunkID);
				}
				else {
					this.selectedTileImage.visible = false;
					this.selectedTileImage.exists = false;
					chunkSelector.deselectTile();
				}
			};

			this.addUnlockButton();
		}


		private addUnlockButton() {
			const button = this.game.add.button(this.menuWidth/2, 170, 'border', () => {
				this.game.scene.mapOverlay.toggleChunk(this.game.scene.chunkSelector.selectedTile);
			}, this, 2, 1, 0, undefined, this.menuLayer);
			button.anchor.set(0.5,0);
			button.width = this.menuWidth/2;
			button.height = 50;


		}


	}
}
