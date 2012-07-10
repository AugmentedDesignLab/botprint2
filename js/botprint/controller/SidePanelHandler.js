function SidePanelHandler(view, options) {
	var self = {
		enable: function() {
			view.elem.bind('click', self.click);
		},
		
		click: function(payload) {
			var $this 	= $(this),
				varName	= $this.data('guivar');
			var varVal  = $this.data ('guival');

			$this.siblings().addClass('disabled');
			$this.removeClass('disabled');
			var pl = {};
			pl[varName] = varVal;
			self.trigger(Events.optionChanged, pl);
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}