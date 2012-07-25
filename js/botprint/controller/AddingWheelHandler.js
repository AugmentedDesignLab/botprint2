/**
 * @author Zhongpeng Lin
 */
function AddingWheelHandler(view, options) {
	var self = {
		userEvents: ['click'],

		click: function(payload) {
			var x = payload.x;
			var y = payload.y;
			var svg = view.draw.rect(x - Spec.wheel.width /2, y - Spec.wheel.radius,
				Spec.wheel.width, Spec.wheel.radius * 2, 5);
			svg.attr(view.shapeAttributes);

			var wheel2D = Wheel2D(svg, {app: options.app});
                        var wheel = Wheel({coordinates: wheel2D.position, id: wheel2D.id, app: options.app});
			wheel.update();
		}
	};

	Mixable(self).mix(EventHandler(view, options));
	return self;
}
