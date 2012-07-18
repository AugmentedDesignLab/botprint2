/**
 * @author Zhongpeng Lin
 *
 */

function VertexDraggingHandler(view, options) {
	
	var self = {
		dragMove: function(payload) {
			self.super.dragMove(payload);
			// modify the target shape, which is the chassis
			var path = view.target.attrs.path;
			path[options.pathIndex][1] = view.getPosition().x;
			path[options.pathIndex][2] = view.getPosition().y;
			view.target.attr({path: path});
				
		},
		
		dragEnd: function(payload) {
			self.super.dragEnd(payload);
			options.app.trigger(ApplicationEvents.chassisShapeUpdated, {shape: view.target});
		}
	};
	Mixable(self).mix(DraggingHandler(view, options));

	return self;
}
