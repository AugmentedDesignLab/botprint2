/*
 * Event 'constants'
 */

var Events = {
	OPTION_CHANGED: 'User chose a different option in side panel, payload: {variable: new_value}',
	CHASSIS_SHAPE_UPDATED: 'The chassis shape is updated, payload: {shape: new_svg}',
	// constants for mouse events
	MOUSEDOWN: 'onmousedown event, payload: {x: x_value, y: y_value}',
	MOUSEMOVE: 'onmousemove event, payload: {x: x_value, y: y_value}',
	MOUSEOVER: 'onmouseover event, payload: {target: event_target}',
	MOUSEOUT: 'onmouseout event, payload: {target: event_target}',
	DOUBLE_CLICK: 'ondblclick event, payload: {x: x_value, y: y_value}',
	DRAG_START: 'onstart event of mouse dragging, payload: {target: drag_target}',
	DRAG_MOVE: 'onmove event of mouse dragging, payload: {dx: horizontal distance from the start point, dy: vertical distance from the start point, target: drag_target}',
	DRAG_END: 'onend event of mouse dragging, payload: {target: drag_target}'
};
