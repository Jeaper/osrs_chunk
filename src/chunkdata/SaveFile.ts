module osrs_chunk.data {

	interface FileType {
		// Unlocked
		u : Record<number, ChunkStatus>;
		// Notes
		n : Record<number, string>;
	}

	export enum ChunkStatus{
		LOCKED=0,
		UNLOCKED=1,
		POSSIBLE_OUTCOME=2,
	}

	export class SaveData {
		private _game : osrs_chunk.Game;
		public activeChunks : Record<number, ChunkStatus> = {};
		public chunkNotes : Record<number, string> = {};

		constructor(game : osrs_chunk.Game) {
			this._game = game;
			this.loadFile();
		}

		saveFile() {
			const file : FileType = {
				u : this.activeChunks,
				n : this.chunkNotes,
			};
			localStorage.setItem('saveFile', JSON.stringify(file));
		}

		loadFile() {

			try{
				const file : FileType = JSON.parse(localStorage.getItem('saveFile'));
				this.chunkNotes = file.n;
				this.activeChunks = file.u;
				console.log(file);
			}
			catch (e){
				console.log('No save file found in local storage, starting fresh.');
				this.chunkNotes = {};
				this.activeChunks = {};
			}

		}

		public getDefaultChunkId() : number {
			const activeChunkKeys = Object.keys(this.activeChunks);
			if (activeChunkKeys.length > 0) {
				return gameConfig.chunkIDs.getCenterChunk(activeChunkKeys);
			}
			else {
				//Lumbridge
				return 12850;
			}
		}
	}
}