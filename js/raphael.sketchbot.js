/**
 * TODO(Huascar) create a project in github with the SketchaBot name.
 */
(function(Raphael){
	/**
	 * Function that creates a SketchaBot instance.
	 * @param paper or editor or canvas where we will sketch a robot
	 * @param options
	 * @return {*}
	 */
	Raphael.sketchabot = function(paper, options) {
		return new SketchaBot(paper, options);
	};

	// Current version.
	Raphael.sketchabot.VERSION = '0.0.1';

	/**
	 * The SketchaBot object.
	 */
	var SketchaBot = function(paper, options) {
		// Use self to reduce confusion about 'this'
		var self = this;
		// TODO(Huascar) include one more option called 'extrude'
		var _options = {
			width: 100,
			height: 100,
			strokes: [],
			editing: true
		};

		jQuery.extend(_options, options);

		// The Raphael context to draw on
		var _paper;
		if(paper.raphael && paper.raphael.constructor == Raphael.constructor){
			_paper = paper;
		} else if(typeof paper == "string"){
			// if you look at ZP's Canvas2D, then this is where he instantiates
			// Raphael.
			_paper = Raphael(paper, _options.width, _options.height)
		} else {
			throw "first argument must be a Raphael object, " +
				  "an element ID, an array with 3 elements";
		}

		// The Raphael SVG canvas. This canvas will later be converted into a shape object
		// that Three.js could understand and render.
		var _canvas = _paper.canvas;

		// The HTML element that contains the canvas.
		var _container = $(_canvas).parent();

		// The HTML element that contains the 3D preview
		var _preview3D   = new Preview3D('viewer3D');


		// The default Pen object
		var _pen = new Pen();

		// Public API
		self.paper = function(){
			return _paper;
		};

		self.canvas = function(){
			return _canvas;
		};

		self.container = function(){
			return _container;
		};

		self.preview3D = function(){
			return _preview3D;
		};

		self.pen = function(value) {
			if(value === undefined) { return _pen; }

			_pen = value;
			return self; // function-chaining
		};

		// Convert an SVG path into a string, so that it's smaller when JSONified.
		// This function is used by json().
		function svg_path_to_string(path) {
			var str = "";
			for (var i = 0, n = path.length; i < n; i++) {
				var point = path[i];
				str += point[0] + point[1] + "," + point[2];
			}
			return str;
		}

		// Convert a string into an SVG path. This reverses the above code.
		function string_to_svg_path(str) {
			var path = [];
			var tokens = str.split("L");

			if (tokens.length > 0) {
				var token = tokens[0].replace("M", "");
				var points = token.split(",");
				path.push(["M", parseInt(points[0]), parseInt(points[1])]);

				for (var i = 1, n = tokens.length; i < n; i++) {
					token = tokens[i];
					points = token.split(",");
					path.push(["L", parseInt(points[0]), parseInt(points[1])]);
				}
			}

			return path;
		}

		// Covert an SVG path to a Three.js's Shape object.
		function svg_path_to_shape(path) {
			var toShape = new SVG2Shape();
			if(path === undefined) { return new THREE.Shape(); }
			return toShape.convert(path);
		}

		// Save our created shape into json for later viewing.
		// This way we could save our models for future use.
		self.json = function(value) {
			if (value === undefined) {
				for (var i = 0, n = _strokes.length; i < n; i++) {
					var stroke = _strokes[i];
					if (typeof stroke.path == "object") {
						stroke.path = svg_path_to_string(stroke.path);
					}
				}
				return JSON.stringify(_strokes);
			}

			return self.strokes(JSON.parse(value));
		};


		self.strokes = function(value) {
			if (value === undefined) {
				return _strokes;
			}
			if (jQuery.isArray(value)) {
				_strokes = value;

				for (var i = 0, n = _strokes.length; i < n; i++) {
					var stroke = _strokes[i];
					if (typeof stroke.path == "string") {
						stroke.path = string_to_svg_path(stroke.path);
					}
				}

				_action_history.add({
					type: "batch",
					strokes: jQuery.merge([], _strokes) // Make a copy.
				});

				_redraw_strokes();
				_fire_change();
			}
			return self; // function-chaining
		};


		self.freeze_history = function() {
			_action_history.freeze();
		};

		self.undoable = function() {
			return _action_history.undoable();
		};

		/**
		 * it undo a stroke made by the user.
		 */
		self.undo = function() {
			if (_action_history.undoable()) {
				_action_history.undo();
				_strokes = _action_history.current_strokes();
				_redraw_strokes();
				_fire_change();
			}
			return self; // function-chaining
		};

		/**
		 * makes the user's actions redoable.
		 */
		self.redoable = function() {
			return _action_history.redoable();
		};

		/**
		 * redoes a previously undoed stroke or an entire shape
		 * after the clear functionality was invoked.
		 */
		self.redo = function() {
			if (_action_history.redoable()) {
				_action_history.redo();
				_strokes = _action_history.current_strokes();
				_redraw_strokes();
				_fire_change();
			}
			return self; // function-chaining
		};

		/**
		 * It clears the strokes made by the user.
		 */
		self.clear = function() {
			_action_history.add({
				type: "clear"
			});

			_strokes = [];
			_redraw_strokes();
			_fire_change();

			return self; // function-chaining
		};


		/**
		 * editing capabilities are trigged. This means the user could now sketch
		 * his/her bot.
		 * @param mode true if the user can now sketch his/her bot. false otherwise.
		 */
		self.editing = function(mode) {
			if (mode === undefined) {
				return _options.editing;
			}

			_options.editing = mode;
			if (_options.editing) {
				if (_options.editing == "erase") {
					// Cursor is crosshair, so it looks like we can do something.
					$(_container).css("cursor", "crosshair");
					$(_container).unbind("mousedown", _mousedown);
					$(_container).unbind("mousemove", _mousemove);
					$(_container).unbind("mouseup", _mouseup);
					$(document).unbind("mouseup", _mouseup);

					// iPhone Events
					unbindIPhoneEventHandlers();
				} else {
					// Cursor is crosshair, so it looks like we can do something.
					$(_container).css("cursor", "crosshair");

					$(_container).mousedown(_mousedown);
					$(_container).mousemove(_mousemove);
					$(_container).mouseup(_mouseup);

					// Handle the case when the mouse is released outside the canvas.
					$(document).mouseup(_mouseup);

					// iPhone Events
					bindIPhoneEventHandlers();
				}
			} else {
				// Reverse the settings above.
				$(_container).attr("style", "cursor:default");
				$(_container).unbind("mousedown", _mousedown);
				$(_container).unbind("mousemove", _mousemove);
				$(_container).unbind("mouseup", _mouseup);
				$(document).unbind("mouseup", _mouseup);

				// iPhone Events
				unbindIPhoneEventHandlers();
			}

			return self; // function-chaining
		};

		function unbindIPhoneEventHandlers() {
			var agent = navigator.userAgent;
			if (agent.indexOf("iPhone") > 0 || agent.indexOf("iPod") > 0) {
				$(_container).unbind("touchstart", _touchstart);
				$(_container).unbind("touchmove", _touchmove);
				$(_container).unbind("touchend", _touchend);
			}
		}

		function bindIPhoneEventHandlers() {
			var agent = navigator.userAgent;
			if (agent.indexOf("iPhone") > 0 || agent.indexOf("iPod") > 0) {
				$(_container).bind("touchstart", _touchstart);
				$(_container).bind("touchmove", _touchmove);
				$(_container).bind("touchend", _touchend);
			}
		}

		// Event changes
		var _changeFn = function(){};
		self.change = function(fn) {
			if(fn == null || fn === undefined){
				_changeFn = function(){};
			} else if(typeof fn == "function"){
				_changeFn = fn;
			}
		};

		function _fire_change(){
			_changeFn();
		}

		// Helper methods

		function _redraw_strokes() {
			_paper.clear();

			for (var i = 0, n = _strokes.length; i < n; i++) {
				var stroke = _strokes[i];
				var type = stroke.type;
				_paper[type]()
					.attr(stroke)
					.click(_pathclick);
				_preview_3D_strokes(stroke);

			}
		}

		function _preview_3D_strokes(stroke) {
			var toShape = new SvgToShape();
			var svg = stroke;
			if(svg){
				var shape = toShape.convert(svg);
				var mesh = new Chassis(shape, 50);
				mesh.rotation.x = Math.PI/2;
				_preview3D.setObject(mesh);
			}
			_preview3D.render();
		}

		function _disable_user_select() {
			$("*").css("-webkit-user-select", "none");
			$("*").css("-moz-user-select", "none");
			if (jQuery.browser.msie) {
				$("body").attr("onselectstart", "return false;");
			}
		}

		function _enable_user_select() {
			$("*").css("-webkit-user-select", "text");
			$("*").css("-moz-user-select", "text");
			if (jQuery.browser.msie) {
				$("body").removeAttr("onselectstart");
			}
		}


		// Event Handlers
		// We can only attach events to the container, so do it.
		function _pathclick(e) {
			if (_options.editing == "erase") {
				var stroke = this.attr();
				stroke.type = this.type;

				_action_history.add({
					type: "erase",
					stroke: stroke
				});

				for (var i = 0, n = _strokes.length; i < n; i++) {
					var s = _strokes[i];
					if (equiv(s, stroke)) {
						_strokes.splice(i, 1);
					}
				}

				_fire_change();

				this.remove();
			}
		}

		function _mousedown(e) {
			_disable_user_select();

			_pen.start(e, self);
		}

		function _mousemove(e) {
			_pen.move(e, self);
		}

		function _mouseup(e) {
			_enable_user_select();

			var path = _pen.finish(e, self);

			if (path != null) {
				// Add event when clicked.
				path.click(_pathclick);

				// Save the stroke.
				var stroke = path.attr();
				stroke.type = path.type;

				_strokes.push(stroke);

				_action_history.add({
					type: "stroke",
					stroke: stroke
				});

				_fire_change();
			}
		}

		function _touchstart(e) {
			e = e.originalEvent;
			e.preventDefault();

			if (e.touches.length == 1) {
				var touch = e.touches[0];
				_mousedown(touch);
			}
		}

		function _touchmove(e) {
			e = e.originalEvent;
			e.preventDefault();

			if (e.touches.length == 1) {
				var touch = e.touches[0];
				_mousemove(touch);
			}
		}

		function _touchend(e) {
			e = e.originalEvent;
			e.preventDefault();

			_mouseup(e);
		}



		// App Bootstrapping
		var _action_history = new ActionHistory();


		// path data
		var _strokes = _options.strokes;
		if (jQuery.isArray(_strokes) && _strokes.length > 0) {
			_action_history.add({
				type: "init",
				strokes: jQuery.merge([], _strokes)	// Make a clone.
			});
			_redraw_strokes();
		} else {
			_strokes = [];
			_redraw_strokes();
		}

		self.editing(_options.editing);
	};

	/**
	 * It renders a 3D representation of the drawn sketch...
	 * @param cont name of the HTML element that will contain the 3D representation.
	 */
	var Preview3D = function(cont) {
		var self = this;
		var container = $('#' + cont);
		var width = container.width();
		var height = container.height();
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
		var rotation = Math.PI/2;
			scene.add(camera);
		var renderer = new THREE.WebGLRenderer();
			renderer.setSize(width, height);
		container.append(renderer.domElement);

		self.updateCameraPosition = function() {
			camera.position.x = Math.cos(rotation)*500;
			camera.position.z = Math.sin(rotation)*500;
			camera.position.y = 50;
			camera.lookAt(new THREE.Vector3(0, 0, 0));
		};

		self.animate = function(){
			rotation += Math.PI / 200;
			this.render();
			var self = this;
			requestAnimationFrame( function() {self.animate();} );
		};

		self.render = function(){
			this.updateCameraPosition();
			renderer.render(scene, camera);
		};

		self.setObject = function(mesh) {
			if(this.object) {
				scene.remove(this.object);
			}

			scene.add(mesh);
			this.object = mesh;
		};
	};

	/**
	 * Svg to Shape converter.
	 */
	var SvgToShape = function(){
		self = this;
		self.convert = function(elem){
			var shape;
			switch(elem.type) {
				case 'path': shape = this.fromPath(elem); break;
				case 'rect': shape = this.fromRect(elem); break;
				case 'circle': shape = this.fromCircle(elem); break;
			}
			return shape;
		};

		self.fromArray = function(path) {
			//var path = elem;
			var shape = new THREE.Shape();
			var start = new THREE.Vector2();
			for(var i = 0; i < path.length; i++)
			{
				var action = path[i];
				switch(action[0]){
					case 'M':
					case 'm':
						shape.moveTo(action[1], action[2]);
						start.set(action[1], action[2]);
						break;
					case 'L':
					case 'l':
						shape.lineTo(action[1], action[2]);
						break;
					case 'Z':
					case 'z':
						shape.lineTo(start.x, start.y);
						break;
				}
			}

			return shape;
		};

		self.fromPath = function(elem){
			if(elem.attrs === undefined) {
				return this.fromArray(elem.path);
			} else {
				return this.fromArray(elem.attrs.path);
			}
		};

	};

	/**
	 * It keeps a history of the strokes made by the user.
	 */
	var ActionHistory = function() {
		var self = this;

		var _history = [];

		// Index of the last state.
		var _current_state = -1;

		// Index of the freeze state.
		// The freeze state is the state where actions cannot be undone.
		var _freeze_state = -1;

		// The current set of strokes if strokes were to be rebuilt from history.
		// Set to null to force refresh.
		var _current_strokes = null;

		self.add = function(action) {
			if (_current_state + 1 < _history.length) {
				_history.splice(_current_state + 1, _history.length - (_current_state + 1));
			}

			_history.push(action);
			_current_state = _history.length - 1;

			// Reset current strokes.
			_current_strokes = null;
		};

		self.freeze = function(index) {
			if (index === undefined) {
				_freeze_state = _current_state;
			} else {
				_freeze_state = index;
			}
		};

		self.undoable = function() {
			return (_current_state > -1 && _current_state > _freeze_state);
		};

		self.undo = function() {
			if (self.undoable()) {
				_current_state--;

				// Reset current strokes.
				_current_strokes = null;
			}
		};

		self.redoable = function() {
			return _current_state < _history.length - 1;
		};

		self.redo = function() {
			if (self.redoable()) {
				_current_state++;

				// Reset current strokes.
				_current_strokes = null;
			}
		};

		// Rebuild the strokes from history.
		self.current_strokes = function() {
			if (_current_strokes == null) {
				var strokes = [];
				for (var i = 0; i <= _current_state; i++) {
					var action = _history[i];
					switch(action.type) {
						case "init":
						case "json":
						case "strokes":
						case "batch":
							jQuery.merge(strokes, action.strokes);
							break;
						case "stroke":
							strokes.push(action.stroke);
							break;
						case "erase":
							for (var s = 0, n = strokes.length; s < n; s++) {
								var stroke = strokes[s];
								if (equiv(stroke, action.stroke)) {
									strokes.splice(s, 1);
								}
							}
							break;
						case "clear":
							strokes = [];
							break;
					}
				}

				_current_strokes = strokes;
			}
			return _current_strokes;
		};
	};

	/**
	 * The default Pen object.
	 */
	var Pen = function(){
		var self = this;

		// since our canvas in black, then default color for Pen is
		// white.
		var _color 		= "#FFFFFF";
		var _opacity 	= 1.0;
		var _width 		= 5;
		var _offset 	= null;

		// Drawing state
		var _drawing 	= false;
		var _c 			= null;
		var _points 	= [];

		self.color = function(value){
			if(value === undefined){
				return _color;
			}

			_color = value;
			return self;
		};

		self.width = function(value){
			if (value === undefined) {
				return _width;
			}

			if (value < Pen.MIN_WIDTH) {
				value = Pen.MIN_WIDTH;
			} else if (value > Pen.MAX_WIDTH) {
				value = Pen.MAX_WIDTH;
			}

			_width = value;

			return self;
		};

		self.opacity = function(value){
			if(value == undefined){ return _opacity	}

			if (value < 0) 		{ value = 0; }
			else if(value > 1) 	{ value = 1; }

			_opacity = value;
			return self;
		};

		self.start = function(e, sketchabot){
			_drawing = true;

			_offset = $(sketchabot.container()).offset();

			var x = e.pageX - _offset.left,
				y = e.pageY - _offset.top;
			_points.push([x, y]);

			_c = sketchabot.paper().path();

			_c.attr({
				stroke: _color,
				"stroke-opacity": _opacity,
				"stroke-width": _width,
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			});
		};

		self.finish = function(e, sketchabot) {
			var path = null;

			if (_c != null) {
				if (_points.length <= 1) {
					_c.remove();
				} else {
					path = _c;
				}
			}

			_drawing = false;
			_c = null;
			_points = [];

			return path;
		};

		self.move = function(e, sketchpad) {
			if (_drawing == true) {
				var x = e.pageX - _offset.left,
					y = e.pageY - _offset.top;
				_points.push([x, y]);
				_c.attr({ path: convertPointsToSVG() });
			}
		};

		function convertPointsToSVG() {
			if (_points != null && _points.length > 1) {
				var p = _points[0];
				var path = "M" + p[0] + "," + p[1];
				for (var i = 1, n = _points.length; i < n; i++) {
					p = _points[i];
					path += "L" + p[0] + "," + p[1];
				}
				return path;
			} else {
				return "";
			}
		}

	};

	Pen.MAX_WIDTH 		= 1000;
	Pen.MIN_WIDTH 		= 1;

}) (window.Raphael);


