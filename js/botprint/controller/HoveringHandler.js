/**
 * @author Zhongpeng Lin
 */
function HoveringHandler(view, options) {
	
	var self = {
		events: ['mouseOut', 'mouseOver'],

		mouseOver: function(payload) {
			view.highlight();
		},
		
		mouseOut: function(payload) {
			view.lowlight();
		}
		
	};
	$.extend(self, EventHandler(view, options));
	return self;
}
