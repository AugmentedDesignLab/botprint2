function SidePanelHandler(view, options) {
	var self = {
		enable: function() {
			view.elem.bind('click', self.click);
		},
		
		click: function(payload) {
			var $this 	= $(this),
				varName	= $this.data('guivar');
			var varVal  = $this.data ('guival');
			
			// FIXME to be deleted
			options.checkforChassisExistence(options.canvas.chassis, varName, varVal);
			options.vars[varName] = varVal;
			options.updateCanvasHandler();
			// end FIXME

			$this.siblings().addClass('disabled');
			$this.removeClass('disabled');
			self.trigger(Events.optionChanged, {varName: varVal});
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}