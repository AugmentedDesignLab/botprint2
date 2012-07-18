/**
 * Provides the default implementation of
 * enable and disable method. When a handler
 * does not want the default implementation,
 * it can simply extend from Bindable
 * @author Zhongpeng Lin
 */

function EventHandler(view, options) {
	var self = {
		appEvents: [],
		userEvents: [],
		
		enable: function() {
			var thisHandler = this;
			thisHandler.appEvents.forEach(function(ev){
			    self.bind(Events[ev], thisHandler[ev]);
			});
			thisHandler.userEvents.forEach(function(ev){
			    view.bind(Events[ev], thisHandler[ev]);
			});			
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.appEvents.forEach(function(ev){
			    self.unbind(Events[ev], thisHandler[ev]);
			});
			thisHandler.userEvents.forEach(function(ev){
			    view.unbind(Events[ev], thisHandler[ev]);
			});			
		},

	};
	
	$.extend(self, Bindable(options.bus));
	return self; 
}
