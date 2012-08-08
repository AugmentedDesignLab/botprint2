/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function LayoutHandler(view, options) {
	var radio 		= options.app;
	var bus			= view.bus;

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

	var vop = Cache();

	var self = {
		appEvents: ['chassisShapeUpdated', 'layoutUpdated', 'layoutDeleted'],
		chassisShapeUpdated: function(payload) {
			self.clear();
			var chassisModel = Chassis(payload);

			// todo (Huascar)
			// 1. Get points
			// 2. Find Max Rectangle, which will set the dimensions of a deck.
			// 	   2.1. (not yet implemented) Run the algo on every point and pick the one with less violations-> Render svg
			// 3. Make needed parts
			// 4. Pack Layout (aka make layout)
			// 5. pass svg to Layout2D
			// 6. update layout domain object (call update())

			var points 		= chassisModel.vertices;
			var max			= FindMaxRectangle({corners: points});
			var parts       = MakeParts({app: radio, bus: bus});

			var outline	= PackLayout({app: radio, bus: bus, rect: max, parts: parts, name: "Bottom"});

			var rendered	= RenderLayout({paper: view.draw, layout: outline}); // return {view.draw.set(), text};

			// show layout on canvas
			var deck2D 		= Deck2D(rendered, {app: radio, bus:bus});

			// inform interested parties.
			outline.update();

			vop.deck2D 	= deck2D;
			vop.outline	= outline;
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