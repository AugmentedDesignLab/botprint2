function Canvas2DHandler(view, options) {
	var self = {
		appEvents: ['chassisSelected'],
		
		chassisSelected: function(payload) {
			var shape = view.draw.path(payload.path);
			shape.attr(view.shapeAttributes);
			
			var chassis2D = Chassis2D(shape, {app:options.app});
			var corners   = Corners(shape);
			view.doneSketching(chassis2D);
			var chassis = Chassis(
				{
					corners: corners,
					path: shape.attrs.path,
					transform: shape.transform(),
					app: options.app,
					id: chassis2D.id
				});

			chassis.create();
		}
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}