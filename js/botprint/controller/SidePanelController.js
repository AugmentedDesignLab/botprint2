function SidePanelController(options) {
	var self = {
		onClick: function() {
			var $this 	= $(this),
				varName	= $this.data("guivar");
			var varVal  = $this.data ("guival");
			
			// FIXME to be deleted
			options.checkforChassisExistence(options.canvas.svgs, varName, varVal);

			options.vars[varName] = varVal;
			options.updateCanvasHandler();
			// end FIXME

			$this.siblings().addClass('disabled');
			$this.removeClass('disabled');
			self.trigger(Events.OPTION_CHANGED, {varName: varVal});
		}
	};
	
	$.extend(self, Bindable());
	return self;
}