/**
 * @author Zhongpeng Lin
 */
function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['chassisShapeUpdated', 'wheelUpdated', 'wheelDeleted'],
		robotModel: Robot(),
		
		chassisShapeUpdated: function(payload) {
			var chassisModel = Chassis(payload);
			self.robotModel.chassis = chassisModel;
			self.robotModel.assemble();
			
			var robot = new Robot3D(self.robotModel);
			view.updateRobot(robot);			
		},
		
		wheelUpdated: function(payload) {
			var wheelModel = Wheel({coordinates: {x: payload.x, y: payload.y}, id: payload.id});
			self.robotModel.wheels[payload.id] = wheelModel;
			self.robotModel.assemble();
			
			var robot = new Robot3D(self.robotModel);
			view.updateRobot(robot);		
		},
		
		wheelDeleted: function(payload) {
			delete self.robotModel.wheels[payload.id];
			self.robotModel.assemble();
			
			var robot = new Robot3D(self.robotModel);
			view.updateRobot(robot);			
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
