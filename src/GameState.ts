///<reference path="../libs/phaser/phaser.d.ts"/>

module osrs_chunk {

	import SceneBuilder = osrs_chunk.view.SceneBuilder;
	import SceneLayoutManager = osrs_chunk.view.SceneLayoutManager;
	import KeyCode = Phaser.KeyCode;
	export class GlobalVar {

	}

	export class GameState extends Phaser.State {

		/**
		 * Build the scene here, and setup the game flow, hook up the gui etc.
		 * Then just make it playable!
		 */
		public create() : void {
			console.log('Game is running!');
			// Init
			const game = this.game = window['game'] as osrs_chunk.Game;

			const sceneBuilder = new SceneBuilder(game);
			game.scene = sceneBuilder.buildScene();
			const sceneLayoutManager = new SceneLayoutManager(game);

			

			// Draw background
		}// create()

		public update() : void {
			// const game = this.game as osrs_chunk.Game;
			//
			//
			// const speed = 1.2;
			// const movementSpeed = speed * game.time.physicsElapsedMS;
			// if (game.input.keyboard.isDown(KeyCode.UP) || game.input.keyboard.isDown(KeyCode.W)) {
			// 	game.scene.cameraRoot.y += movementSpeed;
			// }
			// else if (game.input.keyboard.isDown(KeyCode.DOWN) || game.input.keyboard.isDown(KeyCode.S)) {
			// 	game.scene.cameraRoot.y -= movementSpeed;
			// }
			//
			// if (game.input.keyboard.isDown(KeyCode.LEFT) || game.input.keyboard.isDown(KeyCode.A)) {
			// 	game.scene.cameraRoot.x += movementSpeed;
			// }
			// else if (game.input.keyboard.isDown(KeyCode.RIGHT) || game.input.keyboard.isDown(KeyCode.D)) {
			// 	game.scene.cameraRoot.x -= movementSpeed;
			// }

		}

	}


}// osrs_chunk

