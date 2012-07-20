/**
 * @author Zhongpeng Lin
 */
function AddingWheelHandler(view, options) {
	var wheelDef = {
		width: 30,
		height: 60,
		radius: 5,
	};
	
	var self = {
		userEvents: ['click'],

		click: function(payload) {
			var x = CurrentEvent(payload.event).currentX;
			var y = CurrentEvent(payload.event).currentY;
			var svg = view.draw.rect(x - wheelDef.width/2, y - wheelDef.height/2,
				wheelDef.width, wheelDef.height, wheelDef.radius);
			svg.attr(view.shapeAttributes);

			var wheel = Wheel2D(svg, {app: options.app});
			options.app.trigger(ApplicationEvents.wheelUpdated, {wheel: wheel});
		}
	};

	Mixable(self).mix(EventHandler(view, options));
	return self;
}
