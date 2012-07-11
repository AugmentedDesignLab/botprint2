/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(view, options) {
	var elem = view.elem;
	
	var self = {
		
		enable: function(){
			var events = ['click', 'mouseMove', 'dblClick'];
			
			events.forEach(function(ev){
			    elem.bind(ev.toLowerCase(), self[ev]);		
			});
		},
		
		disable: function() {
			elem.unbind();
		},
				
		click: function(payload) {
			var x = view.translateX(payload.clientX);
			var y = view.translateY(payload.clientY);
			if(this.shape){
				// Extend the path
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +' L ' + x + ' ' + y);
			}else{
				if(view.chassis)
					view.chassis.remove();
				// Create a new path
				var draw = view.draw;
				this.shape = draw.path('M '+x+' '+y+' L ' + x + ' ' + y);
				this.shape.attr(options.shapeAttributes);
			}
		},
		
		mouseMove: function(payload) {
			var x = view.translateX(payload.clientX);
			var y = view.translateY(payload.clientY);
			if(this.shape){
				// Modify the last path element
				var path = this.shape.attrs.path;
				var last = path[path.length - 1];
				last[1] = x;
				last[2] = y;
				this.shape.attr('path', path);
			}
		},
		
		dblClick: function(payload){
			if(this.shape){
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +'Z');
				view.chassis = this.shape;
				self.trigger(Events.chassisShapeUpdated, {shape: this.shape});
				this.shape = null;
			}
		}
	};
	
	$.extend(self, EventHandler(view, options));
	return self;
}
