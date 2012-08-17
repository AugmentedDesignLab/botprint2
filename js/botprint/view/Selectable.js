/**
 * Draggable and Sketchable are automatically Selectable,
 * this decorate is used only for those not Draggable or Sketchable
 * @author Zhongpeng Lin
 */
function Selectable(object2D) {
    object2D.elem.click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var relativeEvent = RelativeCoordEvent(event);
        object2D.trigger(UserEvents.click,
            {x: relativeEvent.relativeX, y: relativeEvent.relativeY, target: relativeEvent.target});
    });
    return object2D;
}
