/**
 * Events used to communicate different parts of the application
 * @author Zhongpeng Lin
 */
var ApplicationEvents = {
	optionChanged: 'User chose a different option in side panel, payload: {variable: new_value}',
	chassisShapeUpdated: 'The chassis shape is updated, payload: {shape: new_svg}',
	selectionChanged: 'A different element on the web page is selected. payload: {target: the 2D shape selected}'	
};
