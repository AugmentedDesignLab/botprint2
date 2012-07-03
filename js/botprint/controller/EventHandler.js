/**
 * @author Zhongpeng Lin
 */

function EventHandler(view, options) {
	var self = {
		// decide if a handler should process an event
		isMyJob: function(payload) {
			return view == payload.target;
		},
		
		/* Provide a default implementation of binding events to handlers,
		 * assuming the handler method names are the lower case of event names
		 */
		bindAll: function(events) {
			var sub = this;
			events.forEach(function(ev){
				sub.bind(Events[ev.toUpperCase()], sub[ev.toLowerCase()]);
			});
		}
	};
	
	$.extend(self, Bindable(view.bus()));
	return self; 
}
