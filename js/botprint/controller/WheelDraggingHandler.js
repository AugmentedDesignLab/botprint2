function WheelDraggingHandler(view, options) {
	var self = {
		dragEnd: function(payload) {
			self.super.dragEnd(payload);
                        var wheel = Wheel({coordinates: view.position, id: view.id, app: options.app});
			wheel.update();
		}
	};
	Mixable(self).mix(DraggingHandler(view, options));
	return self;
}
