/**
 * Decorator to make canvas sketchable
 * @author Zhongpeng Lin
 */
function Sketchable(object2D) {
	object2D.elem.click(function(event){
		event.stopPropagation();
		object2D.trigger(UserEvents.click, {event: event});
	});
	
	object2D.elem.mousemove(function(event){
		// should not stop the propagation of this, otherwise objects on canvas can not be dragged
		object2D.trigger(UserEvents.mouseMove, {event: event});
	});
	
	object2D.elem.dblclick(function(event){
		object2D.trigger(UserEvents.dblClick, {event: event});
	});
	return object2D;
}
