function SidePanelHandler(view, options) {
	var self = {
		events: ['click'],
		enable: function() {
			this.super.enable.call(this);
			self.bind(Events.selectionChanged, self.selectionChanged);
		},
		
		click: function(payload) {
			payload.preventDefault();
			var $this 	= $(this),
				varName	= $this.data('guivar');
			var varVal  = $this.data ('guival');
			view.select($this);
			var pl = {};
			pl[varName] = varVal;
			self.trigger(Events.optionChanged, pl);
		},
		
		selectionChanged: function(payload) {
			var color;
			var colorRGB = payload.target.getColor();
			switch(colorRGB) {
				case '#FF0000': color = 'red'; break;
				case '#00FF00': color = 'green'; break;
				case '#FFFFFF': color = 'white'; break;
				default: color = 'default';
			}
			view.setColor(color);
		}
	};
	
	Mixable(self).mix(HTMLEventHandler(view, options));
	return self;
}