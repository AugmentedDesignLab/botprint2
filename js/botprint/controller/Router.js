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
			function appendAttributes(blobBuilder, attributes) {
				$.each(attributes, function(index, attr){
					blobBuilder.append(' ');
					blobBuilder.append(attr.nodeName);
					blobBuilder.append('="');
					blobBuilder.append(attr.nodeValue);
					blobBuilder.append('"');
				});
			};
			if(!view.chassis){
				alert('You must sketch a chassis first!');
				return;
			}
			var path = view.chassis.elem.node;
			var svg = path.parentNode;
			var bb = new BlobBuilder;
			bb.append('<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>');
			
			bb.append('<svg');
			// svg attributes are needed to decide the size of the canvas
			appendAttributes(bb, svg.attributes);
			bb.append('>');
			
			bb.append('<path');
			appendAttributes(bb, path.attributes);
			bb.append('/>');
			
			bb.append('</svg>');
			robotModel.persist(bb.getBlob('image/svg+xml;charset=utf-8'));
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;	
}