/**
 * Created by Jeaper on 2019-02-12.
 */

module osrs_chunk.view {
	enum OrientationEnum {
		LANDSCAPE = 0,
		PORTRAIT = 1
	}
	export class SceneLayoutManager {

		public static getClosestSupportedWindowAspectRatio(tweakerMap : any) : string {
			let closestRatio : string = '16:9';

			if (tweakerMap === undefined) {
				return closestRatio;
			}
			let closestDiff = 100000;
			const ratio = window.innerWidth > window.innerHeight ? window.innerWidth / window.innerHeight : window.innerHeight / window.innerWidth;
			let diff = Math.abs(ratio - 16 / 9);
			if (diff < closestDiff && tweakerMap['16:9'] !== undefined) {
				closestRatio = '16:9';
				closestDiff = diff;
			}
			diff = Math.abs(ratio - 16 / 10);
			if (diff < closestDiff && tweakerMap['16:10'] !== undefined) {
				closestRatio = '16:10';
				closestDiff = diff;
			}
			diff = Math.abs(ratio - 4 / 3);
			if (diff < closestDiff && tweakerMap['4:3'] !== undefined) {
				closestRatio = '4:3';
				closestDiff = diff;
			}
			diff = Math.abs(ratio - 41 / 32);
			if (diff < closestDiff && tweakerMap['41:32'] !== undefined) {
				closestRatio = '41:32';
				closestDiff = diff;
			}
			diff = Math.abs(ratio - 441 / 320);
			if (diff < closestDiff && tweakerMap['441:320'] !== undefined) {
				closestRatio = '441:320';
				closestDiff = diff;
			}
			diff = Math.abs(ratio - 529 / 320);
			if (diff < closestDiff && tweakerMap['529:320'] !== undefined) {
				closestRatio = '529:320';
				closestDiff = diff;
			}
			diff = Math.abs(ratio - 696 / 414);
			if (diff < closestDiff && tweakerMap['696:414'] !== undefined) {
				closestRatio = '696:414';
			}
			return closestRatio;
		}

		private readonly _game : osrs_chunk.Game;
		private _currentOrientation : OrientationEnum;
		private _lastInnerWidth : number;
		private _lastInnerHeight : number;
		private _lastOrientation : number;
		private oldRatio = '';
		private _resizeDelegate : (eventObject : JQueryEventObject) => any;

		constructor(theGame : osrs_chunk.Game) {
			this._game = theGame;

			// window.addEventListener('resize', () => {
			// 	this.layoutScene(OrientationEnum.LANDSCAPE);
			// }, false);
			this.setupResizeHandling();
			this.layoutScene(OrientationEnum.LANDSCAPE);

		}

		public layoutScene(orientation : OrientationEnum) : void {
			if (this._game.scene === null || this._game.scene === undefined) {
				return;
			}

			if (!this.needRelayout(orientation)) {
				return;
			}

			this._currentOrientation = orientation;

			console.log('layouting');
			this.layoutLandscape();
			/*let toPortrait : boolean;
			 if (orientation === OrientationEnum.LANDSCAPE) {
			 this.layoutLandscape();
			 toPortrait = false;
			 }
			 else {
			 toPortrait = true;
			 this.layoutPortrait();

			 }*/
		}


		public setupResizeHandling() {
			const _this = this;
			const content = jQuery('#content');
			const gameWrapper = jQuery('#gameWrapper');
			const fullScreenMask = jQuery('#fullscreenMask');
			const body = jQuery('body');
			gameWrapper.css('overflow', 'visible');
			content.css('overflow', 'visible');

			if (this._game.device.iOS) {
				const screenHeight = screen.height;
				const screenWidth = screen.width;
				// const screenHeight = body.innerHeight;
				// const screenWidth = body.innerWidth;
				if (fullScreenMask) {
					fullScreenMask.css({width : screenWidth + 'px'});
					fullScreenMask.css({height : screenHeight + 'px'});
				}
				content.css({height : screenHeight + 'px'});
				content.css({width : screenWidth + 'px'});
				gameWrapper.css({width : screenWidth + 'px'});
				gameWrapper.css({height : screenHeight + 'px'});
			}
			else {
				body.css({height : body.innerHeight + 'px'});
				body.css({width : body.innerWidth + 'px'});
			}

			if (this._game.scale !== null) {
				this._game.scale.onSizeChange.add(this.handleSizeChanged, this);
			}

			this._resizeDelegate = () => _this.handleSizeChanged();
			jQuery(window).resize(this._resizeDelegate);
		}

