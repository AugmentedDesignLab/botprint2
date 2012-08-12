/**
 * Events used to communicate different parts of the application
 * @author Zhongpeng Lin
 */
var ApplicationEvents = {
	optionChanged: 'User chose a different option in side panel, payload: {variable: new_value}',
	chassisShapeUpdated: 'The chassis shape is updated, payload: {shape: new_svg}',
	wheelUpdated: 'A wheel has been added or moved, payload: {wheel: Wheel2D}',
	wheelsOverlapping: 'Two wheels are overlapping with each other: {wheels: overlapping wheels, can be empty}',
	selectionChanged: 'A different element on the web page is selected. payload: {target: the 2D shape selected}',
	wheelDeleted: 'A wheel has been deleted, payload: {wheel: Wheel2D}',
	robotUpdated: 'A new robot model is ready: {robot: json}',
	chassisSelfIntersecting: 'The chassis shape is self-intersecting, {}',
	chassisValidated: 'The chassis shape is validated, {}',
};
