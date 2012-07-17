/**
 * Decorator to make canvas sketchable
 * @author Zhongpeng Lin
 */
function Sketchable(object2D) {
	object2D.node.click(function(event){
		event.stopPropagation();
		object2D.trigger(UserEvents.click, {event: event});
	});
	
	object2D.node.mousemove(function(event){
		// should not stop the propagation of this, otherwise objects on canvas can not be dragged
		object2D.trigger(UserEvents.mouseMove, {event: event});
	});
	
	object2D.node.dblclick(function(event){
		object2D.trigger(UserEvents.dblClick, {event: event});
	});
	return object2D;
}
