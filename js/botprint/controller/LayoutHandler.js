/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function LayoutHandler(view, options) {
	var radio 		= options.app;

	// Helper object that encapsulates a result
	var Result = function(a, c) {
		return {
			x:a.x,
			y:a.y,
			w:a.w,
			h:a.h,
			cartoon: c
		}
	};

	// Helper Object for caching the layout and its view
	var Cache		= function(deck2D, outline) {
		return {
			deck2D:  deck2D  || {remove: function(){}},
			outline: outline || {delete: function(){}},
			update: function(deck2D, outline) {
				this.deck2D 	= deck2D;
				this.outline	= outline;
			}
		};
	};

	var Vertices = function(path){
		var result  = new Points();
		var len     = path.length;
		for(var i = 0; i < len; i++){
			if(i === len-1) break;
			var element = path[i];
			var plen    = element.length;
			var point = Point.make(element[plen - 2], element[plen - 1]);
			result.addIfAbsent(point);
		}
		return result;
	};

	var Data	  = function(innerRectangle, vertices, radio, N){
		var parts = MakeParts( { app: radio} );
		N = N || 5;
		return {
			n:N,
			d:Math.ceil(Math.max (innerRectangle.width (), innerRectangle.height ()) / N),
			polygon:innerRectangle,
			clusters:parts,
			app:radio,
			coordinates:{x:innerRectangle.topLeft ().x, y:innerRectangle.topLeft ().y  },
			dimensions:{w:innerRectangle.width (), h:innerRectangle.height (), d:0}
		};
	};



	var Payload = function(parts, optarea, radio){
		var N  		 = 10;
		var space    = Math.floor(optarea.area.topLeft().distanceTo(optarea.area.topRight())/N);
		return {
			max: N,
			angle: optarea.angle,
			area: optarea.area,
			path: optarea.path,
			wheels: parts.select(function(each){ return each.name == "Wheel";  }),
			sensors:parts.select(function(each){ return each.name == "Sensor"; }),
			servos: parts.select(function(each){ return each.name == "Servo"; }),
			cpu:    parts.select(function(each){ return each.name == "Microcontroller"; })[0],
			battery:parts.select(function(each){ return each.name == "BatteryPack"; })[0],
			space: space,
			app:radio,
			coordinates:{x:optarea.area.topLeft ().x, y:optarea.area.topLeft ().y  },
			dimensions:{w:optarea.area.width (), h:optarea.area.height (), d:0}
		};
	};


	var vop = Cache();

	var self = {
		appEvents: ['partUpdated', 'layoutUpdated', 'layoutDeleted'],
		partUpdated: function(payload) {
			var attr = JSON.parse(payload.part);
			self.clear();
			var chassisModel	= Chassis(attr);

			var parts 	 = MakeParts({app: radio});
			var optarea  = FindTightGridArea(view.draw, chassisModel, 0);
			var rect     = optarea.area;
			InR({rect: rect});
			optarea.area = rect.inner;
			var data     = Payload(parts, optarea, radio);
			var solution = HillClimbing(data).solve();
			var outline  = PackIt(data, solution);

			self.generateLayout(view.draw, outline, optarea.angle);
		},

		// similar to sketching handler, this handler handles the generation of layout.
		generateLayout: function(paper, outline, angle){
			var radio       = outline.radio;
			var peripheral  = paper.set(); // use sets to group independent svgs...
			var core        = paper.set();

			var climb       = 35;
			var slide       = 10;

			function initial(name){
				switch(name){
					case "Microcontroller": return "c";
					case "BatteryPack": return "p";
					case "Wheel": return "b";
					case "Servo": return "f";
					case "Sensor": return "s";
				}
			}

			outline.select().forEach(function(each){
				// get random color
				var color = Raphael.getColor();
				var name  = each.name;
				var isCPUorPack = name == "Microcontroller" || name == "BatteryPack";
				// since wheels don't have a w and h, we do this.
				var width  = name == "Wheel" || name == "Sensor"  ? each.w : each.part.w;
				var height = name == "Wheel" || name == "Sensor"  ? each.h : each.part.h;
				if(!isCPUorPack){
					peripheral.push(
						paper.rect(
							each.x, each.y + climb,
							width, height
						).attr({fill: color, stroke: color}).transform("r" + angle)
					);

					peripheral.push(
						paper.text(
							each.center.x,
							each.center.y + climb,
							initial(name)
						).attr({fill: '#ffffff', 'font-size':'14px'})
					);

				} else {
					// excluding the cpu and battery pack seems to be play nicer than
					// applying an angle > 0, especially since they live close to the center.

					core.push(
						paper.rect(
							each.x + slide, each.y,
							width, height
						).attr({fill: color, stroke: color}).transform("r" + 0)
					);

					// since we are dealing with actual w and h of the robot part, then for placing
					// the text indicator, we need to recalculate the center, so that we can
					// accurately place this text.
					var center = CalculateCenter(
						Point.make(each.x + slide, each.y),
						Point.make(each.x + each.part.w + slide, each.y + each.part.h)
					);
					core.push(
						paper.text(
							center.x,
							center.y,
							initial(name)
						).attr({fill: '#ffffff', 'font-size':'14px'})
					);


				}

			});

			var allTogether = peripheral.push(core);
			var rendered = Result(outline, allTogether);
			// show layout on canvas
			var deck2D 		= Deck2D(rendered, {app: radio});

			// inform interested parties.
			outline.update();
			vop.update(deck2D, outline);
		},

		layoutUpdated: function(payload) {
			console.log("Layout Has Been Updated!")
		},

		clear: function (){
			vop.deck2D.remove();
			vop.outline.delete();
		},

		layoutDeleted: function(payload) {
			console.log("Layout Has Been Deleted!")
		}
	};

	Mixable(self).mix(EventHandler(view, options));
	return self;
}