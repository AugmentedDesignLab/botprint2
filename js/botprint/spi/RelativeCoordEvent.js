/**
 * Add to MouseEvent relativeX and relativeY properties
 * 
 * @author Zhongpeng Lin
 */
function RelativeCoordEvent(event) {
	event.relativeX = event.offsetX || event.layerX;
	event.relativeY = event.offsetY || event.layerY;
	return event;	
}
