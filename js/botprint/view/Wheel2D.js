/**
 * 2D representation of a wheel
 * 
 * @author Zhongpeng Lin
 */
function Wheel2D(svg, options) {
	
	var self = {
		elem: svg,
		
		getPosition: function() {
			return {x: svg.attrs.x, y: svg.attrs.y};
		},
		
		setPosition: function(x, y) {
			svg.attr({x: x, y: y});
		},
		
		highlight: function() {
			svg.attr({stroke: '#00FFFF'});	
		},
		
		lowlight: function() {
			svg.attr({stroke: null});
		},

		setColor: function(color) {
			svg.attr({fill: color});
		},
		
		getColor: function() {
			return svg.attrs.fill;
		},
		
		select: function() {
			svg.attr({stroke: '#00FFFF'});	
			this.selected = true;
		},
		
		deselect: function() {
			svg.attr({stroke: null});
			this.selected = false;
		}
	};
	
	$.extend(self, View(options));
	return self;
}
