/**
 * Created by jespe on 2019-02-13.
 */
import KeyCode = Phaser.KeyCode;

module osrs_chunk.control {

	export class MovableCamera {
		private game : osrs_chunk.Game;
		private cameraRoot : Phaser.Group;

		constructor(game : osrs_chunk.Game, cameraRoot : Phaser.Group) {
			this.game = game;
			this.cameraRoot = cameraRoot;
			const dummyTarget = { dummy : 0 };
			TweenMax.fromTo(dummyTarget, 1, {
				dummy : 0,
			}, {
				dummy : 1,
				repeat : -1,
				yoyo : true,
				onUpdate : () => {
					this.update();
				}
			});
		}


		public getMapPositionOfChunk(chunkID : number) {
			// const pos = gameConfig.chunkIDs.getPositionFromChunkID(chunkID);
			const pos = this.game.scene.chunkSelector.getSpritePosition(chunkID);
			const centerSpritePos = {
				x : (gameConfig.gameSize.width / 2) * gameConfig.mapAreaScale,
				y : (gameConfig.gameSize.height / 2),
			};
			pos.x -= centerSpritePos.x;
			pos.y -= centerSpritePos.y;
			return new Phaser.Point(-pos.x, -pos.y);
		}

		public focusOnChunk(chunkID : number, moveTime : number = 0.5) {

			this.focusOnPosition(this.getMapPositionOfChunk(chunkID), moveTime);
		}

		public focusOnPosition(point : Phaser.Point, moveTime : number = 0.5) {
			TweenMax.to(this.cameraRoot.position, moveTime, {
				...point,
				ease : Linear.easeInOut
			});
			console.log(point);
		}


		public update() : void {
			const game = this.game as osrs_chunk.Game;

			const speed = 1.2;
			const movementSpeed = speed * game.time.physicsElapsedMS;
			if (game.input.keyboard.isDown(KeyCode.UP) || game.input.keyboard.isDown(KeyCode.W)) {
				this.cameraRoot.y += movementSpeed;
			}
			else if (game.input.keyboard.isDown(KeyCode.DOWN) || game.input.keyboard.isDown(KeyCode.S)) {
				this.cameraRoot.y -= movementSpeed;
			}

			if (game.input.keyboard.isDown(KeyCode.LEFT) || game.input.keyboard.isDown(KeyCode.A)) {
				this.cameraRoot.x += movementSpeed;
			}
			else if (game.input.keyboard.isDown(KeyCode.RIGHT) || game.input.keyboard.isDown(KeyCode.D)) {
				this.cameraRoot.x -= movementSpeed;
			}
		}

	}
}