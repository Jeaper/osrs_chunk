/**
 * Created by jespe on 2019-02-13.
 */
import KeyCode = Phaser.KeyCode;

module osrs_chunk.control {

	export class MovableCamera {
		private game : osrs_chunk.Game;
		private cameraRoot : Phaser.Group;
		private position : {
			x:number,
			y:number
		}={x:0,y:0};
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

			const zoomAmount = 0.05;
			game.input.mouse.mouseWheelCallback=(event)=>{
				const zoom = ((event as any).wheelDelta /120) * zoomAmount;
				this.cameraRoot.scale.x += zoom;
				this.cameraRoot.scale.y += zoom;
				this.focusOnPosition(this.position,0);
			};

			this.setupPositionHandler(cameraRoot);
		}


		private setupPositionHandler(cameraRoot : Phaser.Group) {
			const valueHolder = {
				x : 0,
				y : 0
			};
			Object.defineProperties(this.position, {
				x : {
					get() : number {
						return valueHolder.x;
					},
					set(v : number) {
						valueHolder.x = v;
						cameraRoot.x = v * (1/ cameraRoot.scale.x);
					}
				},
				y : {
					get() : number {
						return valueHolder.y;
					},
					set(v : number) {
						valueHolder.y = v;
						cameraRoot.y = v *(1 / cameraRoot.scale.y);
					}
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

		public focusOnPosition(point : {x:number,y:number}, moveTime : number = 0.5) {
			TweenMax.to(this.position, moveTime, {
				...point,
				ease : Linear.easeInOut
			});
		}


		public update() : void {
			const game = this.game as osrs_chunk.Game;

			const speed = 1.2;
			const movementSpeed = speed * game.time.physicsElapsedMS;
			if (game.input.keyboard.isDown(KeyCode.UP) || game.input.keyboard.isDown(KeyCode.W)) {
				this.position.y += movementSpeed;
			}
			else if (game.input.keyboard.isDown(KeyCode.DOWN) || game.input.keyboard.isDown(KeyCode.S)) {
				this.position.y -= movementSpeed;
			}

			if (game.input.keyboard.isDown(KeyCode.LEFT) || game.input.keyboard.isDown(KeyCode.A)) {
				this.position.x += movementSpeed;
			}
			else if (game.input.keyboard.isDown(KeyCode.RIGHT) || game.input.keyboard.isDown(KeyCode.D)) {
				this.position.x -= movementSpeed;
			}


		}

	}
}