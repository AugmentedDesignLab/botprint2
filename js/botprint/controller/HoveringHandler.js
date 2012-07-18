/**
 * @author Zhongpeng Lin
 */
function HoveringHandler(view, options) {
	
	var self = {
		userEvents: ['mouseOut', 'mouseOver'],

		enable: function() {
			var thisHandler = this;
			thisHandler.userEvents.forEach(function(ev){
			    view.bind(Events[ev], thisHandler[ev]);
			});			
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.userEvents.forEach(function(ev){
			    view.unbind(Events[ev], thisHandler[ev]);
			});			
		},

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
