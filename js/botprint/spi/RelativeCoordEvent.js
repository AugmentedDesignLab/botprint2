/**
 * Add to MouseEvent relativeX and relativeY properties
 * 
 * @author Zhongpeng Lin
 */
function RelativeCoordEvent(event) {
	event.relativeX = event.offsetX || event.pageX - $(event.currentTarget).offset().left;;
	event.relativeY = event.offsetY || event.pageY - $(event.currentTarget).offset().top;
	return event;	
}
