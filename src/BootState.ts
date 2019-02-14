///<reference path="../libs/phaser/phaser.d.ts"/>
///<reference path="scene/SceneBuilder.ts"/>
///<reference path="scene/SceneLayoutManager.ts"/>

module osrs_chunk {
	import SceneBuilder = osrs_chunk.view.SceneBuilder;
	import SceneLayoutManager = osrs_chunk.view.SceneLayoutManager;
	export class BootState extends Phaser.State {
		/**
		 * Preload resources that must be available early here.
		 */
		public preload() : void {

		}

		/**
		 * Setup device/environment specific settings here.
		 * Center the game etc.
		 */
		public create() : void {
			const game = this.game as osrs_chunk.Game;
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;


			game.state.start('Preload');
		}
	}
}
