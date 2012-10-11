/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(view, options) {

	var self = {
		userEvents: ['click', 'mouseMove', 'dblClick'],
		
		click: function(payload) {
			var x = payload.x;
			var y = payload.y;

			if(this.shape){
				// Extend the path
				var path = this.shape.attrs.path;
				this.shape.attr('path', path +' L ' + x + ' ' + y);
			}else{
				// Create a new path
				var draw = view.draw;
				this.shape = draw.path('M '+x+' '+y+' L ' + x + ' ' + y);
				this.shape.attr(view.shapeAttributes);
			}
		},
		
		mouseMove: function(payload) {
			var x = payload.x;
			var y = payload.y;

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
				/* click event handler is called twice
				 * before this. Two pop operations from path
				 * are to offset the effect of two click events
				 */ 
				path.pop();
				path.pop();
				this.shape.attr({path: path +'Z', stroke: null});
				var chassis2D = Chassis2D(this.shape, {app:options.app});
				var corners   = Corners(view.draw, this.shape);
				view.doneSketching(chassis2D);
				var chassis = Chassis(
					{
						corners: corners,
						path: this.shape.attrs.path,
						transform: this.shape.transform(),
						app: options.app,
						id: chassis2D.id
					});

				chassis.create();

				(function(chassis){
					setTimeout(function(){
						chassis.update();
					}, 5);
				}(chassis));
				this.shape = null;
			}
		}
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
