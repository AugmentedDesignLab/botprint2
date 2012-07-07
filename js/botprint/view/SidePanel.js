/**
 * @author Zhongpeng Lin
 */
function SidePanel(options) {
	var self = {
		elem: $('.'+options.elemClass)
	};
	$.extend(self, View(options));
	var handler = SidePanelHandler(self, options);
	handler.enable();
	$('.'+options.elemClass+'.default').trigger('click');
}
