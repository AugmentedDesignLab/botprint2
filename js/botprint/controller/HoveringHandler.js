/**
 * @author Zhongpeng Lin
 */
function HoveringHandler(view, options) {
	
	var self = {
		enable: function() {
			var events = ['mouseOut', 'mouseOver'];
			events.forEach(function(ev){
			    view.bind(Events[ev], self[ev]);		
			});
		},
		
		disable: function() {
			// TODO waiting for a way to unbind event handlers from EventBus
		},

		mouseOver: function(payload) {
			view.highlight();
		},
		
		mouseOut: function(payload) {
			view.lowlight();
		}
		
	};
	
	return self;
}
