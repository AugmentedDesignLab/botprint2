/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function RenderLayout(data) {
	var Result = function(a, c) {
		return {
			x:a.x,
			y:a.y,
			w:a.w,
			h:a.h,
			cartoon: c
		}
	};

	var self = {
		now: function(){
			var data 		= this.data();
			var paper 		= data.paper;
			var outline  	= data.layout;
			var svgSet		= paper.set(); // use sets to group independent svgs...

			outline.select().forEach(function(each){
				console.log(each.x + "-" + each.y);
				// get random color
				var color = Raphael.getColor();
				svgSet.push(
					paper.rect(
						each.fit.x, each.fit.y,
						each.fit.w, each.fit.h
					).attr({fill: color, stroke: color})
				);
			});

			// include the actual set as part of return value..this set can have handlers
			// bound to it...e.g. svgSet.mouseover(function(){alert('over');});
			return Result(outline, svgSet);
		}
	};

	Mixable(self).mix(Algorithm (data));
	return self.now();
}