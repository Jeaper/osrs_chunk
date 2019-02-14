///<reference path="../libs/phaser/phaser.d.ts"/>

module osrs_chunk {
	export class PreloaderState extends Phaser.State {

		/**
		 * Preload game assets here.
		 */
		public preload() : void {
			this.game.load.image('border', 'assets/images/Border.png');
			this.game.load.spritesheet('chunks', 'assets/images/chunkmapPowerOf2.png', gameConfig.chunkSize, gameConfig.chunkSize);

		}

		/**
		 * Move into the game state here.
		 */
		public create() : void {
			this.game.state.start('Game');
		}
	}
}
