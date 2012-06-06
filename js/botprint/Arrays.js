var Arrays = Base.extend({
	constructor: null,
	// Array Remove - By John Resig (MIT Licensed)
	remove: function(array, from, to) {
		var rest = array.slice((to || from) + 1 || array.length);
		array.length = from < 0 ? array.length + from : from;
		return array.push.apply(array, rest);
	}
});