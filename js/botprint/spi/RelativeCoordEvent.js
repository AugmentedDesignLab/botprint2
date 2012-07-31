/**
 * Add to MouseEvent relativeX and relativeY properties, which are actually
 * offsetX and offsetY in Webkit based browsers. In Firefox, the offset to
 * the event.currentTarget is used instead.
 * 
 * @author Zhongpeng Lin
 */
function RelativeCoordEvent(event) {
	event.relativeX = event.offsetX || event.pageX - $(event.currentTarget).offset().left;
	event.relativeY = event.offsetY || event.pageY - $(event.currentTarget).offset().top;
	return event;	
}
