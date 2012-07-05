/**
 * Algorithm strategy.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Algorithm (data) {
	data = data || {};
	return {
		/**
		 * @return {*} the input of the algorithm.
		 */
		data: function(){
			return data;
		}
	};
}
