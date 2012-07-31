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
			    options.app.bind(ApplicationEvents[ev], thisHandler[ev]);
			});
			thisHandler.userEvents.forEach(function(ev){
			    view.bind(UserEvents[ev], thisHandler[ev]);
			});			
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.appEvents.forEach(function(ev){
			    self.unbind(ApplicationEvents[ev], thisHandler[ev]);
			});
			thisHandler.userEvents.forEach(function(ev){
			    view.unbind(UserEvents[ev], thisHandler[ev]);
			});			
		}
	};
	
	$.extend(self, Bindable(view.bus));
	return self; 
}
