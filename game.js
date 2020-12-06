var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by jespe on 2019-02-13.
 */
var KeyCode = Phaser.KeyCode;
var osrs_chunk;
(function (osrs_chunk) {
    var control;
    (function (control) {
        var MovableCamera = /** @class */ (function () {
            function MovableCamera(game, cameraRoot) {
                var _this = this;
                this.position = { x: 0, y: 0 };
                this.game = game;
                this.cameraRoot = cameraRoot;
                var dummyTarget = { dummy: 0 };
                TweenMax.fromTo(dummyTarget, 1, {
                    dummy: 0,
                }, {
                    dummy: 1,
                    repeat: -1,
                    yoyo: true,
                    onUpdate: function () {
                        _this.update();
                    }
                });
                var zoomAmount = 0.05;
                game.input.mouse.mouseWheelCallback = function (event) {
                    var zoom = (event.wheelDelta / 120) * zoomAmount;
                    _this.cameraRoot.scale.x += zoom;
                    _this.cameraRoot.scale.y += zoom;
                    _this.focusOnPosition(_this.position, 0);
                };
                this.setupPositionHandler(cameraRoot);
            }
            MovableCamera.prototype.setupPositionHandler = function (cameraRoot) {
                var valueHolder = {
                    x: 0,
                    y: 0
                };
                Object.defineProperties(this.position, {
                    x: {
                        get: function () {
                            return valueHolder.x;
                        },
                        set: function (v) {
                            valueHolder.x = v;
                            cameraRoot.x = v * cameraRoot.scale.x;
                        }
                    },
                    y: {
                        get: function () {
                            return valueHolder.y;
                        },
                        set: function (v) {
                            valueHolder.y = v;
                            cameraRoot.y = v * cameraRoot.scale.y;
                        }
                    }
                });
            };
            MovableCamera.prototype.getMapPositionOfChunk = function (chunkID) {
                // const pos = gameConfig.chunkIDs.getPositionFromChunkID(chunkID);
                var pos = this.game.scene.chunkSelector.getSpritePosition(chunkID);
                var centerSpritePos = {
                    x: (osrs_chunk.gameConfig.gameSize.width / 2) * osrs_chunk.gameConfig.mapAreaScale,
                    y: (osrs_chunk.gameConfig.gameSize.height / 2),
                };
                pos.x -= centerSpritePos.x;
                pos.y -= centerSpritePos.y;
                return new Phaser.Point(-pos.x, -pos.y);
            };
            MovableCamera.prototype.focusOnChunk = function (chunkID, moveTime) {
                if (moveTime === void 0) { moveTime = 0.5; }
                this.focusOnPosition(this.getMapPositionOfChunk(chunkID), moveTime);
            };
            MovableCamera.prototype.focusOnPosition = function (point, moveTime) {
                if (moveTime === void 0) { moveTime = 0.5; }
                TweenMax.to(this.position, moveTime, __assign(__assign({}, point), { ease: Linear.easeInOut }));
            };
            MovableCamera.prototype.update = function () {
                var game = this.game;
                var speed = 1.2;
                var movementSpeed = speed * game.time.physicsElapsedMS;
                if (game.input.keyboard.isDown(KeyCode.UP) || game.input.keyboard.isDown(KeyCode.W)) {
                    this.position.y += movementSpeed;
                }
                else if (game.input.keyboard.isDown(KeyCode.DOWN) || game.input.keyboard.isDown(KeyCode.S)) {
                    this.position.y -= movementSpeed;
                }
                if (game.input.keyboard.isDown(KeyCode.LEFT) || game.input.keyboard.isDown(KeyCode.A)) {
                    this.position.x += movementSpeed;
                }
                else if (game.input.keyboard.isDown(KeyCode.RIGHT) || game.input.keyboard.isDown(KeyCode.D)) {
                    this.position.x -= movementSpeed;
                }
            };
            return MovableCamera;
        }());
        control.MovableCamera = MovableCamera;
    })(control = osrs_chunk.control || (osrs_chunk.control = {}));
})(osrs_chunk || (osrs_chunk = {}));
///<reference path="../control/MovableCamera.ts"/>
/**
 * Created by jespe on 2019-02-12.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var view;
    (function (view) {
        var MovableCamera = osrs_chunk.control.MovableCamera;
        var SceneBuilder = /** @class */ (function () {
            function SceneBuilder(game) {
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
            SceneBuilder.addGroup = function (name, parent, x, y, addToStage) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (addToStage === void 0) { addToStage = false; }
                var group = SceneBuilder.game.add.group(parent, name, addToStage, false);
                group.x = x;
                group.y = y;
                return group;
            };
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
            SceneBuilder.addImage = function (name, key, frame, parent, x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = undefined; }
                if (h === void 0) { h = undefined; }
                var img = SceneBuilder.game.add.image(x, y, key, frame, parent);
                img.name = name;
                img.width = (w || img.width) * SceneBuilder.game.scene.scaleFactor;
                img.height = (h || img.height) * SceneBuilder.game.scene.scaleFactor;
                img.anchor.set(0.5, 0.5);
                return img;
            };
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
            SceneBuilder.addSprite = function (name, key, frame, parent, x, y, w, h) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (w === void 0) { w = undefined; }
                if (h === void 0) { h = undefined; }
                var spr = SceneBuilder.game.add.sprite(x, y, key, frame, parent);
                spr.name = name;
                spr.width = (w || spr.width) * SceneBuilder.game.scene.scaleFactor;
                spr.height = (h || spr.height) * SceneBuilder.game.scene.scaleFactor;
                spr.anchor.set(0.5, 0.5);
                return spr;
            };
            /**
             * Initialize the whole scene.
             */
            SceneBuilder.prototype.buildScene = function () {
                var game = SceneBuilder.game;
                var scene = game.scene = new view.Scene(game);
                this.buildLayers(scene);
                this.buildBackground(scene);
                this.buildControls(scene);
                this.buildMapOverlay(scene);
                this.buildMenu(scene);
                this.buildCamera(scene);
                var defaultChunkId = game.saveData.getDefaultChunkId();
                scene.chunkSelector.selectTile(defaultChunkId);
                scene.moveableCamera.focusOnChunk(defaultChunkId, 0);
                for (var chunkId in game.saveData.activeChunks) {
                    scene.mapOverlay.activateChunk(Number(chunkId));
                }
                scene.setSceneObjectsUpdateOnlyExistingChildrenFlag();
                return scene;
            };
            /**
             * Builds all layers in the order we want them.
             * @param scene
             */
            SceneBuilder.prototype.buildLayers = function (scene) {
                scene.topRoot = SceneBuilder.addGroup('topRoot', null, 0, 0, true);
                scene.layoutRoot = SceneBuilder.addGroup('layoutRoot', scene.topRoot);
                scene.cameraRoot = SceneBuilder.addGroup('cameraRoot', scene.layoutRoot);
                scene.sceneRoot = SceneBuilder.addGroup('sceneRoot', scene.cameraRoot);
                // Custom layers
                var x = -(osrs_chunk.gameConfig.gameSize.width / 2);
                var y = -(osrs_chunk.gameConfig.gameSize.height / 2);
                scene.backGroundLayer = SceneBuilder.addGroup('backgroundLayer', scene.sceneRoot, x, y);
                scene.backGroundLayerActive = SceneBuilder.addGroup('backgroundLayerActive', scene.sceneRoot, x, y);
                scene.backGroundLayerOverlay = SceneBuilder.addGroup('backgroundLayerOverlay', scene.sceneRoot, x, y);
            };
            /**
             * Setup the background
             * @param scene
             */
            SceneBuilder.prototype.buildBackground = function (scene) {
                scene.chunkMap = SceneBuilder.addImage('chunkMap', 'chunks', '0', scene.backGroundLayer, 0, 0);
                scene.chunkMap.tint = 0x383838;
                scene.chunkMap.anchor.set(0.5, 0.5);
            };
            /**
             * Setup the background
             * @param scene
             */
            SceneBuilder.prototype.buildCamera = function (scene) {
                scene.moveableCamera = new MovableCamera(SceneBuilder.game, scene.cameraRoot);
            };
            /**
             * Setup the menu
             * @param scene
             */
            SceneBuilder.prototype.buildMenu = function (scene) {
                scene.menu = new view.Menu(SceneBuilder.game);
                scene.chunkNotes = new osrs_chunk.data.ChunkNotes(SceneBuilder.game);
            };
            /**
             * Setup the controls
             * @param scene
             */
            SceneBuilder.prototype.buildControls = function (scene) {
                scene.chunkSelector = new osrs_chunk.control.ChunkSelector(SceneBuilder.game);
            };
            /**
             * Setup the MapOverlay
             * @param scene
             */
            SceneBuilder.prototype.buildMapOverlay = function (scene) {
                scene.mapOverlay = new osrs_chunk.view.MapOverlay(SceneBuilder.game);
            };
            return SceneBuilder;
        }());
        view.SceneBuilder = SceneBuilder;
    })(view = osrs_chunk.view || (osrs_chunk.view = {}));
})(osrs_chunk || (osrs_chunk = {}));
///<reference path="../../src/scene/SceneBuilder.ts"/>
/**
 * Created by jespe on 2019-02-13.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var gameConfig;
    (function (gameConfig) {
        var SceneBuilder = osrs_chunk.view.SceneBuilder;
        gameConfig.gameSize = {
            width: 1280,
            height: 720,
        };
        gameConfig.mapAreaScale = 0.8;
        gameConfig.chunkSize = 156;
        gameConfig.chunks = {
            width: 43,
            height: 25,
        };
        gameConfig.KNOWN_LOCATIONS = {
            LUMBRIDGE: 12850,
            GRAND_EXCHANGE: 12598
        };
        /**
         * starting at top left 4671, 256 for each x,  -1 for each y cool
         */
        gameConfig.chunkIDs = {
            topLeft: 4671,
            topRight: 15422,
            xIncrease: 256,
            yIncrease: -1,
            getChunkIDFromSpriteIndex: function (spriteIndex) {
                var pos = gameConfig.chunkIDs.getPositionFromSpriteIndex(spriteIndex);
                return gameConfig.chunkIDs.getChunkIDFromPosition(pos);
            },
            getChunkIDFromPosition: function (pos) {
                return (gameConfig.chunkIDs.topLeft + (gameConfig.chunkIDs.yIncrease * pos.y) + (gameConfig.chunkIDs.xIncrease * pos.x));
            },
            getSpriteIndexFromChunkID: function (chunkID) {
                return gameConfig.chunkIDs.getSpriteIndexFromPosition(gameConfig.chunkIDs.getPositionFromChunkID(chunkID));
            },
            getSpriteIndexFromPosition: function (pos) {
                var widthInTiles = Math.floor(SceneBuilder.game.scene.chunkMap.texture.width / gameConfig.chunkSize);
                return (pos.y * widthInTiles) + pos.x;
            },
            getPositionFromSpriteIndex: function (spriteIndex) {
                var widthInTiles = Math.floor(SceneBuilder.game.scene.chunkMap.texture.width / gameConfig.chunkSize);
                return new Phaser.Point(Math.floor(spriteIndex / widthInTiles), spriteIndex % widthInTiles);
            },
            getPositionFromChunkID: function (chunkID) {
                chunkID -= (gameConfig.chunkIDs.topLeft);
                var widthInIDs = chunkID / gameConfig.chunkIDs.xIncrease;
                var x = Math.floor((chunkID) / gameConfig.chunkIDs.xIncrease);
                var y = ((((widthInIDs) - Math.floor(widthInIDs))) * gameConfig.chunkIDs.xIncrease);
                if (y > 0) {
                    y = gameConfig.chunkIDs.xIncrease - y;
                }
                if (chunkID > 0) {
                    x += 1;
                }
                return new Phaser.Point(x, y);
            },
            getCenterChunk: function (chunkIds) {
                var centerPositionOfTiles = { x: 0, y: 0 };
                chunkIds.forEach(function (chunkId) {
                    var position = gameConfig.chunkIDs.getPositionFromChunkID(Number(chunkId));
                    centerPositionOfTiles.x += position.x;
                    centerPositionOfTiles.y += position.y;
                });
                centerPositionOfTiles.x /= chunkIds.length;
                centerPositionOfTiles.y /= chunkIds.length;
                var centerChunk = {
                    chunkId: 0,
                    delta: 999999
                };
                chunkIds.forEach(function (chunkId) {
                    var position = gameConfig.chunkIDs.getPositionFromChunkID(Number(chunkId));
                    // Math.
                    var delta = Math.abs(centerPositionOfTiles.x - position.x) + Math.abs(centerPositionOfTiles.y - position.y);
                    if (delta < centerChunk.delta) {
                        centerChunk.delta = delta;
                        centerChunk.chunkId = Number(chunkId);
                    }
                });
                return Number(centerChunk.chunkId);
            }
        };
    })(gameConfig = osrs_chunk.gameConfig || (osrs_chunk.gameConfig = {}));
})(osrs_chunk || (osrs_chunk = {}));
/**
 * Created by Jeaper on 2019-02-12.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var view;
    (function (view) {
        var OrientationEnum;
        (function (OrientationEnum) {
            OrientationEnum[OrientationEnum["LANDSCAPE"] = 0] = "LANDSCAPE";
            OrientationEnum[OrientationEnum["PORTRAIT"] = 1] = "PORTRAIT";
        })(OrientationEnum || (OrientationEnum = {}));
        var SceneLayoutManager = /** @class */ (function () {
            function SceneLayoutManager(theGame) {
                this.oldRatio = '';
                this._game = theGame;
                // window.addEventListener('resize', () => {
                // 	this.layoutScene(OrientationEnum.LANDSCAPE);
                // }, false);
                this.setupResizeHandling();
                this.layoutScene(OrientationEnum.LANDSCAPE);
            }
            SceneLayoutManager.getClosestSupportedWindowAspectRatio = function (tweakerMap) {
                var closestRatio = '16:9';
                if (tweakerMap === undefined) {
                    return closestRatio;
                }
                var closestDiff = 100000;
                var ratio = window.innerWidth > window.innerHeight ? window.innerWidth / window.innerHeight : window.innerHeight / window.innerWidth;
                var diff = Math.abs(ratio - 16 / 9);
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
            };
            SceneLayoutManager.prototype.layoutScene = function (orientation) {
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
            };
            SceneLayoutManager.prototype.setupResizeHandling = function () {
                var _this = this;
                var content = jQuery('#content');
                var gameWrapper = jQuery('#gameWrapper');
                var fullScreenMask = jQuery('#fullscreenMask');
                var body = jQuery('body');
                gameWrapper.css('overflow', 'visible');
                content.css('overflow', 'visible');
                if (this._game.device.iOS) {
                    var screenHeight = screen.height;
                    var screenWidth = screen.width;
                    // const screenHeight = body.innerHeight;
                    // const screenWidth = body.innerWidth;
                    if (fullScreenMask) {
                        fullScreenMask.css({ width: screenWidth + 'px' });
                        fullScreenMask.css({ height: screenHeight + 'px' });
                    }
                    content.css({ height: screenHeight + 'px' });
                    content.css({ width: screenWidth + 'px' });
                    gameWrapper.css({ width: screenWidth + 'px' });
                    gameWrapper.css({ height: screenHeight + 'px' });
                }
                else {
                    body.css({ height: body.innerHeight + 'px' });
                    body.css({ width: body.innerWidth + 'px' });
                }
                if (this._game.scale !== null) {
                    this._game.scale.onSizeChange.add(this.handleSizeChanged, this);
                }
                this._resizeDelegate = function () { return _this.handleSizeChanged(); };
                jQuery(window).resize(this._resizeDelegate);
            };
            SceneLayoutManager.prototype.handleSizeChanged = function () {
                this.layoutScene(OrientationEnum.LANDSCAPE);
            };
            SceneLayoutManager.prototype.needRelayout = function (orientation) {
                if (this._lastInnerWidth === window.innerWidth && this._lastInnerHeight === window.innerHeight && this._lastOrientation === orientation) {
                    return false;
                }
                this._lastInnerWidth = window.innerWidth;
                this._lastInnerHeight = window.innerHeight;
                this._lastOrientation = orientation;
                return true;
            };
            SceneLayoutManager.prototype.layoutLandscape = function () {
                var game = this._game;
                var devicePixelRatio = game.device.desktop ? 1 : (Math.max(2, (window.devicePixelRatio || 1)));
                var width = Math.min(osrs_chunk.gameConfig.gameSize.width, window.innerWidth * devicePixelRatio);
                var scale = width / osrs_chunk.gameConfig.gameSize.width;
                var invertedScale = 1 / scale;
                var height = width * 9 / 16;
                game.scale.setGameSize(width, height);
                var cssTranslateX = (1 - scale) / 2 * width;
                var cssTranslateY = (1 - scale) / 2 * height;
                jQuery(game.canvas)
                    .css('ms-transform', "scale3d(" + invertedScale + "," + invertedScale + ",1) translate3d(" + cssTranslateX + "px," + cssTranslateY + "px,0px)");
                jQuery(game.canvas)
                    .css('webkit-transform', "scale3d(" + invertedScale + "," + invertedScale + ",1) translate3d(" + cssTranslateX + "px," + cssTranslateY + "px,0px)");
                jQuery(game.canvas)
                    .css('transform', "scale3d(" + invertedScale + "," + invertedScale + ",1) translate3d(" + cssTranslateX + "px," + cssTranslateY + "px,0px)");
                this.layoutSceneForLandscape(width, height, scale, invertedScale);
            };
            SceneLayoutManager.prototype.layoutPortrait = function () {
                var game = this._game;
                var devicePixelRatio = game.device.desktop ? 1 : (Math.max(2, (window.devicePixelRatio || 1)));
                var width = Math.min(osrs_chunk.gameConfig.gameSize.width, window.innerWidth * devicePixelRatio);
                var scale = width / osrs_chunk.gameConfig.gameSize.width;
                var invertedScale = 1 / scale;
                var height = width * 16 / 9;
                // some devices don't support a bigger canvas than 2048
                // so we must force it down if that is the case
                // we must then calculate scale and width again
                if (height > 2048) {
                    var oldHeight = height;
                    height = 2048;
                    var newRatio = height / oldHeight;
                    width = width * newRatio;
                    scale = width / osrs_chunk.gameConfig.gameSize.width;
                    invertedScale = 1 / scale;
                }
                game.scale.setGameSize(width, height);
                var cssTranslateX = (1 - scale) / 2 * width;
                var cssTranslateY = (1 - scale) / 2 * height;
                jQuery(game.canvas)
                    .css('ms-transform', "scale3d(" + invertedScale + "," + invertedScale + ",1) translate3d(" + cssTranslateX + "px," + cssTranslateY + "px,0px)");
                jQuery(game.canvas)
                    .css('webkit-transform', "scale3d(" + invertedScale + "," + invertedScale + ",1) translate3d(" + cssTranslateX + "px," + cssTranslateY + "px,0px)");
                jQuery(game.canvas)
                    .css('transform', "scale3d(" + invertedScale + "," + invertedScale + ",1) translate3d(" + cssTranslateX + "px," + cssTranslateY + "px,0px)");
                this.layoutSceneForPortrait(width, height, scale, invertedScale);
            };
            SceneLayoutManager.prototype.isReadyForLayout = function () {
                return this._game.scene !== undefined;
            };
            SceneLayoutManager.prototype.layoutSceneForPortrait = function (width, height, scale, invertedScale) {
                if (this.isReadyForLayout()) {
                    var scene = this._game.scene;
                    scene.topRoot.scale.x = scale;
                    scene.topRoot.scale.y = scale;
                    scene.topRoot.x = 640 * scale;
                    scene.topRoot.y = 360 * scale;
                }
            };
            SceneLayoutManager.prototype.layoutSceneForLandscape = function (width, height, scale, invertedScale) {
                if (this.isReadyForLayout()) {
                    var scene = this._game.scene;
                    scene.topRoot.scale.x = scale;
                    scene.topRoot.scale.y = scale;
                    scene.topRoot.x = 640 * scale;
                    scene.topRoot.y = 360 * scale;
                }
            };
            return SceneLayoutManager;
        }());
        view.SceneLayoutManager = SceneLayoutManager;
    })(view = osrs_chunk.view || (osrs_chunk.view = {}));
})(osrs_chunk || (osrs_chunk = {}));
///<reference path="../libs/phaser/phaser.d.ts"/>
///<reference path="scene/SceneBuilder.ts"/>
///<reference path="scene/SceneLayoutManager.ts"/>
var osrs_chunk;
(function (osrs_chunk) {
    var BootState = /** @class */ (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Preload resources that must be available early here.
         */
        BootState.prototype.preload = function () {
        };
        /**
         * Setup device/environment specific settings here.
         * Center the game etc.
         */
        BootState.prototype.create = function () {
            var game = this.game;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.state.start('Preload');
        };
        return BootState;
    }(Phaser.State));
    osrs_chunk.BootState = BootState;
})(osrs_chunk || (osrs_chunk = {}));
///<reference path="../libs/phaser/phaser.d.ts"/>
var osrs_chunk;
(function (osrs_chunk) {
    var SceneBuilder = osrs_chunk.view.SceneBuilder;
    var SceneLayoutManager = osrs_chunk.view.SceneLayoutManager;
    var GlobalVar = /** @class */ (function () {
        function GlobalVar() {
        }
        return GlobalVar;
    }());
    osrs_chunk.GlobalVar = GlobalVar;
    var GameState = /** @class */ (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Build the scene here, and setup the game flow, hook up the gui etc.
         * Then just make it playable!
         */
        GameState.prototype.create = function () {
            console.log('Game is running!');
            // Init
            var game = this.game = window['game'];
            var sceneBuilder = new SceneBuilder(game);
            game.scene = sceneBuilder.buildScene();
            var sceneLayoutManager = new SceneLayoutManager(game);
            // Draw background
        }; // create()
        GameState.prototype.update = function () {
            // const game = this.game as osrs_chunk.Game;
            //
            //
            // const speed = 1.2;
            // const movementSpeed = speed * game.time.physicsElapsedMS;
            // if (game.input.keyboard.isDown(KeyCode.UP) || game.input.keyboard.isDown(KeyCode.W)) {
            // 	game.scene.cameraRoot.y += movementSpeed;
            // }
            // else if (game.input.keyboard.isDown(KeyCode.DOWN) || game.input.keyboard.isDown(KeyCode.S)) {
            // 	game.scene.cameraRoot.y -= movementSpeed;
            // }
            //
            // if (game.input.keyboard.isDown(KeyCode.LEFT) || game.input.keyboard.isDown(KeyCode.A)) {
            // 	game.scene.cameraRoot.x += movementSpeed;
            // }
            // else if (game.input.keyboard.isDown(KeyCode.RIGHT) || game.input.keyboard.isDown(KeyCode.D)) {
            // 	game.scene.cameraRoot.x -= movementSpeed;
            // }
        };
        return GameState;
    }(Phaser.State));
    osrs_chunk.GameState = GameState;
})(osrs_chunk || (osrs_chunk = {})); // osrs_chunk
///<reference path="../libs/phaser/phaser.d.ts"/>
var osrs_chunk;
(function (osrs_chunk) {
    var PreloaderState = /** @class */ (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Preload game assets here.
         */
        PreloaderState.prototype.preload = function () {
            this.game.load.image('border', 'assets/images/Border.png');
            this.game.load.spritesheet('chunks', 'assets/images/chunkmapPowerOf2.png', osrs_chunk.gameConfig.chunkSize, osrs_chunk.gameConfig.chunkSize);
        };
        /**
         * Move into the game state here.
         */
        PreloaderState.prototype.create = function () {
            this.game.state.start('Game');
        };
        return PreloaderState;
    }(Phaser.State));
    osrs_chunk.PreloaderState = PreloaderState;
})(osrs_chunk || (osrs_chunk = {}));
var osrs_chunk;
(function (osrs_chunk) {
    var data;
    (function (data) {
        var ChunkStatus;
        (function (ChunkStatus) {
            ChunkStatus[ChunkStatus["LOCKED"] = 0] = "LOCKED";
            ChunkStatus[ChunkStatus["UNLOCKED"] = 1] = "UNLOCKED";
            ChunkStatus[ChunkStatus["POSSIBLE_OUTCOME"] = 2] = "POSSIBLE_OUTCOME";
        })(ChunkStatus = data.ChunkStatus || (data.ChunkStatus = {}));
        var SaveData = /** @class */ (function () {
            function SaveData(game) {
                this.activeChunks = {};
                this.chunkNotes = {};
                this._game = game;
                this.loadFile();
            }
            SaveData.prototype.saveFile = function () {
                var file = {
                    u: this.activeChunks,
                    n: this.chunkNotes,
                };
                localStorage.setItem('saveFile', JSON.stringify(file));
            };
            SaveData.prototype.loadFile = function () {
                try {
                    var file = JSON.parse(localStorage.getItem('saveFile'));
                    this.chunkNotes = file.n;
                    this.activeChunks = file.u;
                    console.log(file);
                }
                catch (e) {
                    console.log('No save file found in local storage, starting fresh.');
                    this.chunkNotes = {};
                    this.activeChunks = {};
                }
            };
            SaveData.prototype.getDefaultChunkId = function () {
                var activeChunkKeys = Object.keys(this.activeChunks);
                if (activeChunkKeys.length > 0) {
                    return osrs_chunk.gameConfig.chunkIDs.getCenterChunk(activeChunkKeys);
                }
                else {
                    //Lumbridge
                    return 12850;
                }
            };
            return SaveData;
        }());
        data.SaveData = SaveData;
    })(data = osrs_chunk.data || (osrs_chunk.data = {}));
})(osrs_chunk || (osrs_chunk = {}));
///<reference path="../libs/phaser/phaser.d.ts"/>
///<reference path="GameState.ts"/>
///<reference path="PreloaderState.ts"/>
///<reference path="scene/SceneLayoutManager.ts"/>
///<reference path="scene/SceneBuilder.ts"/>
///<reference path="chunkdata/SaveFile.ts"/>
var osrs_chunk;
(function (osrs_chunk) {
    var PreloaderState = osrs_chunk.PreloaderState;
    var GameState = osrs_chunk.GameState;
    var SaveData = osrs_chunk.data.SaveData;
    function createGame() {
        var game = window['game'] = new osrs_chunk.Game();
    }
    osrs_chunk.createGame = createGame;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = this;
            var config = {
                enableDebug: true,
                width: osrs_chunk.gameConfig.gameSize.width,
                height: osrs_chunk.gameConfig.gameSize.height,
                renderer: Phaser.WEBGL,
                parent: 'content',
            };
            _this = _super.call(this, config) || this;
            _this.saveData = new SaveData(_this);
            _this['clearBeforeRender'] = false; // Fix for iOS10 bug causing flicker.
            _this.state.add('Boot', osrs_chunk.BootState, false);
            _this.state.add('Preload', PreloaderState, false);
            _this.state.add('Game', GameState, false);
            _this.state.start('Boot');
            window['game'] = _this;
            return _this;
        }
        return Game;
    }(Phaser.Game));
    osrs_chunk.Game = Game;
})(osrs_chunk || (osrs_chunk = {}));
/**
 * Created by jespe on 2019-02-14.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var data;
    (function (data) {
        var ChunkNotes = /** @class */ (function () {
            function ChunkNotes(game) {
                this.game = game;
                this.game.add.plugin(PhaserInput.Plugin);
                var convertedGame = game;
                var borderWidth = 20;
                var input = convertedGame.add.inputField(borderWidth / 2, 320, {
                    font: '18px Arial',
                    fill: '#212121',
                    fontWeight: undefined,
                    width: this.game.scene.menu.menuWidth - borderWidth * 2,
                    height: 300,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 6,
                    placeHolder: 'Notes',
                    type: PhaserInput.InputType.text,
                    maxLines: 10,
                });
                input.focusOutOnEnter = false;
                // input.inputOptions.maxLines = false;
                this.game.scene.menu.menuLayer.add(input);
                this.inputBox = input;
            }
            ChunkNotes.prototype.setNote = function (chunkID, notes) {
                this.game.saveData.chunkNotes[chunkID] = notes;
            };
            ChunkNotes.prototype.getNote = function (chunkID) {
                if (this.game.saveData.chunkNotes[chunkID] !== undefined) {
                    return this.game.saveData.chunkNotes[chunkID];
                }
                else {
                    return '';
                }
            };
            return ChunkNotes;
        }());
        data.ChunkNotes = ChunkNotes;
    })(data = osrs_chunk.data || (osrs_chunk.data = {}));
})(osrs_chunk || (osrs_chunk = {}));
///<reference path="../scene/SceneBuilder.ts"/>
/**
 * Created by jespe on 2019-02-14.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var control;
    (function (control) {
        var SceneBuilder = osrs_chunk.view.SceneBuilder;
        var chunkIDs = osrs_chunk.gameConfig.chunkIDs;
        var ChunkSelector = /** @class */ (function () {
            function ChunkSelector(game) {
                this.selectedTile = -1;
                this.selectTile = function (chunkID) {
                    console.log('No chunk selection action set.');
                };
                window['printChunks'] = function () {
                    var border = '-------------';
                    console.log(border);
                    var point = new Phaser.Point(0, 0);
                    for (var i = 0; i < 10; i++) {
                        point.x = point.y = i;
                        console.log(point);
                        var spriteIndex = osrs_chunk.gameConfig.chunkIDs.getSpriteIndexFromPosition(point);
                        console.log('spriteIndex : ' + spriteIndex);
                        var chunkID = osrs_chunk.gameConfig.chunkIDs.getChunkIDFromSpriteIndex(spriteIndex);
                        console.log('chunkID : ' + chunkID);
                        console.log(osrs_chunk.gameConfig.chunkIDs.getPositionFromChunkID(chunkID));
                        console.log(border);
                    }
                };
                this.game = game;
                this.selectorBorder = SceneBuilder.addImage('selectorBorder', 'border', undefined, this.game.scene.backGroundLayerOverlay);
                this.selectorBorder.alpha = 0.7;
                this.selectorBorder.width = this.selectorBorder.height = osrs_chunk.gameConfig.chunkSize * 1.2;
                this.selectorBorder.visible = false;
                this.selectorBorder.exists = false;
                this.selectedTileMapImage = SceneBuilder.addImage('selectedTileMapImage', 'chunks', 0, this.game.scene.backGroundLayerActive);
                this.selectedTileMapImage.visible = false;
                this.selectedTileMapImage.exists = false;
                var chunkMap = this.game.scene.chunkMap;
                chunkMap.inputEnabled = true;
                chunkMap.events.onInputDown.add(this.onBoardClick, this);
            }
            ChunkSelector.prototype.highlightTile = function (chunkID) {
                this.selectedTile = chunkID;
                console.log('chunkID ', chunkID, osrs_chunk.gameConfig.chunkIDs.getPositionFromChunkID(chunkID), this.getSpritePosition(chunkID));
                var imagePos = this.getSpritePosition(chunkID);
                this.selectorBorder.position.x = imagePos.x;
                this.selectorBorder.position.y = imagePos.y;
                this.selectorBorder.visible = true;
                this.selectorBorder.exists = true;
                this.selectedTileMapImage.position.x = imagePos.x;
                this.selectedTileMapImage.position.y = imagePos.y;
                this.selectedTileMapImage.frame = chunkIDs.getSpriteIndexFromChunkID(chunkID);
                this.selectedTileMapImage.visible = true;
                this.selectedTileMapImage.exists = true;
            };
            ChunkSelector.prototype.getSpritePosition = function (chunkID) {
                var pos = chunkIDs.getPositionFromChunkID(chunkID);
                var sprite = this.game.scene.chunkMap;
                var x = sprite.position.x - (sprite.anchor.x * sprite.width);
                var y = sprite.position.y - (sprite.anchor.y * sprite.height);
                var imagePos = new Phaser.Point(x + (osrs_chunk.gameConfig.chunkSize * (pos.x + 0.5)), y + (osrs_chunk.gameConfig.chunkSize * (pos.y + 0.5)));
                return imagePos;
            };
            ChunkSelector.prototype.deselectTile = function () {
                this.selectedTileMapImage.visible = false;
                this.selectedTileMapImage.exists = false;
                this.selectorBorder.visible = false;
                this.selectorBorder.exists = false;
                this.selectedTile = -1;
            };
            ChunkSelector.prototype.onBoardClick = function (sprite, pointer) {
                if (pointer.x >= (this.game.width * osrs_chunk.gameConfig.mapAreaScale)) {
                    return;
                }
                var x = sprite.worldPosition.x - (sprite.anchor.x * sprite.width);
                var y = sprite.worldPosition.y - (sprite.anchor.y * sprite.height);
                var onImageY = (pointer.y - y);
                var onImageX = (pointer.x - x);
                var frameWidth = osrs_chunk.gameConfig.chunkSize;
                var row = Math.floor((onImageY / frameWidth));
                var column = Math.floor((onImageX / frameWidth));
                var pos = new Phaser.Point(column, row);
                this.selectTile(chunkIDs.getChunkIDFromPosition(pos));
            };
            return ChunkSelector;
        }());
        control.ChunkSelector = ChunkSelector;
    })(control = osrs_chunk.control || (osrs_chunk.control = {}));
})(osrs_chunk || (osrs_chunk = {}));
/**
 * Created by jespe on 2019-02-14.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var view;
    (function (view) {
        var ChunkStatus = osrs_chunk.data.ChunkStatus;
        var MapOverlay = /** @class */ (function () {
            function MapOverlay(game) {
                this.game = game;
                this.chunkImages = {};
            }
            MapOverlay.prototype.toggleChunk = function (chunkID) {
                if (this.chunkImages[chunkID] === undefined) {
                    this.activateChunk(chunkID);
                }
                else {
                    this.deActivateChunk(chunkID);
                }
            };
            MapOverlay.prototype.activateChunk = function (chunkID) {
                if (this.chunkImages[chunkID] === undefined) {
                    var imagePos = this.game.scene.chunkSelector.getSpritePosition(chunkID);
                    this.chunkImages[chunkID] = view.SceneBuilder.addImage("ActiveChunk_" + chunkID, 'chunks', osrs_chunk.gameConfig.chunkIDs.getSpriteIndexFromChunkID(chunkID), this.game.scene.backGroundLayerActive, imagePos.x, imagePos.y);
                }
                this.game.saveData.activeChunks[chunkID] = ChunkStatus.UNLOCKED;
            };
            MapOverlay.prototype.deActivateChunk = function (chunkID) {
                if (this.chunkImages[chunkID] !== undefined) {
                    this.chunkImages[chunkID].destroy();
                    this.chunkImages[chunkID] = undefined;
                }
                delete this.chunkImages[chunkID];
                delete this.game.saveData.activeChunks[chunkID];
            };
            return MapOverlay;
        }());
        view.MapOverlay = MapOverlay;
    })(view = osrs_chunk.view || (osrs_chunk.view = {}));
})(osrs_chunk || (osrs_chunk = {}));
/**
 * Created by jespe on 2019-02-13.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var view;
    (function (view) {
        var Menu = /** @class */ (function () {
            function Menu(game) {
                var _this = this;
                this.menuWidth = 200;
                this.game = game;
                var gameWidth = osrs_chunk.gameConfig.gameSize.width;
                var gameHeight = osrs_chunk.gameConfig.gameSize.height;
                this.menuWidth = gameWidth * (1 - osrs_chunk.gameConfig.mapAreaScale);
                // this.menuLayer = SceneBuilder.addGroup('menuLayer', game.scene.topRoot, -gameWidth / 2 , -gameHeight / 2);
                this.menuLayer = view.SceneBuilder.addGroup('menuLayer', game.scene.topRoot, (gameWidth * osrs_chunk.gameConfig.mapAreaScale) - (gameWidth / 2), -gameHeight / 2);
                this.menuLayer.alpha = 0.7;
                var graphics = game.add.graphics(0, 0);
                this.menuLayer.add(graphics);
                graphics.beginFill(0xfffffff, 1);
                graphics.drawRect(0, 0, this.menuWidth, gameHeight);
                graphics.endFill();
                this.selectedTileImage = view.SceneBuilder.addImage('chunkMap', 'chunks', 48, this.menuLayer, 0, 0);
                this.selectedTileImage.anchor.set(0, 0);
                this.selectedTileImage.width = this.menuWidth;
                this.selectedTileImage.height = this.menuWidth;
                var chunkSelector = this.game.scene.chunkSelector;
                chunkSelector.selectTile = function (chunkID) {
                    if (chunkSelector.selectedTile !== chunkID) {
                        _this.selectedTileImage.frame = osrs_chunk.gameConfig.chunkIDs.getSpriteIndexFromChunkID(chunkID);
                        _this.selectedTileImage.visible = true;
                        _this.selectedTileImage.exists = true;
                        chunkSelector.highlightTile(chunkID);
                    }
                    else {
                        _this.selectedTileImage.visible = false;
                        _this.selectedTileImage.exists = false;
                        chunkSelector.deselectTile();
                    }
                };
                this.addUnlockButton();
            }
            Menu.prototype.addUnlockButton = function () {
                var _this = this;
                var button = this.game.add.button(this.menuWidth / 2, 260, 'border', function () {
                    _this.game.scene.mapOverlay.toggleChunk(_this.game.scene.chunkSelector.selectedTile);
                    _this.game.saveData.saveFile();
                }, this, 2, 1, 0, undefined, this.menuLayer);
                button.anchor.set(0.5, 0);
                button.width = this.menuWidth / 2;
                button.height = 50;
            };
            return Menu;
        }());
        view.Menu = Menu;
    })(view = osrs_chunk.view || (osrs_chunk.view = {}));
})(osrs_chunk || (osrs_chunk = {}));
/**
 * Created by Jeaper on 2019-02-12.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var view;
    (function (view) {
        var Scene = /** @class */ (function () {
            function Scene(game) {
                /**
                 * Variables
                 */
                this.scaleFactor = 1;
                this._game = game;
            }
            /**
             * Performance.
             * Goes through all children of the toproot, and their children.
             * Sets the flag updateOnlyExistingChildren to true
             */
            Scene.prototype.setSceneObjectsUpdateOnlyExistingChildrenFlag = function () {
                var propertyName = 'updateOnlyExistingChildren';
                var value = true;
                var r = this.topRoot;
                var f = function (r) {
                    r[propertyName] = value;
                    var children = r.children;
                    if (children) {
                        for (var i = 0; i < children.length; i++) {
                            f(children[i]);
                        }
                    }
                };
                f(r);
            };
            return Scene;
        }());
        view.Scene = Scene;
    })(view = osrs_chunk.view || (osrs_chunk.view = {}));
})(osrs_chunk || (osrs_chunk = {}));
/**
 * Created by jespe on 2019-02-14.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var utils;
    (function (utils) {
        var collections;
        (function (collections) {
            function filledArray(l, f) {
                var ret = [];
                for (var i = 0; i < l; i++) {
                    ret.push(f);
                }
                return ret;
            }
            collections.filledArray = filledArray;
            function swapMap(map) {
                // Flips the key value pair of a map.
                var ret = {};
                for (var key in map) {
                    if (map.hasOwnProperty(key)) {
                        ret[map[key]] = Number(key);
                    }
                }
                return ret;
            }
            collections.swapMap = swapMap;
            function removeElementFromArray(array, element) {
                var index = array.indexOf(element);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }
            collections.removeElementFromArray = removeElementFromArray;
            // export type MapType<T extends {[k : string] : any}> = T extends {[k : string] : infer U} ? U : never;
            /**
             * Binary search
             */
            /**
             * Returns the index of the closest element to the value
             * Method which returns the number to compare in the element
             * @param arr
             * @param target
             * @param getValue
             * @return The index of the closest element in the array
             * (-1 if empty)
             */
            function findClosestElement(arr, target, getValue) {
                if (getValue === void 0) { getValue = function (element) {
                    return Number(element);
                }; }
                /**
                 * Method to compare which one
                 * is the more close We find the
                 * closest by taking the difference
                 * between the target and both
                 * values. It assumes that val2 is
                 * greater than val1 and target
                 * lies between these two.
                 */
                var getClosestIndex = function (index1, index2, target) {
                    if (target - getValue(arr[index1]) >= getValue(arr[index2]) - target) {
                        return index1;
                    }
                    else {
                        return index2;
                    }
                };
                var n = arr.length;
                /**
                 * Corner cases
                 */
                if (arr.length === 0) {
                    return -1;
                }
                else if (target <= getValue(arr[0])) {
                    return 0;
                }
                else if (target >= getValue(arr[n - 1])) {
                    return n - 1;
                }
                /**
                 *  Doing binary search
                 */
                var i = 0;
                var mid = 0;
                var j = n;
                while (i < j) {
                    mid = Math.round((i + j) / 2);
                    if (getValue(arr[mid]) === target) {
                        return mid;
                    }
                    /* If target is less
                     than array element,
                     then search in left */
                    if (target < getValue(arr[mid])) {
                        /* If target is greater
                         than previous to mid,
                         return closest of two */
                        if (mid > 0 && target > getValue(arr[mid - 1])) {
                            return getClosestIndex(mid - 1, mid, target);
                        }
                        /* Repeat for left half */
                        j = mid;
                    }
                    /* If target is
                     greater than mid */
                    else {
                        if (mid < n - 1 && target < getValue(arr[mid + 1])) {
                            return getClosestIndex(mid, mid + 1, target);
                        }
                        i = mid + 1; // update i
                    }
                }
                /* Only single element
                 left after search */
                return mid;
            }
            collections.findClosestElement = findClosestElement;
        })(collections = utils.collections || (utils.collections = {}));
    })(utils = osrs_chunk.utils || (osrs_chunk.utils = {}));
})(osrs_chunk || (osrs_chunk = {}));
//# sourceMappingURL=game.js.map