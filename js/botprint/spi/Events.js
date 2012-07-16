/*
 * Event 'constants'
 */

var Events = {
	optionChanged: 'User chose a different option in side panel, payload: {variable: new_value}',
	chassisShapeUpdated: 'The chassis shape is updated, payload: {shape: new_svg}',
	// constants for mouse events
	mouseDown: 'onmousedown event, payload: {x: x_value, y: y_value}',
	mouseMove: 'onmousemove event, payload: {x: x_value, y: y_value}',
	mouseOver: 'onmouseover event, payload: {target: event_target}',
	mouseOut: 'onmouseout event, payload: {target: event_target}',
	click: 'onclick event, payload: {target: element on which the event occurred, currentTarget: the element the event handler has been attached to}',
	dblClick: 'ondblclick event, payload: {x: x_value, y: y_value}',
	dragStart: 'onstart event of mouse dragging, payload: {target: drag_target}',
	dragMove: 'onmove event of mouse dragging, payload: {dx: horizontal distance from the start point, dy: vertical distance from the start point, target: drag_target}',
	dragEnd: 'onend event of mouse dragging, payload: {target: drag_target}',
	draggable: 'makes a vertex draggable, payload: {vertex: Vertex2D, handlerOptions: {...options...}}',
	hoverable: 'makes a vertex hoverable,  payload: {vertex: Hoverable2D, handlerOptions: {...options...}}'
};
