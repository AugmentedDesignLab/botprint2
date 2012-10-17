/**
 * Generates a permutation of the elements in an array.
 *
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Shuffler(){
	return {
		uniform: function(N){
			return Math.floor(Math.random() * N);
		},

		shuffle: function(a/*array*/){
			var N = a.length;
			for(var i = 0; i < N; i++){
				var r = i + this.uniform(N - i); // btw i and N - 1
				var temp = a[i];
				a[i]     = a[r];
				a[r]     = temp;
			}
		}
	};
}