/**
 * Decorator to make a 2D object being
 * able to respond to mouse hover event,
 * expecting the 2D object having highlight
 * and lowlight methods
 * 
 * @author Zhongpeng Lin
 */
function Hoverable2D(object2D) {
	object2D.svg.hover(function(){
		object2D.trigger(Events.mouseOver);
	}, function(){
		object2D.trigger(Events.mouseOut);
	});
	
	return object2D;	
}
