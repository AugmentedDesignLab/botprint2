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
			var path = target.elem.attrs.path;
			path[options.pathIndex][1] = position.x;
			path[options.pathIndex][2] = position.y;
			target.elem.attr({path: path});
			// update adjacent edges
			var numVertices = target.edges.length;
			var edge1 = target.edges[(options.pathIndex+numVertices-1)%numVertices].elem;
			path = edge1.attrs.path;
			path[1][1] = position.x;
			path[1][2] = position.y;
			edge1.attr('path', path);
			var edge2 = target.edges[options.pathIndex].elem;
			path = edge2.attrs.path;
			path[0][1] = position.x;
			path[0][2] = position.y;
			edge2.attr('path', path);
		},
		
		dragEnd: function(payload) {
			self.super.dragEnd(payload);
			var shape = view.target.elem;
			var chassis = Chassis({path: shape.attrs.path, transform: shape.transform(), app: options.app});
			chassis.update();
		}
	};
	Mixable(self).mix(DraggingHandler(view, options));

	return self;
}
