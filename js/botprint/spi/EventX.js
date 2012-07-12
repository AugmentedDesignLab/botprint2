/**
 * Extension for MouseEvent object
 * @author Zhongpeng Lin
 */

function EventX(event) {
	// Add offsetX and offsetY properties to support Firefox
	event.offsetX = event.offsetX || event.pageX - $(event.currentTarget).offset().left;
	event.offsetY = event.offsetY || event.pageY - $(event.currentTarget).offset().top;
	return event;
}
