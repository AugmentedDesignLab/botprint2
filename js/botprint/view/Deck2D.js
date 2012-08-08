/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Deck2D(rendered, options) {
	var cartoon = rendered.cartoon;

	var self = {
		elem: 		cartoon,
		handlers: 	[],

		get position() {
			return {x: rendered.x, y: rendered.y};
		},

		set position(pos) {
			cartoon.attr({cx: pos.x, cy: pos.y});
		},

		highlight: function() {
			cartoon.animate({"fill-opacity": .2}, 200);
		},

		lowlight: function() {
			cartoon.animate({"fill-opacity": .4}, 200);
		}
	};

	Mixable(self).mix(View(options));

	// making it hoverable
	self = Hoverable2D(self);
	var hovering = HoveringHandler(self, options);
	hovering.enable();
	self.handlers.push(hovering);
	// making it removable
	self = Removable2D(self);
	return self;
}