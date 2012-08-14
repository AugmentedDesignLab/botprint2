function ValidationRouter(view, options) {
	// private variable
	var robotModel = Robot({app:options.app});
	
	var self = {
		appEvents: ['partUpdated', 'wheelDeleted', 'partAdded'],
		
		partAdded: function(payload) {
			var partAttr = JSON.parse(payload.part);
			var partClass = eval(partAttr.name);
			var part = partClass();
			$.extend(part, partAttr);
			robotModel.install(part);
		},

		partUpdated: function(payload) {
			var part = JSON.parse(payload.part);
			robotModel.updatePart(part);
		},
		
		wheelDeleted: function(payload) {
			robotModel.uninstall(payload.id);
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;	
}