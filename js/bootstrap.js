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
					yepnope('vendor/jquery-1.7.2.min.js')
				}
			}
		},
		{
			// loading drawing and 3D previewing functionality
			load: {
				'raphael': 'vendor/raphael.js',
				'three':   'vendor/Three.js'
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
				'spi/Enumerable.js',
				'spi/Arrays.js',
				'spi/Bindable.js',
				'spi/EventBus.js',
				'spi/Events.js',
				// controllers
				'controller/EventHandler.js',
				'controller/SidePanelHandler.js',
				'controller/SketchingHandler.js',
				'controller/DraggingHandler.js',
				'controller/EditingHandler.js',
				'controller/Preview3DHandler.js',
				// views
				'views/View.js',
				'views/Canvas2D.js',
				'views/Preview3D.js',
				'views/SVG2Shape.js',
				'views/Chassis3D.js',
				'views/SidePanel.js',
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