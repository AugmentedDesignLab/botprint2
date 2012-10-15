/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Grid(dimension, area, path, max, angle){
	var space	= Math.floor(area.topLeft().distanceTo(area.topRight())/max);
	var grid	= mdim(dimension, max);
	var x		= area.topLeft().x;
	var y		= area.topLeft().y;

	for(var i = 0; i < max; i++){
		for(var j = 0; j < max; j++){
			var cell = new Cell(x, y, i, j, angle, space);
			if(!Cell.isValid(path, cell)){
				cell.valid   = false;
				grid[i][j]   = cell;
			} else {
				grid[i][j]   = cell;
			}

			y += space;
		}

		x += space;
	}

	return grid;
} Grid.of = function(dimension, area, path, max, angle){
	return Grid(dimension, area, path, max, angle);
};