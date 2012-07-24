function WheelDraggingHandler(view, options) {
	var self = {
		dragEnd: function(payload) {
			self.super.dragEnd(payload);
			options.app.trigger(ApplicationEvents.wheelUpdated, {wheel: view});
		}
	};
	Mixable(self).mix(DraggingHandler(view, options));
	return self;
}
