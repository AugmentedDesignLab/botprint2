/**
 * A helper script that uses yepnope.js resource loader to load all our
 * js and css resources.
 *
 * Note: Even thought I can load all resources
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */

// todo(Huascar) this is a temp sol until I learn how to use yepnope's filters.
// once I learned them, I will create a filter that will inject the paths.
var paths = {
	'vendor': 		'js/vendor',
	'spi': 			'js/botprint/spi',
	'controller': 	'js/botprint/controller',
	'view': 		'js/botprint/view'
};

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
					yepnope(paths['vendor'] + '/jquery-1.7.2.min.js')
				}
			}
		},
		{
			// loading drawing and 3D previewing functionality
			load: {
				'raphael': paths['vendor'] + '/raphael.js',
				'three':   paths['vendor'] + '/Three.js'
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
				paths['spi'] + '/Enumerable.js',
				paths['spi'] + '/Arrays.js',
				paths['spi'] + '/Bindable.js',
				paths['spi'] + '/EventBus.js',
				paths['spi'] + '/Events.js',
				// controllers
				paths['controller'] + '/EventHandler.js',
				paths['controller'] + '/SidePanelHandler.js',
				paths['controller'] + '/SketchingHandler.js',
				paths['controller'] + '/DraggingHandler.js',
				paths['controller'] + '/EditingHandler.js',
				paths['controller'] + '/Preview3DHandler.js',
				// views
				paths['view'] + '/View.js',
				paths['view'] + '/Canvas2D.js',
				paths['view'] + '/Preview3D.js',
				paths['view'] + '/SVG2Shape.js',
				paths['view'] + '/Chassis3D.js',
				paths['view'] + '/SidePanel.js',
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