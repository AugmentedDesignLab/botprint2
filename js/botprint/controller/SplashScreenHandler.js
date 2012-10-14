function SplashScreenHandler(view, options) {
	var self = {
		userEvents: ['click'],
		click: function(payload) {
			view.elem.close();
			options.app.trigger(ApplicationEvents.chassisSelected, {path: payload.target.attrs.path});
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}