/**
 * @author Zhongpeng Lin
 *
 */

function VertexDraggingHandler(view, options) {
	
	var self = {
		dragMove: function(payload) {
			self.super.dragMove(payload);
			var position = view.position;
			var target = view.target;
			// modify the target shape, which is the chassis
			target.points[options.pathIndex] = position;
			target.redraw();
		},
		
		dragEnd: function(payload) {
			self.super.dragEnd(payload);
			var shape = view.target.elem;
			var chassis = Chassis({path: shape.attrs.path, transform: shape.transform(), app: options.app});
			chassis.update();
			// force to redraw the edges
			view.target.deselect();
			view.target.select();
		}
	};
	Mixable(self).mix(DraggingHandler(view, options));

	return self;
}
