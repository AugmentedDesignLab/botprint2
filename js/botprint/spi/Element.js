/**
 * Extending the Raphael Element class
 * @author Zhongpeng Lin
 */
Raphael.el.unbindAll = function() {
	var events = this.events;
	if(events) {
		var ev = events.pop();
		while(ev) {
			ev.unbind();
			ev = events.pop();
		}
	}
};
