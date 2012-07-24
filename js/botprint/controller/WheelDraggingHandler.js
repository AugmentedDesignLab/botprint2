function WheelDraggingHandler(view, options) {
	var self = {
		dragEnd: function(payload) {
			self.super.dragEnd(payload);
			options.app.trigger(ApplicationEvents.wheelUpdated,
                            {position: view.position, id: view.id});
		}
	};
	Mixable(self).mix(DraggingHandler(view, options));
	return self;
}