		public handleSizeChanged() {
			this.layoutScene(OrientationEnum.LANDSCAPE);
		}


		private needRelayout(orientation : OrientationEnum) : boolean {
			if (this._lastInnerWidth === window.innerWidth && this._lastInnerHeight === window.innerHeight && this._lastOrientation === orientation) {
				return false;
			}
			this._lastInnerWidth = window.innerWidth;
			this._lastInnerHeight = window.innerHeight;
			this._lastOrientation = orientation;
			return true;
		}

		private layoutLandscape() : void {
			const game = this._game;
			const devicePixelRatio = game.device.desktop ? 1 : (Math.max(2, (window.devicePixelRatio || 1)));

			const width = Math.min(gameConfig.gameSize.width, window.innerWidth * devicePixelRatio);
			const scale = width / gameConfig.gameSize.width;
			const invertedScale = 1 / scale;
			const height = width * 9 / 16;
			game.scale.setGameSize(width, height);

			const cssTranslateX = (1 - scale) / 2 * width;
			const cssTranslateY = (1 - scale) / 2 * height;

			jQuery(game.canvas)
			.css('ms-transform', `scale3d(${invertedScale},${invertedScale},1) translate3d(${cssTranslateX}px,${cssTranslateY}px,0px)`);
			jQuery(game.canvas)
			.css('webkit-transform', `scale3d(${invertedScale},${invertedScale},1) translate3d(${cssTranslateX}px,${cssTranslateY}px,0px)`);
			jQuery(game.canvas)
			.css('transform', `scale3d(${invertedScale},${invertedScale},1) translate3d(${cssTranslateX}px,${cssTranslateY}px,0px)`);

			this.layoutSceneForLandscape(width, height, scale, invertedScale);
		}

		private layoutPortrait() : void {
			const game = this._game;

			const devicePixelRatio = game.device.desktop ? 1 : (Math.max(2, (window.devicePixelRatio || 1)));

			let width = Math.min(gameConfig.gameSize.width, window.innerWidth * devicePixelRatio);
			let scale = width / gameConfig.gameSize.width;
			let invertedScale = 1 / scale;
			let height = width * 16 / 9;


			// some devices don't support a bigger canvas than 2048
			// so we must force it down if that is the case
			// we must then calculate scale and width again
			if (height > 2048) {
				const oldHeight : number = height;
				height = 2048;
				const newRatio : number = height / oldHeight;
				width = width * newRatio;
				scale = width / gameConfig.gameSize.width;
				invertedScale = 1 / scale;
			}

			game.scale.setGameSize(width, height);

			const cssTranslateX = (1 - scale) / 2 * width;
			const cssTranslateY = (1 - scale) / 2 * height;

			jQuery(game.canvas)
			.css('ms-transform', `scale3d(${invertedScale},${invertedScale},1) translate3d(${cssTranslateX}px,${cssTranslateY}px,0px)`);
			jQuery(game.canvas)
			.css('webkit-transform', `scale3d(${invertedScale},${invertedScale},1) translate3d(${cssTranslateX}px,${cssTranslateY}px,0px)`);
			jQuery(game.canvas)
			.css('transform', `scale3d(${invertedScale},${invertedScale},1) translate3d(${cssTranslateX}px,${cssTranslateY}px,0px)`);

			this.layoutSceneForPortrait(width, height, scale, invertedScale);


		}

		private isReadyForLayout() {
			return this._game.scene !== undefined;
		}


		private layoutSceneForPortrait(width : number, height : number, scale : number, invertedScale : number) : void {

			if (this.isReadyForLayout()) {
				const scene = this._game.scene;
				scene.topRoot.scale.x = scale;
				scene.topRoot.scale.y = scale;

				scene.topRoot.x = 640 * scale;
				scene.topRoot.y = 360 * scale;
			}
		}

		private layoutSceneForLandscape(width : number, height : number, scale : number, invertedScale : number) : void {

			if (this.isReadyForLayout()) {
				const scene = this._game.scene;
				scene.topRoot.scale.x = scale;
				scene.topRoot.scale.y = scale;

				scene.topRoot.x = 640 * scale;
				scene.topRoot.y = 360 * scale;
			}
		}


	}
}
