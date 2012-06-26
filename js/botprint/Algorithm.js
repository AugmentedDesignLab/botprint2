/**
 * Algorithm strategy.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Algorithm (data) {
	data = data || {};
	return {
		data: function(){
			return data;
		}
	};
}
