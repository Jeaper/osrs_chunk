/**
 * Created by jespe on 2019-02-14.
 */
module osrs_chunk.data {
	export class ChunkNotes {

		public chunkNotes : Record<string,string>;
		public inputBox : PhaserInput.InputBox;

		private readonly game : osrs_chunk.Game;

		constructor(game : osrs_chunk.Game) {
			this.game = game;
			this.game.add.plugin(PhaserInput.Plugin as any);

			const convertedGame = game as any;

			const borderWidth = 20;
			const input = convertedGame.add.inputField(borderWidth/2, 250, {
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
			this.inputBox.events.onInputDown.add(()=>{
				console.log('aaaaaaah')
			});
		}

		public setNote(chunkID : number, notes : string) {
			this.chunkNotes[chunkID] = notes;
		}

		public getNote(chunkID : number) {
			if (this.chunkNotes[chunkID] !== undefined) {
				return this.chunkNotes[chunkID];
			}
			else {
				return '';
			}
		}
	}
}
