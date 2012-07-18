/**
 * Draggable and Sketchable are automatically Selectable,
 * this decorate is used only for those not Draggable or Sketchable
 * @author Zhongpeng Lin
 */
function Selectable(object2D) {
	object2D.elem.click(function(event) {
		event.stopPropagation();
		object2D.trigger(UserEvents.click, {event: event});
	});
	return object2D;
}
