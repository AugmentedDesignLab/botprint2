/**
 * @author Zhongpeng Lin
 */
function Preview3DHandler(view, options) {
	
	var self = {
		enable: function() {
			self.bindAll(['chassisShapeUpdated']);
		},
		
		disable: function() {
			
		},
		
		chassisShapeUpdated: function(payload) {
			var chassis = new Chassis3D([payload.shape], 50);
			chassis.rotation.x = Math.PI/2;
			view.updateChassis(chassis);			
		}
	};
	$.extend(self, EventHandler(view, options));
	return self;
}
