/**
 * SketchaBot functionality
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
var BOTPRINT = BOTPRINT || {};

BOTPRINT.SketchaBot = new function() {
	// Use self to reduce confusion about 'this'
	var self 	 = this;

	// internal vars
	var canvas  = new Canvas2D('canvas2d');
	var preview = new Preview3D('preview3d');
	var running = true;
	var vars	= []; // this will contain the choices we have made in the side bar

	var $container 	= $('#container');

	var width			= $container.width(),
		height			= $container.height();

	var $gui		= $('#gui');

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
	};

	/**
	 * previews the sketch in 3D.
	 */
	self.preview = function(){
		var toShape = new SVG2Shape();
		var svg = canvas.getCurrentShape();
		if(svg){
			var shape = toShape.convert(svg);
			var mesh = new Chassis(shape, 50);
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

		// add listeners
		addEventListeners();

		// create our stuff
		if(bootstrapCanvas2D()) {
			setupUIComponents();
			$gui.addClass('live');
		} else {
			$('html').removeClass('webgl').addClass('no-webgl');
		}
	};

	function bootstrapCanvas2D() {
		// TODO(Huascar) refactor this class around canvas2d
		canvas.width  = width;
		canvas.height = height;
		return true;
	}

	function addEventListeners() {
		// window event
		$(window).resize(callbacks.windowResize);

		// GUI events
		$(".gui-set a").click(callbacks.guiClick);
		$(".gui-set a.default").trigger('click');
	}

	/**
	 * Creates the objects we need
	 */
	function setupUIComponents() {
		// todo(Huascar) improve UI
	}

	/**
	 * Simple handler function for the events we don't care about.
	 * //todo(Huascar) use this method for DnD functionality....to code soon.
	 */
	function cancel(event) {
		if(event.preventDefault) {
			event.preventDefault();
		}

		return false;
	}


	function updateCanvasHandler (shape, color, wheels, preview){
		var opts = {
			stroke: "#F8F8F8 ",
			"stroke-opacity": 1,
			fill: color,
			"stroke-width": 2,
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		};
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
			if(camera)
			{
				width			= $container.width(),
				height			= $container.height()
			}
		},

		guiClick:function() {
			var $this 	= $(this),
				varName	= $this.data("guivar"),
				varVal	= $this.data("guival");
			if(vars[varName] !== null) {
				vars[varName] = varVal;
			}

			$this.siblings().addClass('disabled');
			$this.removeClass('disabled');

			// TODO(Huascar) refactor this....there is a better way to do this.
			updateCanvasHandler(vars["shape"], vars["color"], vars["wheelsLocation"], vars["show3dPreview"]);

			return false;
		}
	};
};

// Surfaceize!
$(document).ready(function(){

	if(Modernizr.webgl) {
		// Go!
		BOTPRINT.SketchaBot.play();
	}
});
