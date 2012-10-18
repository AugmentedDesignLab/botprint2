/**
 * Events used to communicate different parts of the application
 * @author Zhongpeng Lin
 */
var ApplicationEvents = {
	optionChanged: 'User chose a different option in side panel, payload: {variable: new_value}',
	partUpdated: 'A part has been moved, payload: {part: json}',
	wheelsOverlapping: 'Two wheels are overlapping with each other: {wheels: overlapping wheels, can be empty}',
	selectionChanged: 'A different element on the web page is selected. payload: {target: the 2D shape selected}',
	wheelDeleted: 'A wheel has been deleted, payload: {wheel: Wheel2D}',
	robotUpdated: 'A new robot model is ready: {robot: json}',
	chassisSelfIntersecting: 'The chassis shape is self-intersecting, {}',
	chassisValidated: 'The chassis shape is validated, {chassis: chassisModel}',
	partAdded: 'A new part has been added, payload: {part: json}',
	saveChassis: 'User wants to save the chassis. payload: {}',
	layoutUpdated: 'A layout has been updated, payload: {layout: Deck2D}',
	layoutDeleted: 'A layout has been deleted, payload: {}',
	chassisSelected: 'A pre-defined chassis is selected, payload: {path: path string}'
};
