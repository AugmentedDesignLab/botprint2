function ValidationRouter(view, options) {
	// private variable
	var robotModel = Robot({app:options.app});
	
	var self = {
		appEvents: ['chassisShapeUpdated', 'wheelUpdated', 'wheelDeleted'],

		chassisShapeUpdated: function(payload) {
			var chassisModel = Chassis(payload);
			robotModel.updateChassis(chassisModel);
		},
		
		wheelUpdated: function(payload) {
			var wheelModel = Wheel({coordinates: {x: payload.x, y: payload.y}, id: payload.id});
			robotModel.updateWheel(wheelModel);
		},
		
		wheelDeleted: function(payload) {
			robotModel.deleteWheel(payload.id);
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;	
}