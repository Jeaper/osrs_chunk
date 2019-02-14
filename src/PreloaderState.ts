///<reference path="../libs/phaser/phaser.d.ts"/>

module osrs_chunk {
	export class PreloaderState extends Phaser.State {

		/**
		 * Preload game assets here.
		 */
		public preload() : void {
			// this.game.load.image('spinButtonImage', 'assets/sprites/Button.png');
			// this.game.load.image('chunkMap', 'assets/images/chunkmapPowerOf2.png');
			this.game.load.spritesheet('chunks', 'assets/images/chunkmapPowerOf2.png', gameConfig.chunkSize, gameConfig.chunkSize);
			// this.game.load.spritesheet('chunks', 'assets/images/chunkmapPowerOf2Numbered.png', gameConfig.chunkSize, gameConfig.chunkSize, undefined, 1, undefined);
			// this.game.load.spritesheet('chunks', 'assets/images/chunkmapNonPadded.png', gameConfig.chunkSize, gameConfig.chunkSize, undefined, 1, undefined);
			// this.game.load.image('chunkMap', 'assets/images/chunkmapPowerOf2.png');
			// this.game.load.image('chunkMap1', 'assets/images/chunkmapPowerOf2_1.png',);
			// this.game.load.image('chunkMap2', 'assets/images/chunkmapPowerOf2_2.png',);
		}

		/**
		 * Move into the game state here.
		 */
		public create() : void {
			this.game.state.start('Game');
		}
	}
}
