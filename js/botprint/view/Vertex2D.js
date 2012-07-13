/**
 * @author Zhongpeng Lin
 */
function Vertex2D(svg, options) {
	var self = {
		svg: svg,
		
		getPosition: function() {
			return {x: svg.attrs.cx, y: svg.attrs.cy};
		},
		
		setPosition: function(x, y) {
			svg.attr({cx: x, cy: y});
		},
		
		highlight: function() {
			svg.attr({r: 6});
		},
		
		lowlight: function() {
			svg.attr({r: 4});
		}
	};
	
	$.extend(self, View(options));
	return self;
	
}
