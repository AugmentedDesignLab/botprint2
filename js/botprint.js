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
		var canvas  	= new Canvas2D({elemID: 'canvas2d', bus: eventBus});
		var preview 	= new Preview3D({elemID:'preview3d', bus: eventBus});
		var running 	= true;
		var previewing 	= true;

		var vars		= []; // this will contain the choices we have made in the side bar
		var sidePanelController = SidePanelHandler(View({bus: eventBus}), {canvas: canvas,
			checkforChassisExistence: checkforChassisExistence,
			updateCanvasHandler: updateCanvasHandler,
			vars: vars,
			bus: eventBus});
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
			// set up our initial vars
			vars["shape"]				= "Free";
			vars["color"]				= "#00FF00";
			vars["wheelsLocation"]		= false;
			vars["show3dPreview"]		= true;
			vars["sketching"]			= true;

			// create our stuff
			if(bootstrapCanvas2D()) {
				setupUIComponents();
				$gui.addClass('live');
			} else {
				$('html').removeClass('webgl').addClass('no-webgl');
			}
		};

		/**
		 * This function will be used to
		 * @return {Boolean}
		 */
		function bootstrapCanvas2D() {
			// add listeners
			addEventListeners();

			canvas.width  = width;
			canvas.height = height;
			return true;
		}

		function addEventListeners() {
			// window event
			$(window).resize(callbacks.windowResize);

			// GUI events
			$(".palette-set a").click(sidePanelController.onClick);
			$(".palette-set a.default").trigger('click');
		}

		/**
		 * Creates the objects we need to make the UI nicer.
		 */
		function setupUIComponents() {
			// todo(Huascar) improve UI. low priority
		}

		function checkforChassisExistence(elem, varName, varVal) {
			if(!elem){
				if(varName == "wheelsLocation" && varVal == true){
					alert("You must sketch a chassis before providing wheels.");
					return false;
				}

				if(varName == "transform" && varVal == false){
					alert("You must sketch a shape before start editing.");
					return false;
				}
			}

			return true;
		}

		function updateCanvasHandler (){
			var opts = {
				stroke: "#F8F8F8 ",
				"stroke-opacity": 1,
				fill: vars["color"],
				"stroke-width": 2,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			};

			previewing = vars["show3dPreview"];
			
			var handler =  pickHandler({
				shape: vars["shape"], 
				wheels: vars["wheelsLocation"],
				sketching: vars["sketching"],
				shapeAttributes: opts,
				canvas: canvas});
			canvas.setHandler(handler);
		}
		
		function pickHandler(options){
			var constructor;
			if(options.sketching){
				constructor = SketchingHandler;
			} else {
				constructor = EditingHandler;
			}
			return constructor(canvas, {shapeAttributes: options.shapeAttributes});
		}	


		/**
		 * Our internal callbacks object - a neat
		 * and tidy way to organise the various
		 * callbacks in operation.
		 */
		callbacks = {
			windowResize: function() {
				width			= $container.width();
				height			= $container.height();
			},
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
