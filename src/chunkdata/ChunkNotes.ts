/**
 * Created by jespe on 2019-02-14.
 */
module osrs_chunk.data {
	export class ChunkNotes {


		public inputBox : PhaserInput.InputBox;

		private readonly game : osrs_chunk.Game;

		constructor(game : osrs_chunk.Game) {
			this.game = game;
			this.game.add.plugin(PhaserInput.Plugin as any);

			const convertedGame = game as any;

			const borderWidth = 20;
			const input = convertedGame.add.inputField(borderWidth/2, 320, {
					font : '18px Arial',
					fill : '#212121',
					fontWeight : undefined,
					width : this.game.scene.menu.menuWidth-borderWidth*2,
					height : 300,
					padding : 8,
					borderWidth : 1,
					borderColor : '#000',
					borderRadius : 6,
					placeHolder : 'Notes',
					type : PhaserInput.InputType.text,
					maxLines : 10,
				},
				// this.game.scene.menu.menuLayer
			);
			input.focusOutOnEnter = false;
			// input.inputOptions.maxLines = false;
			this.game.scene.menu.menuLayer.add(input);

			this.inputBox = input;
		}

		public setNote(chunkID : number, notes : string) {
			this.game.saveData.chunkNotes[chunkID] = notes;
		}

		public getNote(chunkID : number) {
			if (this.game.saveData.chunkNotes[chunkID] !== undefined) {
				return this.game.saveData.chunkNotes[chunkID];
			}
			else {
				return '';
			}
		}
	}
}
