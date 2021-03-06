///<reference path="../control/MovableCamera.ts"/>
/**
 * Created by jespe on 2019-02-12.
 */

module osrs_chunk.view {
	import DisplayObject = PIXI.DisplayObject;
	import DisplayObjectContainer = PIXI.DisplayObjectContainer;
	import game = PIXI.game;
	import Color = Phaser.Color;
	import MovableCamera = osrs_chunk.control.MovableCamera;


	export class SceneBuilder {
		public static game : osrs_chunk.Game;

		constructor(game : osrs_chunk.Game) {
			SceneBuilder.game = game;
		}

		/**
		 * Adds a Phaser Group to the given parent or to the stage
		 * @param name The name of the Group
		 * @param parent The parent
		 * @param x Horizontal Position
		 * @param y Vetical Position
		 * @param addToStage If the Group should be added to the stage
		 */
		public static addGroup(name : string, parent : DisplayObject | DisplayObjectContainer, x : number = 0, y : number = 0, addToStage : boolean = false) : Phaser.Group {
			const group = SceneBuilder.game.add.group(parent, name, addToStage, false);
			group.x = x;
			group.y = y;
			return group;
		}

		/**
		 * Adds a Phaser Image to the given parent or to the stage
		 * @param name The name of the Image.
		 * @param key The key for the gfx atlas.
		 * @param frame The framename in the atlas.
		 * @param parent The parent.
		 * @param x Horizontal Position.
		 * @param y Vetical Position.
		 * @param w Overrides the width of the Image.
		 * @param h Overrides the height of the Image.
		 */
		public static addImage(name : string, key : string, frame : string | number, parent : Phaser.Group, x : number = 0, y : number = 0, w : number = undefined, h : number = undefined) : Phaser.Image {
			const img = SceneBuilder.game.add.image(x, y, key, frame, parent);
			img.name = name;
			img.width = (w || img.width) * SceneBuilder.game.scene.scaleFactor;
			img.height = (h || img.height) * SceneBuilder.game.scene.scaleFactor;
			img.anchor.set(0.5, 0.5);
			return img;
		}

		/**
		 * Adds a Phaser Sprite to the given parent or to the stage
		 * @param name The name of the Sprite.
		 * @param key The key for the gfx atlas.
		 * @param frame The framename in the atlas.
		 * @param parent The parent.
		 * @param x Horizontal Position.
		 * @param y Vetical Position.
		 * @param w Overrides the width of the Sprite.
		 * @param h Overrides the height of the Sprite.
		 */
		public static addSprite(name : string, key : string, frame : string | number, parent : Phaser.Group, x : number = 0, y : number = 0, w : number = undefined, h : number = undefined) : Phaser.Sprite {
			const spr = SceneBuilder.game.add.sprite(x, y, key, frame, parent);
			spr.name = name;
			spr.width = (w || spr.width) * SceneBuilder.game.scene.scaleFactor;
			spr.height = (h || spr.height) * SceneBuilder.game.scene.scaleFactor;
			spr.anchor.set(0.5, 0.5);
			return spr;
		}

		/**
		 * Initialize the whole scene.
		 */
		public buildScene() : osrs_chunk.view.Scene {
			const game = SceneBuilder.game;
			const scene : view.Scene = game.scene = new view.Scene(game);

			this.buildLayers(scene);
			this.buildBackground(scene);
			this.buildControls(scene);
			this.buildMapOverlay(scene);
			this.buildMenu(scene);
			this.buildCamera(scene);

			const defaultChunkId = game.saveData.getDefaultChunkId();
			scene.chunkSelector.selectTile(defaultChunkId);
			scene.moveableCamera.focusOnChunk(defaultChunkId,0);

			for (const chunkId in game.saveData.activeChunks) {
				scene.mapOverlay.activateChunk(Number(chunkId));
			}

			scene.setSceneObjectsUpdateOnlyExistingChildrenFlag();
			return scene;
		}


		/**
		 * Builds all layers in the order we want them.
		 * @param scene
		 */
		private buildLayers(scene : osrs_chunk.view.Scene) {
			scene.topRoot = SceneBuilder.addGroup('topRoot', null, 0, 0, true);

			scene.layoutRoot = SceneBuilder.addGroup('layoutRoot', scene.topRoot);

			scene.cameraRoot = SceneBuilder.addGroup('cameraRoot', scene.layoutRoot);

			scene.sceneRoot = SceneBuilder.addGroup('sceneRoot', scene.cameraRoot);

			// Custom layers

			const x = -(gameConfig.gameSize.width / 2);
			const y = -(gameConfig.gameSize.height / 2);
			scene.backGroundLayer = SceneBuilder.addGroup('backgroundLayer', scene.sceneRoot, x, y);
			scene.backGroundLayerActive = SceneBuilder.addGroup('backgroundLayerActive', scene.sceneRoot, x, y);
			scene.backGroundLayerOverlay = SceneBuilder.addGroup('backgroundLayerOverlay', scene.sceneRoot, x, y);
		}


		/**
		 * Setup the background
		 * @param scene
		 */
		private buildBackground(scene : Scene) : void {
			scene.chunkMap = SceneBuilder.addImage('chunkMap', 'chunks', '0', scene.backGroundLayer, 0, 0);
			scene.chunkMap.tint = 0x383838;
			scene.chunkMap.anchor.set(0.5,0.5);

		}

		/**
		 * Setup the background
		 * @param scene
		 */
		private buildCamera(scene : Scene) : void {
			scene.moveableCamera = new MovableCamera(SceneBuilder.game,scene.cameraRoot);

		}

		/**
		 * Setup the menu
		 * @param scene
		 */
		private buildMenu(scene : Scene) : void {
			scene.menu = new Menu(SceneBuilder.game);
			scene.chunkNotes = new osrs_chunk.data.ChunkNotes(SceneBuilder.game);

		}

		/**
		 * Setup the controls
		 * @param scene
		 */
		private buildControls(scene : Scene) : void {
			scene.chunkSelector = new osrs_chunk.control.ChunkSelector(SceneBuilder.game);

		}

		/**
		 * Setup the MapOverlay
		 * @param scene
		 */
		private buildMapOverlay(scene : Scene) : void {
			scene.mapOverlay = new osrs_chunk.view.MapOverlay(SceneBuilder.game);

		}
	}
}
