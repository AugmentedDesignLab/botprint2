/**
 * SketchaBot functionality
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
(function(){
	/**
	 * @return SketchaBot object
	 */
	sketchabot = function(){
		return new SketchaBot();
	};

	// Current version.
	sketchabot.VERSION = '0.0.1';

	/**
	 * The SketchaBot object.
	 */
	var SketchaBot = function() {
		// Use self to reduce confusion about 'this'
		var self 	 = this;

		// internal vars
		var canvas  	= new Canvas2D('canvas2d');
		var preview 	= new Preview3D('preview3d');
		var running 	= true;
		var previewing 	= true;

		var vars		= []; // this will contain the choices we have made in the side bar
		var $container 	= $('#container');

		var width		= $container.width(),
			height		= $container.height();

		var $gui		= $('#palette');

		// predefined shape to be previewed by the SketchaBot app
		var geometry = new THREE.CubeGeometry( 100, 100, 100 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
		var mesh 	 = new THREE.Mesh( geometry, material );

		preview.setObject(mesh);


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

			setInterval(function(){
				//  Previews the 3d shape as long as it is indicated.
				// 	This interval will give the browser chance to
				//  extrude the shape object
				if(previewing){
					self.preview();
				}
			}, 100);
		};

		/**
		 * Previews the sketch in 3D.
		 */
		self.preview = function(){
			var svgs = canvas.svgs;
			if(svgs.length > 0){
				var mesh = new Chassis(svgs, 50);
				mesh.rotation.x = Math.PI/2;
				preview.setObject(mesh);
			}
		};

		/**
		 * Initializes the SketchaBot experiment and kicks everything off. Yay!
		 */
		self.init = function() {
			// set up our initial vars
			vars["shape"]				= "Free";
			vars["color"]				= "#00FF00";
			vars["wheelsLocation"]		= false;
			vars["show3dPreview"]		= true;
			vars["transform"]			= true;

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
			$(".palette-set a").click(callbacks.guiClick);
			$(".palette-set a.default").trigger('click');
		}

		/**
		 * Creates the objects we need to make the UI nicer.
		 */
		function setupUIComponents() {
			// todo(Huascar) improve UI. low priority
		}

		function checkforChassisExistence(elems, varName, varVal) {
			if(elems.length == 0){
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
			var color, shape, wheels, preview, transform;
			shape   	= vars["shape"];
			color   	= vars["color"];
			wheels  	= vars["wheelsLocation"];
			preview 	= vars["show3dPreview"];
			transform	= vars["transform"];

			var opts = {
				stroke: "#F8F8F8 ",
				"stroke-opacity": 1,
				fill: color,
				"stroke-width": 2,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			};

			previewing = preview;

			switch(shape){
				case "Free":
					canvas.setOptions(opts);
					canvas.setHandler(wheels ? CircleHandler : FreeShapeHandler);
					break;
				case "Square":
					canvas.setOptions(opts);
					canvas.setHandler(wheels ? CircleHandler : RectangleHandler);
					break;
				case "Polygon":
					canvas.setOptions(opts);
					canvas.setHandler(wheels ? CircleHandler : PolygonHandler);
					break;
				default : alert("Unable to find selected shape.");
			}
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

			guiClick:function() {
				var $this 	= $(this),
					varName	= $this.data("guivar");
				var varVal  = $this.data ("guival");


				checkforChassisExistence(canvas.svgs, varName, varVal);

				vars[varName] = varVal;

				$this.siblings().addClass('disabled');
				$this.removeClass('disabled');

				updateCanvasHandler();

				return false;
			}
		};
	};
})();

// Surfaceize!
$(document).ready(function(){
	if(Modernizr.webgl) {
		// Go!
		var sketchaBot = sketchabot();
		sketchaBot.play();
	}
});
