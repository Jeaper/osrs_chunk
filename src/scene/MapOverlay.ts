/**
 * Created by jespe on 2019-02-14.
 */
module osrs_chunk.view {

	export class MapOverlay {

		public activeChunks : number[];

		private chunkImages : Record<string, Phaser.Image>;

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

		public getDefaultChunkId() : number {
			if (this.game.scene.mapOverlay.activeChunks.length > 0) {
				// Find center tile.
				return this.game.scene.activateChunks[0];
			}
			else {
				//Lumbridge
				return 12850;
			}
		}
	}
}