Raphael.fn.display = function(elements) {
	for (var i = 0, n = elements.length; i < n; i++) {
		var e = elements[i];
		var type = e.type;
		this[type]().attr(e);
	}
};


/**
 * Utility functions to compare objects by Phil Rathe.
 * http://philrathe.com/projects/equiv
 */

// Determine what is o.
function hoozit(o) {
	if (o.constructor === String) {
		return "string";

	} else if (o.constructor === Boolean) {
		return "boolean";

	} else if (o.constructor === Number) {

		if (isNaN(o)) {
			return "nan";
		} else {
			return "number";
		}

	} else if (typeof o === "undefined") {
		return "undefined";

		// consider: typeof null === object
	} else if (o === null) {
		return "null";

		// consider: typeof [] === object
	} else if (o instanceof Array) {
		return "array";

		// consider: typeof new Date() === object
	} else if (o instanceof Date) {
		return "date";

		// consider: /./ instanceof Object;
		//           /./ instanceof RegExp;
		//          typeof /./ === "function"; // => false in IE and Opera,
		//                                          true in FF and Safari
	} else if (o instanceof RegExp) {
		return "regexp";

	} else if (typeof o === "object") {
		return "object";

	} else if (o instanceof Function) {
		return "function";
	} else {
		return undefined;
	}
}

