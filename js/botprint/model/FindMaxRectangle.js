/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function FindMaxRectangle(data){
	var normalize = 800;

	// calculates the distance btw two points
	var distance = function(a, b){
		return Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2);
	};

	// helper class
	var Rectangle = function(triple){
		triple = triple || []; // this will avoid weird runtime errors in the Browser.
		// guard clause that will prevent triples < 3 elements from being used (this can ocurr
		// since triples may have multiple instances of the empty point---represented by
		// the absent of a point in a triple; e.g., Triple(point,,).
		if(triple.length < 3) return {};

		var mid 	= triple[Math.floor(triple.length/2)];
		var head	= triple[0];
		var tail    = triple[triple.length - 1];

		var dst		= distance(mid, head);
		var dst2	= distance(mid, tail);

		// assumption: since what we are looking is a rect, we assume that the
		// min distance is the height and the max distance is the width
		return {
			area: 	dst * dst2,
			height: (Math.min(dst, dst2))/normalize,
			width:  (Math.max(dst, dst2))/normalize,
			x: 		mid.x,
			y: 		mid.y
		};
	};

	// brute force (Note: we only need three corners to draw rectangle.
	var Triples = function(array) {
		if(array.length < 3) return [];

		var points = []; // make a copy
		for(var n = 0 ; n < array.length ; n++) {
			var p = array[n];
			points.push(/*a Point*/ {x: p.x, y: p.y});
		}

		var triples = [];
		var len = points.length; //cache the length value.
		for( var i = 0; i < len; i++ ){
			for( var j = i + 1; j < len; j++ ) {
				for( var k = j + 1; k < len; k++ ){
					triples.push( [ points[ i ], points[ j ], points[ k ] ] );
				}
			}
		}

		return triples;
	};

	var self = {
		gimmeMax : function() {
			var points 	= this.data().corners || [];
			if(points.length == 0) {
				throw "Error: This algorithm needs an array of points in order to work."
			}

			var triples	= Triples(points); // get combinations of 3 points. i.e., 3 corner points.

			// max area rectangle
			var max = Rectangle(triples[0]);

			for(var n = 0 ; n < triples.length ; n++) {
				var triple = triples[n];
				// only use the triples with actually 3 elements in it.
				if(triple.length == 3) {
					// find the max area rectangle of the triple values.
					var rect = Rectangle(triple);
					if(rect.area > max.area) {
						max = rect;
					}

				}
			}

			return max;
		}
	};

	Mixable(self).mix(Algorithm (data));
	return self.gimmeMax();
}