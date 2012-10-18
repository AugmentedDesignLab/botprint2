/**
 * @author Zhongpeng Lin
 */

function SketchingHandler(view, options) {
	var path;
	var self = {
		userEvents: ['click', 'mouseMove', 'enterPress'],
		
		click: function(payload) {
			var x = payload.x;
			var y = payload.y;

			if(this.shape){
				// Extend the path
				path[1][0] = 'R';
				path[1].push(x, y);
				this.shape.attr('path', path);
			}else{
				// Create a new path
				var draw = view.draw;
				path = [['M', x, y], ['L', x, y], ['z']];
				this.shape = draw.path(path);
				this.shape.attr(view.shapeAttributes);
			}
		},
		
		mouseMove: function(payload) {
			var x = payload.x;
			var y = payload.y;
			if(this.shape){
				// Modify the last path element
				var length = path[1].length;
				path[1][length-2] = x;
				path[1][length-1] = y;
				this.shape.attr('path', path);
			}
		},
		
		enterPress: function(payload){
			if(this.shape){
				// remove the last point
				path[1].pop();
				path[1].pop();
				this.shape.attr({path: path, stroke: null});
				var chassis2D = Chassis2D(this.shape, {app:options.app});
				var corners   = Corners(this.shape);
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

				this.shape = null;
			}
		}
	};
	
	Mixable(self).mix(EventHandler(view, options));
	return self;
}
