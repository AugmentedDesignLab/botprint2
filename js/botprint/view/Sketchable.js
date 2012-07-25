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
	
	object2D.elem.dblclick(function(event){
		var relativeEvent = RelativeCoordEvent(event);
		object2D.trigger(UserEvents.dblClick,
				 {x: relativeEvent.relativeX, y: relativeEvent.relativeY});
	});
	return object2D;
}
