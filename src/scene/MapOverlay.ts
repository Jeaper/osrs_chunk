/**
 * Created by jespe on 2019-02-14.
 */
module osrs_chunk.view {
	import MapOf = osrs_chunk.utils.collections.MapOf;
	export class MapOverlay {

		public activeChunks : number[];

		private chunkImages : MapOf<Phaser.Image>;

		private readonly game;

		constructor(game : osrs_chunk.Game) {
			this.game = game;
			this.activeChunks = [];
			this.chunkImages = {};
		}

		public toggleChunk(chunkID : number) {
			if (this.chunkImages[chunkID] === undefined) {
				this.activateChunk(chunkID);
			}
			else {
				this.deActivateChunk(chunkID);
			}
		}

		public activateChunk(chunkID : number) {
			if (this.chunkImages[chunkID] === undefined) {
				const imagePos = this.game.scene.chunkSelector.getSpritePosition(chunkID);
				this.chunkImages[chunkID] = SceneBuilder.addImage(
					`ActiveChunk_${chunkID}`,
					'chunks',
					gameConfig.chunkIDs.getSpriteIndexFromChunkID(chunkID),
					this.game.scene.backGroundLayerActive,
					imagePos.x,
					imagePos.y
				);
			}
		}

		public deActivateChunk(chunkID : number) {
			if (this.chunkImages[chunkID] !== undefined) {
				this.chunkImages[chunkID].destroy();
				this.chunkImages[chunkID] = undefined;
			}
			delete this.chunkImages[chunkID];
		}
	}
}
