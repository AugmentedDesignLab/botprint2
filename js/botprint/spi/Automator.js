/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Automator(sketchable, options){
	options = options || { points: [
	/*TL*/{x:186, y:200},
	/*BL*/{x:186, y:385},
	/*BR*/{x:560, y:385},
	/*TR*/{x:560, y:200}
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