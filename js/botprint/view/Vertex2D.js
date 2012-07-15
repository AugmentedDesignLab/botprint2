/**
 * The widget for dragging a vertex of a polygon
 * @author Zhongpeng Lin
 */
function Vertex2D(position, target, options) {
	var draw = target.paper;
	var normalSize = 4;
	var svg = draw.circle(position.x, position.y, normalSize);
	svg.attr({fill: 'white', stroke: 'black'});
	
	var self = {
		svg: svg,
		target: target,
		handlers: [],
		
		getPosition: function() {
			return {x: svg.attrs.cx, y: svg.attrs.cy};
		},
		
		setPosition: function(x, y) {
			svg.attr({cx: x, cy: y});
		},
		
		highlight: function() {
			svg.attr({r: normalSize + 2});
		},
		
		lowlight: function() {
			svg.attr({r: normalSize});
		},
		
		remove: function() {
			// destructor
			this.handlers.forEach(function(h){
				h.disable();
			});
			svg.unbindAll();
			svg.remove();
		}
	};
	
	$.extend(self, View(options));
	return self;
	
}
