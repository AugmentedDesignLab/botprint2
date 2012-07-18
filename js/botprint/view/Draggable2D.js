/**
 * Decorator to make a 2D object draggable,
 * expecting the 2D object to have getPosition
 * and setPosition methods
 * @author Zhongpeng Lin
 */

function Draggable2D(object2D) {
	// handling events of svg by triggering events defined by us
	object2D.svg.drag(function(dx, dy, x, y, event){
		object2D.trigger(Events.dragMove, {dx: dx, dy: dy, x: x, y: y, event: event});
	}, function(x, y, event){
		object2D.trigger(Events.dragStart, {x: x, y: y, event: event});
	}, function(){
		object2D.trigger(Events.dragEnd, {event: event});
	});
	
	object2D.svg.click(function(event) {
		/* 
		 * As a click event occurs whenever there is a drag operation,
		 * in order to avoid this click event propagate to any ancestor
		 * element (bubble effect), it needs to be handled here and
		 * stopped from propagation. 
		 */
		event.stopPropagation();
	});
	
	return object2D;
}
