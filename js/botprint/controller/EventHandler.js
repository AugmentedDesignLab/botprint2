/**
 * @author Zhongpeng Lin
 */

function EventHandler(view, options) {
	var self = {
		// decide if a handler should process an event
		proceed: function(payload) {
			return view == payload.target;
		},
		
		/* Provide a default implementation of binding events to handlers,
		 * assuming the handler method names are the same as event names
		 */
		bindAll: function(events) {
			var sub = this;
			events.forEach(function(ev){
				sub.bind(Events[ev] || Events[ev.toUpperCase()], sub[ev] || sub[ev.toLowerCase()]);
			});
		}
	};
	
	$.extend(self, Bindable(view.bus()));
	return self; 
}
