/**
 * A helper script that uses yepnope.js resource loader to load all our
 * js and css resources.
 *
 * Note: Even thought I can load all resources
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
yepnope(
	[
		{
			// loading css files
			load: 'css/botprint.css',
			complete: function() {
				console.log("Everything in CSS has been loaded!");
			}
		},
		{
			// loading JQuery stuff
			load: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
			complete: function() {
				if(!window.JQuery){
					console.log("loading local version");
					yepnope('js/vendor/jquery-1.7.2.min.js')
				}
			}
		},
		{
			// loading drawing and 3D previewing functionality
			load: {
				'raphael': 'js/vendor/raphael.js',
				'three':   'js/vendor/Three.js'
			},
			callback: {
				'raphael': function(){ console.log("Raphael.js loaded!"); },
				'three':   function(){ console.log("Three.js loaded!");   }
			}
		},
		{
			// loading botprint app
			load: [
				// spi
				"js/botprint/spi/Enumerable.js",
				"js/botprint/spi/Arrays.js",
				"js/botprint/spi/Bindable.js",
				"js/botprint/spi/EventBus.js",
				"js/botprint/spi/Events.js",
				// controllers
				"js/botprint/controller/EventHandler.js",
				"js/botprint/controller/SidePanelHandler.js",
				"js/botprint/controller/SketchingHandler.js",
				"js/botprint/controller/DraggingHandler.js",
				"js/botprint/controller/EditingHandler.js",
				"js/botprint/controller/Preview3DHandler.js",
				// views
				"js/botprint/view/View.js",
				"js/botprint/view/Canvas2D.js",
				"js/botprint/view/Preview3D.js",
				"js/botprint/view/SVG2Shape.js",
				"js/botprint/view/Chassis3D.js",
				"js/botprint/view/SidePanel.js",
				// scripts concatenated and minified via build script
				"js/plugins.js",
				"js/botprint.js"

			],
			complete: function(){
				console.log("Everything in SPI has been loaded!");
			}
		},
		{
			// extra scripts, such as Twitter widgets js
			load:'http://platform.twitter.com/widgets.js',
			complete: function() {
				console.log("Everything from widgets.js has been loaded!");
			}
		}
	]
);