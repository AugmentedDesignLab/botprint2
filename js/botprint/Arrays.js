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


//Mixing enumerable into Array.prototype
$.extend(Array.prototype, Enumerable());