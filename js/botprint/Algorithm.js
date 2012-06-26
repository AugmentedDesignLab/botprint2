/**
 * Algorithm strategy.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Algorithm (D) {
	var data = D || {};
	return {
		data: function(){
			return data;
		}
	};
}
