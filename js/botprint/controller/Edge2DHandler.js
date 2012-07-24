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
				var event = RelativeCoordEvent(payload.event);
				self.newVertex.attr({cx: event.relativeX, cy: event.relativeY});
			}
		},
		
		mouseOut: function(payload) {
			if(self.newVertex){
				self.newVertex.remove();
			}
		},
		
		click: function(payload) {
			var event = RelativeCoordEvent(payload.event);
			view.target.deselect();
			var path = view.target.elem.attrs.path;
			path.splice(options.pathIndex, 0, ['L', event.relativeX, event.relativeY]);
			view.target.elem.attr('path', path);
			view.target.select();
		}
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
