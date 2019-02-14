var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
var osrs_chunk;
(function (osrs_chunk) {
    var gameConfig;
    (function (gameConfig) {
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
    })(gameConfig = osrs_chunk.gameConfig || (osrs_chunk.gameConfig = {}));
})(osrs_chunk || (osrs_chunk = {}));
/**
 * Created by jespe on 2019-02-12.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var view;
    (function (view) {
        var SceneBuilder = /** @class */ (function () {
            function SceneBuilder(game) {
                SceneBuilder._game = game;
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
                var group = SceneBuilder._game.add.group(parent, name, addToStage, false);
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
                var img = SceneBuilder._game.add.image(x, y, key, frame, parent);
                img.name = name;
                img.width = (w || img.width) * SceneBuilder._game.scene.scaleFactor;
                img.height = (h || img.height) * SceneBuilder._game.scene.scaleFactor;
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
                var spr = SceneBuilder._game.add.sprite(x, y, key, frame, parent);
                spr.name = name;
                spr.width = (w || spr.width) * SceneBuilder._game.scene.scaleFactor;
                spr.height = (h || spr.height) * SceneBuilder._game.scene.scaleFactor;
                spr.anchor.set(0.5, 0.5);
                return spr;
            };
            /**
             * Initialize the whole scene.
             */
            SceneBuilder.prototype.buildScene = function () {
                var game = SceneBuilder._game;
                var scene = game.scene = new view.Scene(game);
                this.buildLayers(scene);
                this.buildBackground(scene);
                this.buildMenu(scene);
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
                scene.backGroundLayer = SceneBuilder.addGroup('backgroundLayer', scene.sceneRoot, -(osrs_chunk.gameConfig.gameSize.width / 2), -(osrs_chunk.gameConfig.gameSize.height / 2));
            };
            /**
             * Setup the background
             * @param scene
             */
            SceneBuilder.prototype.buildBackground = function (scene) {
                scene.chunkMap = SceneBuilder.addImage('chunkMap', 'chunks', '0', scene.backGroundLayer, 0, 0);
            };
            /**
             * Setup the background
             * @param scene
             */
            SceneBuilder.prototype.buildMenu = function (scene) {
                scene.menu = new view.Menu(SceneBuilder._game);
            };
            return SceneBuilder;
        }());
        view.SceneBuilder = SceneBuilder;
    })(view = osrs_chunk.view || (osrs_chunk.view = {}));
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
    var KeyCode = Phaser.KeyCode;
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
            var game = this.game;
            var speed = 1.2;
            var movementSpeed = speed * game.time.physicsElapsedMS;
            if (game.input.keyboard.isDown(KeyCode.UP) || game.input.keyboard.isDown(KeyCode.W)) {
                game.scene.cameraRoot.y += movementSpeed;
            }
            else if (game.input.keyboard.isDown(KeyCode.DOWN) || game.input.keyboard.isDown(KeyCode.S)) {
                game.scene.cameraRoot.y -= movementSpeed;
            }
            if (game.input.keyboard.isDown(KeyCode.LEFT) || game.input.keyboard.isDown(KeyCode.A)) {
                game.scene.cameraRoot.x += movementSpeed;
            }
            else if (game.input.keyboard.isDown(KeyCode.RIGHT) || game.input.keyboard.isDown(KeyCode.D)) {
                game.scene.cameraRoot.x -= movementSpeed;
            }
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
            // this.game.load.image('spinButtonImage', 'assets/sprites/Button.png');
            // this.game.load.image('chunkMap', 'assets/images/chunkmapPowerOf2.png');
            this.game.load.spritesheet('chunks', 'assets/images/chunkmapPowerOf2.png', osrs_chunk.gameConfig.chunkSize, osrs_chunk.gameConfig.chunkSize);
            // this.game.load.spritesheet('chunks', 'assets/images/chunkmapPowerOf2Numbered.png', gameConfig.chunkSize, gameConfig.chunkSize, undefined, 1, undefined);
            // this.game.load.spritesheet('chunks', 'assets/images/chunkmapNonPadded.png', gameConfig.chunkSize, gameConfig.chunkSize, undefined, 1, undefined);
            // this.game.load.image('chunkMap', 'assets/images/chunkmapPowerOf2.png');
            // this.game.load.image('chunkMap1', 'assets/images/chunkmapPowerOf2_1.png',);
            // this.game.load.image('chunkMap2', 'assets/images/chunkmapPowerOf2_2.png',);
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
///<reference path="../libs/phaser/phaser.d.ts"/>
///<reference path="GameState.ts"/>
///<reference path="PreloaderState.ts"/>
///<reference path="scene/SceneLayoutManager.ts"/>
///<reference path="scene/SceneBuilder.ts"/>
var osrs_chunk;
(function (osrs_chunk) {
    var PreloaderState = osrs_chunk.PreloaderState;
    var GameState = osrs_chunk.GameState;
    function createGame() {
        window['game'] = new osrs_chunk.Game();
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
                parent: 'content'
            };
            _this = _super.call(this, config) || this;
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
 * Created by jespe on 2019-02-13.
 */
/**
 * Created by jespe on 2019-02-13.
 */
var osrs_chunk;
(function (osrs_chunk) {
    var view;
    (function (view) {
        var Menu = /** @class */ (function () {
            function Menu(game) {
                this.game = game;
                var gameWidth = osrs_chunk.gameConfig.gameSize.width;
                var gameHeight = osrs_chunk.gameConfig.gameSize.height;
                // this.menuLayer = SceneBuilder.addGroup('menuLayer', game.scene.topRoot, -gameWidth / 2 , -gameHeight / 2);
                this.menuLayer = view.SceneBuilder.addGroup('menuLayer', game.scene.topRoot, (gameWidth * osrs_chunk.gameConfig.mapAreaScale) - (gameWidth / 2), -gameHeight / 2);
                this.menuLayer.alpha = 0.7;
                var graphics = game.add.graphics(0, 0);
                this.menuLayer.add(graphics);
                graphics.beginFill(0xfffffff, 1);
                graphics.drawRect(0, 0, gameWidth * (1 - osrs_chunk.gameConfig.mapAreaScale), gameHeight);
                graphics.endFill();
                this.selectedTileImage = view.SceneBuilder.addImage('chunkMap', 'chunks', 48, this.menuLayer, 0, 0);
                this.selectedTileImage.anchor.set(0, 0);
                var chunkMap = this.game.scene.chunkMap;
                chunkMap.inputEnabled = true;
                chunkMap.events.onInputDown.add(this.onBoardClick, this);
            }
            Menu.prototype.selectTileBySpriteIndex = function (tileIndex) {
                this.selectedTile = tileIndex;
                this.selectedTileImage.frame = tileIndex;
            };
            Menu.prototype.selectTileByTileIndex = function (tileIndex) {
            };
            Menu.prototype.selectTileByTilePos = function (pos) {
                var widthInTiles = Math.floor(this.game.scene.chunkMap.texture.width / osrs_chunk.gameConfig.chunkSize);
                var heightInTiles = Math.floor(this.game.scene.chunkMap.texture.height / osrs_chunk.gameConfig.chunkSize);
                var tileSpriteIndex = (pos.y * widthInTiles) + pos.x;
                this.selectTileBySpriteIndex(tileSpriteIndex);
                var sprite = this.game.scene.chunkMap;
                var x = sprite.position.x - (sprite.anchor.x * sprite.width);
                var y = sprite.position.y - (sprite.anchor.y * sprite.height);
                var graphics = this.game.add.graphics(x + (osrs_chunk.gameConfig.chunkSize * pos.x), y + (osrs_chunk.gameConfig.chunkSize * pos.y));
                this.game.scene.backGroundLayer.add(graphics);
                graphics.beginFill(0x4CBB17, 0.6);
                graphics.drawRect(0, 0, osrs_chunk.gameConfig.chunkSize, osrs_chunk.gameConfig.chunkSize);
                graphics.endFill();
            };
            Menu.prototype.onBoardClick = function (sprite, pointer) {
                // console.log(arguments);
                var game = this.game;
                console.log(sprite);
                var x = sprite.worldPosition.x - (sprite.anchor.x * sprite.width);
                var y = sprite.worldPosition.y - (sprite.anchor.y * sprite.height);
                var width = sprite.texture.width * sprite.worldScale.x;
                var height = sprite.texture.height * sprite.worldScale.y;
                var onImageY = (pointer.y - y);
                var onImageX = (pointer.x - x);
                var frameWidth = osrs_chunk.gameConfig.chunkSize * sprite.worldScale.x;
                var row = Math.floor((onImageY / frameWidth));
                var column = Math.floor((onImageX / frameWidth));
                // console.log(clickpos);
                console.log('----');
                console.log({ onImageX: onImageX, onImageY: onImageY, row: row, column: column });
                // console.log({x : game.input.x, y : game.input.y});
                this.selectTileByTilePos(new Phaser.Point(column, row));
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
//# sourceMappingURL=game.js.map