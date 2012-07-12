/**
 * automatically binding of path/to strings...
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
(function () {
	yepnope.paths = {
		'vendor': 		'js/vendor',
		'spi': 			'js/botprint/spi',
		'controller': 	'js/botprint/controller',
		'views': 		'js/botprint/view'
	};

	var replace = function(text, target, replacement){
		return text.split(target).join(replacement);
	};

	var addPathFilter = function (yn) {
		// add each prefix
		yn.addFilter(function (resource) {
			// check each url for path
			for (path in yn.paths) {
				var old = resource.url;
				resource.url = replace(old, path, yn.paths[path]);
				if(old != resource.url) return resource;
			}

			return resource;
		});
	};
	if (yepnope) addPathFilter(yepnope);
})();
