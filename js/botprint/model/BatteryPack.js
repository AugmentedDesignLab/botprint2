/**
 * BatteryPack domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function BatteryPack (opts){
	var options = {isLeaf: true};
	$.extend(options, opts || {});

	var self = {
		/**
		 * @return {Function} either a nine volt battery holder or
		 * 		AA || AAA battery holder
		 */
		holder: function(){
			return opts.holder;
		},

		/**
		 *
		 * @return {Function} either female or male connector
		 */
		connector: function(){
			return opts.connector;
		},

		/**
		 * @return {*} e.g., AA to power servos and Nine volt to power the Arduino
		 */
		target: function(){
			return opts.target;
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}