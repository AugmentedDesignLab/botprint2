/**
 * @author Zhongpeng Lin
 */
function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['chassisShapeUpdated'],
		
		chassisShapeUpdated: function(payload) {
			var chassis = new Chassis3D([payload.shape], 50);
			chassis.rotation.x = Math.PI/2;
			view.updateChassis(chassis);			
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
