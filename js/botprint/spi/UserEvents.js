/**
 * Wrapper for events initiated by users, used only for communication between views and their own handlers.
 * All of them have their counterparts in either Raphael.js or standard HTML events
 * @author Zhongpeng Lin
 */
var UserEvents = {
	mouseDown: 'onmousedown event, payload: {x: x_value, y: y_value}',
	mouseMove: 'onmousemove event, payload: {x: x_value, y: y_value}',
	mouseOver: 'onmouseover event, payload: {x: x_value, y: y_value}',
	mouseOut: 'onmouseout event, payload: {x: x_value, y: y_value}',
	click: 'onclick event, payload: {x: relativeX, y: relativeY, target: element on which the event occurred}',
	dblClick: 'ondblclick event, payload: {x: x_value, y: y_value}',
	dragStart: 'onstart event of mouse dragging, payload: {x: x_value, y: y_value}',
	dragMove: 'onmove event of mouse dragging, payload: {dx: horizontal distance from the start point, dy: vertical distance from the start point, target: drag_target}',
	dragEnd: 'onend event of mouse dragging, payload: {}'	
};