// Call the o related callback with the given arguments.
function bindCallbacks(o, callbacks, args) {
	var prop = hoozit(o);
	if (prop) {
		if (hoozit(callbacks[prop]) === "function") {
			return callbacks[prop].apply(callbacks, args);
		} else {
			return callbacks[prop]; // or undefined
		}
	}
}

// Test for equality any JavaScript type.
// Discussions and reference: http://philrathe.com/articles/equiv
// Test suites: http://philrathe.com/tests/equiv
// Author: Philippe RathÃ© <prathe@gmail.com>

var equiv = function () {

	var innerEquiv; // the real equiv function
	var callers = []; // stack to decide between skip/abort functions


	var callbacks = function () {

		// for string, boolean, number and null
		function useStrictEquality(b, a) {
			if (b instanceof a.constructor || a instanceof b.constructor) {
				// to catch short annotaion VS 'new' annotation of a declaration
				// e.g. var i = 1;
				//      var j = new Number(1);
				return a == b;
			} else {
				return a === b;
			}
		}

		return {
			"string": useStrictEquality,
			"boolean": useStrictEquality,
			"number": useStrictEquality,
			"null": useStrictEquality,
			"undefined": useStrictEquality,

			"nan": function (b) {
				return isNaN(b);
			},

			"date": function (b, a) {
				return hoozit(b) === "date" && a.valueOf() === b.valueOf();
			},

			"regexp": function (b, a) {
				return hoozit(b) === "regexp" &&
					a.source === b.source && // the regex itself
					a.global === b.global && // and its modifers (gmi) ...
					a.ignoreCase === b.ignoreCase &&
					a.multiline === b.multiline;
			},

			// - skip when the property is a method of an instance (OOP)
			// - abort otherwise,
			//   initial === would have catch identical references anyway
			"function": function () {
				var caller = callers[callers.length - 1];
				return caller !== Object &&
					typeof caller !== "undefined";
			},

			"array": function (b, a) {
				var i;
				var len;

				// b could be an object literal here
				if ( ! (hoozit(b) === "array")) {
					return false;
				}

				len = a.length;
				if (len !== b.length) { // safe and faster
					return false;
				}
				for (i = 0; i < len; i++) {
					if( ! innerEquiv(a[i], b[i])) {
						return false;
					}
				}
				return true;
			},

			"object": function (b, a) {
				var i;
				var eq = true; // unless we can proove it
				var aProperties = [], bProperties = []; // collection of strings

				// comparing constructors is more strict than using instanceof
				if ( a.constructor !== b.constructor) {
					return false;
				}

				// stack constructor before traversing properties
				callers.push(a.constructor);

				for (i in a) { // be strict: don't ensures hasOwnProperty and go deep

					aProperties.push(i); // collect a's properties

					if ( ! innerEquiv(a[i], b[i])) {
						eq = false;
					}
				}

				callers.pop(); // unstack, we are done

				for (i in b) {
					bProperties.push(i); // collect b's properties
				}

				// Ensures identical properties name
				return eq && innerEquiv(aProperties.sort(), bProperties.sort());
			}
		};
	}();

	innerEquiv = function () { // can take multiple arguments
		var args = Array.prototype.slice.apply(arguments);
		if (args.length < 2) {
			return true; // end transition
		}

		return (function (a, b) {
			if (a === b) {
				return true; // catch the most you can
			} else if (a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || hoozit(a) !== hoozit(b)) {
				return false; // don't lose time with error prone cases
			} else {
				return bindCallbacks(a, callbacks, [b, a]);
			}

			// apply transition with (1..n) arguments
		})(args[0], args[1]) && arguments.callee.apply(this, args.splice(1, args.length -1));
	};

	return innerEquiv;

}();