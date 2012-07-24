/**
 * @author Zhongpeng Lin
 */
function AddingWheelHandler(view, options) {
	var self = {
		userEvents: ['click'],

		click: function(payload) {
			var x = RelativeCoordEvent(payload.event).relativeX;
			var y = RelativeCoordEvent(payload.event).relativeY;
			var svg = view.draw.rect(x - Spec.wheel.width /2, y - Spec.wheel.radius,
				Spec.wheel.width, Spec.wheel.radius * 2, 5);
			svg.attr(view.shapeAttributes);

			var wheel = Wheel2D(svg, {app: options.app});
//                        var wheel = Wheel({coordinates: wheel2D.position});
			options.app.trigger(ApplicationEvents.wheelUpdated,
                            {id: wheel.id, position: wheel.position});
		}
	};

	Mixable(self).mix(EventHandler(view, options));
	return self;
}
