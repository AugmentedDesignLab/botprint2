/**
 * @author Zhongpeng Lin
 */
function SidePanel(options) {
	var self = {
		node: $('.'+options.elemClass),
		setColor: function(color) {
			this.select($('.color a.'+color));
		},
		
		select: function(element) {
			element.siblings().addClass('disabled');
			element.removeClass('disabled');			
		}
	};
	$.extend(self, View(options));
	var handler = SidePanelHandler(self, options);
	handler.enable();
	$('.'+options.elemClass+'.default').trigger('click');
}
