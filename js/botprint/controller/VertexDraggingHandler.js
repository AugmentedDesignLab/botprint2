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
			// modify the chassis shape
			var path = view.chassis.attrs.path;
			path[view.path_index][1] = view.getPosition().x;
			path[view.path_index][2] = view.getPosition().y;
			view.chassis.attr({path: path});
				
	};
		
	self.dragEnd = function(payload) {
			base.dragEnd(payload);
			self.trigger(Events.chassisShapeUpdated, {shape: view.chassis});
	};
	
	return self;
}
