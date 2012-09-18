/**
 * .
 *  @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};

Array.prototype.select = Array.prototype.filter;

Array.prototype.chunkIt = function(array, num){
	var len = array.length, out = [], i = 0;
	while (i < len) {
		var size = Math.ceil((len - i) / num--);
		out.push(array.slice(i, i += size));
	}
	return out;
};

//Mixing enumerable into Array.prototype
$.extend(Array.prototype, Enumerable());