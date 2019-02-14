window["osrs_chunk"] = window["osrs_chunk"] || {};

osrs_chunk.requireBaseUrl = osrs_chunk.requireBaseUrl || ".";

requirejs.config({
	baseUrl: "",
	waitSeconds: 0,
	paths: {
		jquery: [
			osrs_chunk.requireBaseUrl + "/libs/jquery/jquery-1.12.0.min"
		],
		easepack: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/easing/EasePack.min"
		],
		timelinemax: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/TimelineMax"
		],
		timelinelite: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/TimelineLite"
		],
		TweenLite: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/TweenLite"
		],
		draggable: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/utils/Draggable.min"
		],
		throwprops: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/ThrowPropsPlugin.min"
		],
		tweenmax: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/TweenMax"
		],
		perfectscrollbar: [
			osrs_chunk.requireBaseUrl + "/libs/jquery/perfect-scrollbar.jquery"
		],
		textfill: [
			osrs_chunk.requireBaseUrl + "/libs/jquery/jquery.textfill.min"
		],
		brim: [
			osrs_chunk.requireBaseUrl + "/libs/brim/brim"
		],
		scream: [
			osrs_chunk.requireBaseUrl + "/libs/scream/scream"
		],
		tappy: [
			osrs_chunk.requireBaseUrl + "/libs/jquery/tappy"
		],
		phaser: [
			osrs_chunk.requireBaseUrl + "/libs/phaser/phaser"
		],
		phaserinput: [
			osrs_chunk.requireBaseUrl + "/libs/phaserinput/phaser-input"
		],
		game: [
			osrs_chunk.requireBaseUrl + "/game"
		],
		preloaderManifest: [
			osrs_chunk.requireBaseUrl + "/preloader_manifest"
		],

		//Pluginstuff
		// jquerygsap:[
		// 	osrs_chunk.requireBaseUrl + "/libs/greensock/jquery.gsap.min"
		// ],
		customease: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/easing/CustomEase.min"
		],
		// attrplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/AttrPlugin.min"
		// ],
		// bezierplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/BezierPlugin.min"
		// ],
		// colorpropsplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/ColorPropsPlugin.min"
		// ],
		CSSPlugin: [
			osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/CSSPlugin.min"
		],
		// cssruleplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/CSSRulePlugin.min"
		// ],
		// directionalrotation: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/DirectionalRotationPlugin.min"
		// ],
		// easel: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/EaselPlugin.min"
		// ],
		// endarray: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/EndArrayPlugin.min"
		// ],
		// modifiersplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/ModifiersPlugin.min"
		// ],
		// pixiplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/PixiPlugin.min"
		// ],
		// raphaelplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/RaphaelPlugin.min"
		// ],
		// roundpropsplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/RoundPropsPlugin.min"
		// ],
		// scrolltoplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/ScrollToPlugin.min"
		// ],
		// textplugin: [
		//     osrs_chunk.requireBaseUrl + "/libs/greensock/plugins/TextPlugin.min"
		// ],
	},
	shim: {
		phaserinput:{
			deps:["phaser"]
		},
		tappy: {
			deps: ["jquery"]
		},
		perfectscrollbar: {
			deps: ["jquery"]
		},
		textfill: {
			deps: ["jquery"]
		},
		game: {
		},
		preloaderManifest: {},

		"spine-ts": {},
		tk_spine: {},
		customease: {},
	}
});

osrs_chunk.loadDependencies = function (ownsPage, callback) {
	if (!ownsPage) {
		throw new Error("Embedded in div is not supported at the moment.");
	} else {
		//We own the index.html page.
		require(["preloaderManifest"], function () {
			require(["jquery", "phaser"], function () {
				require(["tappy", 'TweenLite', "tweenmax", "timelinemax", "draggable", "throwprops", "easepack", "brim", "scream", "perfectscrollbar", "textfill",
					"phaserinput",
					"customease", "CSSPlugin"], function () {
					// "jquerygsap","customease","attrplugin","bezierplugin","colorpropsplugin","cssplugin","cssruleplugin","directionalrotation","easel","endarray","modifiersplugin","pixiplugin","raphaelplugin","roundpropsplugin","scrolltoplugin","textplugin" ], function () {
					require(["game"], function () {
						callback();
					});
				});
			});
		});
	}
}