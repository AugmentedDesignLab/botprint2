function ChassisErrorHandler(view, options) {
	var self = {
		appEvents: ['chassisSelfIntersecting', 'chassisValidated'],
		
		chassisSelfIntersecting: function(payload) {
			view.warn();
		},
		
		chassisValidated: function(payload) {
			view.diswarn();
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}