/**
 * @author Zhongpeng Lin
 */
function Edge2DHandler(view, options) {
	var self = {
		userEvents: ['mouseOver', 'mouseMove', 'mouseOut', 'click'],
		
		mouseOver: function(payload) {
			// var event = RelativeCoordEvent(payload.event);
			// var position = {x: event.relativeX, y: event.relativeY};
			// var draw = view.target.elem.paper;
			// self.newVertex = draw.circle(position.x, position.y, 6);
			// self.newVertex.attr({fill: 'white', stroke: 'black'});
			// self.newVertex.click(function(event){debugger;});
		},
		
		mouseMove: function(payload) {
			if(self.newVertex) {
				self.newVertex.attr({cx: payload.x, cy: payload.y});
			}
		},
		
		mouseOut: function(payload) {
			if(self.newVertex){
				self.newVertex.remove();
			}
		},
		
		click: function(payload) {
			view.target.deselect();
			var points = view.target.points;
			points.splice(options.pathIndex+1, 0, {x: payload.x, y: payload.y});
			view.target.redraw();
			
			view.target.select();
		}
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
