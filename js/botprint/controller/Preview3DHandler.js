/**
 * @author Zhongpeng Lin
 */
function Preview3DHandler(view, options) {
	
	var self = {
		appEvents: ['chassisShapeUpdated'],
		
		enable: function() {
			var thisHandler = this;
			thisHandler.appEvents.forEach(function(ev){
			    self.bind(Events[ev], thisHandler[ev]);
			});			
		},
		
		disable: function() {
			var thisHandler = this;
			thisHandler.appEvents.forEach(function(ev){
			    self.unbind(Events[ev], thisHandler[ev]);
			});			
		},

		chassisShapeUpdated: function(payload) {
			var chassis = new Chassis3D([payload.shape], 50);
			chassis.rotation.x = Math.PI/2;
			view.updateChassis(chassis);			
		}
	};
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
