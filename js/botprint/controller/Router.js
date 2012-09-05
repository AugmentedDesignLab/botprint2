function Router(view, options) {
	// private variable
	var robotModel = Robot({app:options.app});
	
	var self = {
		appEvents: ['partUpdated', 'wheelDeleted', 'partAdded', 'saveChassis'],
		
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
		},
		
		saveChassis: function(payload) {
			if(!view.chassis){
				alert('You must sketch a chassis first!');
				return;
			}
			var path = view.chassis.elem.node;
			var bb = new BlobBuilder;
			bb.append(path.toXML());
			robotModel.persist(bb.getBlob('image/svg+xml;charset=utf-8'));
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;	
}