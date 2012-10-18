/**
 * @author Zhongpeng Lin
 */
function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['robotUpdated'],
		userEvents: ['mouseOver', 'mouseOut'],
		
		robotUpdated: function(payload) {
			var robotAttrs = JSON.parse(payload.robot);
			var robot = Robot();
			$.extend(robot, robotAttrs);
			var robot3D = new Robot3D(robot);
			view.updateRobot(robot3D);
			view.render();
		},
		
		mouseOver: function(payload) {
			view.shouldAnimate = true;
		},
		
		mouseOut: function(payload) {
			view.shouldAnimate = false;
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
