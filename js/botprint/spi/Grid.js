/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Grid(dimension, area, path, max, angle){

	var mdim = function(d, max){
		var array = new Array(max);
		for(var i = 0; i < max; i++){
			array[i] = new Array(max);
		} return array;
	};

	var space	= Math.floor(area.topLeft().distanceTo(area.topRight())/max);
	var grid	= mdim(dimension, max);
	var x		= area.topLeft().x;
	var y		= area.topLeft().y;

	for(var i = 0; i < max; i++){
		for(var j = 0; j < max; j++){
			var cell = new Cell(x, y, i, j, angle, space);
			// TODO(Zhongpeng) another possible place related to cells being marked
			// as valid and they should be invalid.
			if(!Cell.isValid(path, cell, max)){
				cell.valid   = false;
				grid[i][j]   = cell;
			} else {
				cell.valid   = true;
				grid[i][j]   = cell;
			}

			x += space;
			if(j + 1 == max){
				x  = area.topLeft().x;
				y += space;
			}
		}
	}

	return grid;
} Grid.of = function(dimension, area, path, max, angle){
	return Grid(dimension, area, path, max, angle);
};