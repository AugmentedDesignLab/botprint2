/**
 * Provides the default implementation of
 * enable and disable method. When a handler
 * does not want the default implementation,
 * it can simply extend from Bindable
 * @author Zhongpeng Lin
 */

function EventHandler(view, options) {
	var self = {
		enable: function() {
			var thisHandler = this;
			thisHandler.events.forEach(function(ev){
			    view.bind(Events[ev], thisHandler[ev]);
			});
		},
		
		disable: function() {
			// TODO waiting for a way to unbind event handlers from EventBus
		}		
	};
	$.extend(self, Bindable(view.bus || options.bus));
	return self; 
}
