function ChassisValidationHandler(view, options) {
	var self = {
		appEvents: ['chassisSelfIntersecting', 'chassisValidated'],
		
		chassisSelfIntersecting: function(payload) {
			view.warn();
		},
		
		chassisValidated: function(payload) {
			view.unwarn();
			view.updatePunchHoles(payload.chassis.punchHoles);
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}