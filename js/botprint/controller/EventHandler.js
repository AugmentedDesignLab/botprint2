/**
 * @author Zhongpeng Lin
 */

function EventHandler(view, options) {
	var self = {
		// decide if a handler should process an event
		isMyJob: function(payload) {
			return view == payload.target;
		}
	};
	
	$.extend(self, Bindable(view.bus()));
	return self; 
}
