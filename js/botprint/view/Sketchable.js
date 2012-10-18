/**
 * Decorator to make canvas sketchable
 * @author Zhongpeng Lin
 */
function Sketchable(object2D) {
	object2D = Selectable(object2D);
	
	object2D.elem.mousemove(function(event){
		// should not stop the propagation of this, otherwise objects on canvas can not be dragged
		var relativeEvent = RelativeCoordEvent(event);
		object2D.trigger(UserEvents.mouseMove,
				 {x: relativeEvent.relativeX, y: relativeEvent.relativeY});
	});
	
	$(document.activeElement).keypress(function(event) {
		if(event.which == 13) {// enter key
	        event.stopPropagation();
			object2D.trigger(UserEvents.enterPress);
		}
	});
	return object2D;
}
