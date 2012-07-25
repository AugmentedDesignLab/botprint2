/**
 * @author Zhongpeng Lin
 */
function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['chassisShapeUpdated', 'wheelUpdated', 'wheelDeleted'],
		wheels: {},
		
		chassisShapeUpdated: function(payload) {
			var chassisModel = Chassis(payload);
			self.chassis = new Chassis3D(chassisModel);
			var robot = new Robot3D(self.chassis, self.wheels);
			view.updateRobot(robot);			
		},
		
		wheelUpdated: function(payload) {
			var w3 = new Wheel3D(payload.x, payload.y);
			self.wheels[payload.id] = w3;
			var robot = new Robot3D(self.chassis, self.wheels);
			view.updateRobot(robot);		
		},
		
		wheelDeleted: function(payload) {
			delete self.wheels[payload.id];
			var robot = new Robot3D(self.chassis, self.wheels);
			view.updateRobot(robot);			
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
