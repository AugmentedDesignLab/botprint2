/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(view, options) {
	var elem = view.elem;
	
	var self = {
		
		enable: function(){
			var events = ['mousedown', 'mousemove', 'dblclick'];
			events.forEach(function(ev){
				elem.bind(ev, function(payload){
			      payload.preventDefault();
			      self[ev](view.translateX(payload.clientX),
			      	view.translateY(payload.clientY));
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
				var draw = view.draw;
				self.shape = draw.path('M '+x+' '+y + ' L ' + x + ' ' + y);
				self.shape.attr(options.shapeAttributes);
				/*
				 * HACKING: add unbindAll method to
				 * Raphael's Element class
				 */
				if(self.shape.__proto__.unbindAll){
					self.shape.__proto__.unbindAll = function(){
						// Add this function to svg so that it can be called to unbind events later
						var events = this.events;
						if(events)
						{
							var ev = events.pop();
							while(ev){
								ev.unbind();
								ev = events.pop();
							}
						}
					};	
				}
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
				view.chassis = self.shape;
				self.trigger(Events.CHASSIS_SHAPE_UPDATED, {shape: self.shape});
				self.shape = null;
			}
		}
	};
	
	$.extend(self, Bindable(view.bus()));
	return self;
}
