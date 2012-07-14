/**
 * @author Zhongpeng Lin
 *
 */

function VertexDraggingHandler(view, options) {
	
	var self = {}, base = DraggingHandler(view, options);
	$.extend(self, base);
	
	// Override methods of base class
	self.dragMove = function(payload) {
			base.dragMove(payload);
			// modify the target shape, which is the chassis
			var path = view.target.attrs.path;
			path[options.pathIndex][1] = view.getPosition().x;
			path[options.pathIndex][2] = view.getPosition().y;
			view.target.attr({path: path});
				
	};
		
	self.dragEnd = function(payload) {
			base.dragEnd(payload);
			self.trigger(Events.chassisShapeUpdated, {shape: view.target});
	};
	
	return self;
}
