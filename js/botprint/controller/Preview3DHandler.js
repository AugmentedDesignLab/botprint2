/**
 * @author Zhongpeng Lin
 */
function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['robotUpdated'],
		
		robotUpdated: function(payload) {
			var robotAttrs = JSON.parse(payload.robot);
			var robot = Robot();
			$.extend(robot, robotAttrs);
			var robot3D = new Robot3D(robot);
			view.updateRobot(robot3D);
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
