/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(options) {
	var elem = options.canvas.elem;
	
	var self = {
		
		enable: function(){
			var events = ['mousedown', 'mousemove', 'dblclick'];
			events.forEach(function(ev){
				elem.bind(ev, function(payload){
			      payload.preventDefault();
			      self[ev](options.canvas.translateX(payload.clientX),
			      	options.canvas.translateY(payload.clientY));
			    });				
			});
		},
		
		disable: function() {
			elem.unbind();
		},
				
		mousedown: function(x, y) {
			if(self.shape){
				// Extend the path
				var path = self.shape.attrs.path;
				self.shape.attr('path', path +' L ' + x + ' ' + y);
			}else{
				// Create a new path
				var draw = options.canvas.draw;
				self.shape = draw.path('M '+x+' '+y + ' L ' + x + ' ' + y);
				self.shape.attr(options.shapeAttributes);
				//self.shape.attr('fill', '#00FF00');
			}
		},
		
		mousemove: function(x, y) {
			if(self.shape){
				// Modify the last path element
				var path = self.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = x;
				last[2] = y;
				self.shape.attr('path', path);
			}
		},
		
		dblclick: function(x, y){
			if(self.shape){
				var path = self.shape.attrs.path;
				self.shape.attr('path', path +'Z');
				options.canvas.addSVG(self.shape);
				self.shape = null;
			}
		}
	};
	
	return self;
}
