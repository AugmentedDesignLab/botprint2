/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Automator(sketchable, options){
	options = options || { points: [
		{x:424, y: 145},
		{x:405, y: 270},
		{x:251, y: 272},
		{x:362, y: 357},
		{x:307, y: 517},
		{x:435, y: 420},
		{x:542, y: 502},
		{x:516, y: 351},
		{x:599, y: 273},
		{x:484, y: 272}
	]};

	var corners = new Points();
	for(var i = 0; i < options.points.length; i++){
		var each = options.points[i];
		corners.add(Point.make(each.x, each.y));
	}

	var self = {
		play: function(){
			corners.each(function(p, i, isFirst, isLast){
				self.draw(sketchable.sketchingHandler, p, isLast)
			});
			return sketchable;
		},

		draw: function(handler, point, finishSketch){
			var payload = {x: point.x, y:point.y };
			handler.mouseMove(payload);
			if(!finishSketch) {
				handler.click(payload);
			} else {
				handler.click(payload);
				handler.click(payload);
				handler.dblClick({});
			}
		}
	};

	return self;
}