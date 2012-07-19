/**
 * Add to MouseEvent currentX and currentY properties, the
 * coordinates relative to MouseEvent.currentTarget.
 * Note that offsetX and offsetY implemented in Webkit browsers
 * are the coordinates relative to MouseEvent.target
 * @author Zhongpeng Lin
 */
function CurrentEvent(event) {
	event.currentX = event.pageX - $(event.currentTarget).offset().left;
	event.currentY = event.pageY - $(event.currentTarget).offset().top;
	return event;	
}
