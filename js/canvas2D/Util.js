/**
 * @author Zhongpeng Lin
 */

/**
 * Unbind all events of an Raphael Element. This should
 * ideally be added into Raphael Element class, but due to
 * namespace collision between HTML Element and Raphael Element,
 * the latter is hidden.
 * @param {Element} svg
 */
function unbindAll(svg) {
	var events = svg.events;
	if(events)
	{
		var ev = events.pop();
		while(ev){
			ev.unbind();
			ev = events.pop();
		}
	}
}
