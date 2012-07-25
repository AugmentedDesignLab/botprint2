/**
 * Decorator to make a 2D object being
 * able to respond to mouse hover event,
 * expecting the 2D object having highlight
 * and lowlight methods
 * 
 * @author Zhongpeng Lin
 */
function Hoverable2D(object2D) {
	object2D.elem.hover(function(event){
		var rEvent = RelativeCoordEvent(event);
		object2D.trigger(UserEvents.mouseOver, {x: rEvent.relativeX, y: rEvent.relativeY});
	}, function(event){
		var rEvent = RelativeCoordEvent(event);
		object2D.trigger(UserEvents.mouseOut, {x: rEvent.relativeX, y: rEvent.relativeY});
	});
	
	return object2D;
}
