///<reference path="../libs/phaser/phaser.d.ts"/>
///<reference path="GameState.ts"/>
///<reference path="PreloaderState.ts"/>
///<reference path="scene/SceneLayoutManager.ts"/>
///<reference path="scene/SceneBuilder.ts"/>

module osrs_chunk {
	import PreloaderState = osrs_chunk.PreloaderState;
	import GameState = osrs_chunk.GameState;
	import SceneLayoutManager = osrs_chunk.view.SceneLayoutManager;
	import SceneBuilder = osrs_chunk.view.SceneBuilder;

	export function createGame() : void {
		const game = window['game'] = new osrs_chunk.Game() as osrs_chunk.Game;

	}

	export class Game extends Phaser.Game {

		public scene : osrs_chunk.view.Scene;

		constructor() {
			const config : Phaser.IGameConfig = {
				enableDebug : true,
				width : gameConfig.gameSize.width,
				height : gameConfig.gameSize.height,
				renderer : Phaser.WEBGL,
				parent : 'content',

			};
			super(config);


			this['clearBeforeRender'] = false; // Fix for iOS10 bug causing flicker.

			this.state.add('Boot', BootState, false);
			this.state.add('Preload', PreloaderState, false);
			this.state.add('Game', GameState, false);

			this.state.start('Boot');

			window['game'] = this;
		}
	}
}
