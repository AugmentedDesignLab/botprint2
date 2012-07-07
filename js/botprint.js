/**
 * Botprint functionality
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
(function(){
	/**
	 * @return Botprint object
	 */
	botprint = function(){
		return new Botprint();
	};

	// Current version.
	botprint.VERSION = '0.0.2';

	/**
	 * The Botprint object.
	 */
	var Botprint = function() {
		// Use self to reduce confusion about 'this'
		var self 	 = this;

		// internal vars
		var eventBus	= EventBus();
		var canvas  	= Canvas2D({elemID: 'canvas2d', bus: eventBus});
		var preview 	= Preview3D({elemID:'preview3d', bus: eventBus});
		var sidePanel	= SidePanel({elemClass: 'palette-set a', bus: eventBus});
		var running 	= true;

		var $container 	= $('#container');

		var width		= $container.width(),
			height		= $container.height();

		var $gui		= $('#palette');

		// predefined shape to be previewed by the Botprint app
		var geometry = new THREE.CubeGeometry( 100, 100, 100 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
		var mesh 	 = new THREE.Mesh( geometry, material );



		/**
		 * Pauses the 3D preview animation
		 */
		self.pause = function() {
			running = false;
		};

		/**
		 * Plays the 3D preview animation
		 */
		self.play = function() {
			// init whatever we need, man!
			self.init();
			if(!running) {
				running = true;
				preview.animate();
			} else {
				preview.animate();
			}
		};

		/**
		 * Initializes the Botprint experiment and kicks everything off. Yay!
		 */
		self.init = function() {
			// create our stuff
			if(window.WebGLRenderingContext) {
				$gui.addClass('live');
			} else {
				$('html').removeClass('webgl').addClass('no-webgl');
			}
		};
	};
})();

// Surfaceize!
$(document).ready(function(){
	if(Modernizr.webgl) {
		// Go!
		var main = botprint();
		main.play();
	}
});
