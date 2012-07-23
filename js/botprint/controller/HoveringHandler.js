/**
 * @author Zhongpeng Lin
 */
function HoveringHandler(view, options) {
	
	var self = {
		userEvents: ['mouseOut', 'mouseOver'],

		mouseOver: function(payload) {
			view.highlight();
		},
		
		mouseOut: function(payload) {
			view.lowlight();
		}
		
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
