/**
 * Created by Jeaper on 2019-02-12.
 */

module osrs_chunk.view {


	import ChunkSelector = osrs_chunk.control.ChunkSelector;
	import ChunkNotes = osrs_chunk.data.ChunkNotes;
	export class Scene {

		/**
		 * Groups and Layers
		 */

		public topRoot : Phaser.Group;
		public layoutRoot : Phaser.Group;
		public cameraRoot : Phaser.Group;
		public sceneRoot : Phaser.Group;

		public backGroundLayer : Phaser.Group;
		public backGroundLayerActive : Phaser.Group;
		public backGroundLayerOverlay : Phaser.Group;
		/**
		 * Managers
		 */
		public menu : Menu;
		public chunkSelector : ChunkSelector;
		public mapOverlay : MapOverlay;
		public chunkNotes : ChunkNotes;

		/**
		 * Scene elements
		 */
		public chunkMap : Phaser.Image;

		/**
		 * Variables
		 */
		public scaleFactor : number = 1;
		private readonly _game : osrs_chunk.Game;

		constructor(game : osrs_chunk.Game) {
			this._game = game;

		}


		/**
		 * Performance.
		 * Goes through all children of the toproot, and their children.
		 * Sets the flag updateOnlyExistingChildren to true
		 */
		public setSceneObjectsUpdateOnlyExistingChildrenFlag() : void {
			const propertyName = 'updateOnlyExistingChildren';
			const value = true;
			const r : any = this.topRoot;
			const f = (r) => {
				r[propertyName] = value;
				const children = r.children;
				if (children) {
					for (let i = 0; i < children.length; i++) {
						f(children[i]);
					}
				}
			};
			f(r);
		}
	}
}
