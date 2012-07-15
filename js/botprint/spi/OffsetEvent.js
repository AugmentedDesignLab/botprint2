/**
 * offsetX and offsetY of MouseEvent are supported by most modern browsers except Firefox,
 * which provides layerX and layerY to accomplish the same functionality. However, layerX and
 * layerY are deprecated by Webkit based browsers.
 * 
 * This class is to add offsetX and offsetY to an MouseEvent object when they are not supported
 * @author Zhongpeng Lin
 */

function OffsetEvent(event) {
	// Add offsetX and offsetY properties to support Firefox
	event.offsetX = event.offsetX || event.pageX - $(event.currentTarget).offset().left;
	event.offsetY = event.offsetY || event.pageY - $(event.currentTarget).offset().top;
	return event;
}
