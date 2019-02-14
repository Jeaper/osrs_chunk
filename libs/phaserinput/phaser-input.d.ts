declare module PhaserInput {
	enum InputType {
		text = 0,
		password = 1,
		number = 2,
	}
	class InputElement {

		public value : string;

		public readonly hasSelection : boolean;
		public readonly caretStart : number;
		public readonly caretEnd : number;
		private element;
		private keyUpCallback;
		private inputChangeCallback;
		private type;
		private id;
		private game;
		private focusIn;
		private focusOut;

		constructor(game : Phaser.Game, id : string, type? : InputType, value? : string, focusIn? : Phaser.Signal, focusOut? : Phaser.Signal);

		public addKeyUpListener(callback : () => void) : void;

		public blockKeyDownEvents() : void;

		public unblockKeyDownEvents() : void;

		public removeEventListener() : void;

		public destroy() : void;

		public setMax(max : string, min? : string) : void;

		public focus() : void;

		public blur() : void;

		public getCaretPosition() : number;

		public setCaretPosition(pos : number) : void;

		private preventKeyPropagation(evt);
	}
}
declare module PhaserInput {
	enum ForceCase {
		none = 0,
		lower = 1,
		upper = 2,
	}
	interface InputOptions extends Phaser.PhaserTextStyle {
		x? : number;
		y? : number;
		placeHolder? : string;
		fillAlpha? : number;
		width? : number;
		height? : number;
		padding? : number;
		borderWidth? : number;
		borderColor? : string;
		borderRadius? : number;
		cursorColor? : string;
		placeHolderColor? : string;
		type? : InputType;
		forceCase? : ForceCase;
		min? : string;
		max? : string;
		textAlign? : string;
		selectionColor? : string;
		zoom? : boolean;
	}
	class InputField extends Phaser.Sprite {
		public focusOutOnEnter : boolean;
		public value : string;
		public blockInput : boolean;
		public focusIn : Phaser.Signal;
		public focusOut : Phaser.Signal;
		public width : number;
		private placeHolder;
		private box;
		private textMask;
		private focus;
		private cursor;
		private text;
		private offscreenText;
		private inputOptions;
		private domElement;
		private selection;
		private windowScale;

		private blink;
		private cnt;

		constructor(game : Phaser.Game, x : number, y : number, inputOptions? : InputOptions);

		public update() : number;

		public endFocus() : void;

		public startFocus() : void;

		public destroy(destroyChildren? : boolean) : void;

		public resetText() : void;

		public setText(text? : string) : void;

		private updateTextAlignment();

		private checkDown(e);

		private keyUpProcessor();

		private updateText();

		private updateCursor();

		private getCaretPosition();

		private setCaretOnclick(e);

		private updateSelection();

		private zoomIn();

		private zoomOut();

		private keyListener(evt);

		private getFormattedText(text);
	}
}
declare module PhaserInput {
	class InputBox extends Phaser.Graphics {
		private bgColor;
		private borderRadius;
		private borderColor;
		private borderWidth;
		private boxAlpha;
		private boxHeight;
		private padding;
		private boxWidth;

		constructor(game : Phaser.Game, inputOptions : InputOptions);

		public resize(newWidth : number) : void;

		private drawBox();
	}
}
declare module PhaserInput {
	class SelectionHighlight extends Phaser.Graphics {
		private inputOptions;

		constructor(game : Phaser.Game, inputOptions : InputOptions);

		public updateSelection(rect : PIXI.Rectangle) : void;

		public static rgb2hex(color : {
			r : number;
			g : number;
			b : number;
			a : number;
		}) : number;
	}
}
declare module PhaserInput {
	class TextMask extends Phaser.Graphics {
		private maskWidth;
		private maskHeight;

		constructor(game : Phaser.Game, inputOptions : InputOptions);

		public resize(newWidth : number) : void;

		private drawMask();
	}
}
declare module PhaserInput {
	let Zoomed : boolean;
	let KeyboardOpen : boolean;
	const onKeyboardOpen : Phaser.Signal;
	const onKeyboardClose : Phaser.Signal;
	interface InputFieldObjectFactory extends Phaser.GameObjectFactory {
		inputField : (x : number, y : number, inputOptions? : PhaserInput.InputOptions, group? : Phaser.Group) => PhaserInput.InputField;
	}
	interface InputFieldObjectCreator extends Phaser.GameObjectCreator {
		inputField : (x : number, y : number, inputOptions? : PhaserInput.InputOptions) => PhaserInput.InputField;
	}
	interface InputFieldGame extends Phaser.Game {
		add : InputFieldObjectFactory;
		make : InputFieldObjectCreator;
	}
	class Plugin extends Phaser.Plugin {
		public static Zoomed : boolean;
		public static KeyboardOpen : boolean;
		public static onKeyboardOpen : Phaser.Signal;
		public static onKeyboardClose : Phaser.Signal;

		constructor(game : Phaser.Game, parent : Phaser.PluginManager);

		private addInputFieldFactory();
	}
}
