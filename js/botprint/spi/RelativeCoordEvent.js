/**
 * Add to MouseEvent relativeX and relativeY properties, the
 * coordinates relative to MouseEvent.currentTarget.
 * Note that offsetX and offsetY implemented in Webkit browsers
 * are the coordinates relative to MouseEvent.target
 * 
 * @author Zhongpeng Lin
 */
function RelativeCoordEvent(event) {
	event.relativeX = event.pageX - $(event.currentTarget).offset().left;
	event.relativeY = event.pageY - $(event.currentTarget).offset().top;
	return event;	
}
