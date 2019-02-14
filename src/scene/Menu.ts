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


			const chunkMap = this.game.scene.chunkMap;
			chunkMap.inputEnabled = true;
			chunkMap.events.onInputDown.add(this.onBoardClick, this);
		}


		public selectTileBySpriteIndex(tileIndex : number) {
			this.selectedTile = tileIndex;
			this.selectedTileImage.frame = tileIndex;
		}

		public selectTileByTileIndex(tileIndex : number) {

		}

		public selectTileByTilePos(pos : Phaser.Point) {
			const widthInTiles : number = Math.floor(this.game.scene.chunkMap.texture.width / gameConfig.chunkSize);
			const heightInTiles : number = Math.floor(this.game.scene.chunkMap.texture.height / gameConfig.chunkSize);
			const tileSpriteIndex = (pos.y * widthInTiles) + pos.x;

			this.selectTileBySpriteIndex(tileSpriteIndex);

			const sprite = this.game.scene.chunkMap;
			const x = sprite.position.x - (sprite.anchor.x * sprite.width);
			const y = sprite.position.y - (sprite.anchor.y * sprite.height);

			const graphics = this.game.add.graphics(x + (gameConfig.chunkSize * pos.x) , y + (gameConfig.chunkSize * pos.y) );
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
			// console.log(arguments);
			const game = this.game;
			console.log(sprite);
			const x = sprite.worldPosition.x - (sprite.anchor.x * sprite.width);
			const y = sprite.worldPosition.y - (sprite.anchor.y * sprite.height);
			const width = sprite.texture.width * sprite.worldScale.x;
			const height = sprite.texture.height * sprite.worldScale.y;

			const onImageY = (pointer.y - y);
			const onImageX = (pointer.x - x);
			const frameWidth = gameConfig.chunkSize * sprite.worldScale.x;
			const row = Math.floor((onImageY / frameWidth));
			const column = Math.floor((onImageX / frameWidth));
			// console.log(clickpos);
			console.log('----');
			console.log({onImageX, onImageY, row, column});
			// console.log({x : game.input.x, y : game.input.y});

			this.selectTileByTilePos(new Phaser.Point(column, row));


		}


	}
}
