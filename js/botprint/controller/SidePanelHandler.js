function SidePanelHandler(view, options) {
	var chassisPath;
	var self = {
		userEvents: ['click'],
		appEvents: ['selectionChanged'],
		
		click: function(payload) {
			var target 	= $(payload.target),
            varName	= target.data('guivar');
			if(varName == 'doneSketching'){
				options.app.trigger(ApplicationEvents.saveChassis, {});
			} else {
				var varVal  = target.data ('guival');
				view.select(target);
				var pl = {};
				pl[varName] = varVal;
				options.app.trigger(ApplicationEvents.optionChanged, pl);
			}
		},
		
		selectionChanged: function(payload) {
			var color;
			var colorRGB = payload.target.color;
			switch(colorRGB) {
				case '#FF0000': color = 'red'; break;
				case '#00FF00': color = 'green'; break;
				case '#FFFFFF': color = 'white'; break;
				default: color = 'default';
			}
			view.setColor(color);
		},
		
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}