/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function CalculateCenter(tl, br, gap){
	gap = gap || 0;
	var x = (tl.x + (br.x - tl.x)/2) + gap;
	var y = (tl.y - (tl.y  - br.y)/2) + gap;
	return Point.make(x, y);
}