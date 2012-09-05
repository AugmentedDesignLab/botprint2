function WheelValidationHandler(view, options) {
	var normalColor = view.color;
	var self = {
		appEvents: ['wheelsOverlapping'],
		wheelsOverlapping: function(payload) {
			if(payload.wheels.indexOf(view.id) >= 0 ) {
				view.color = 'red';
			} else {
				view.color = normalColor;
			}
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}

