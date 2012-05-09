/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 * todo(Huascar) this is incomplete....
 */
(function(){
	/**
	 * Function that creates a LayoutBalance instance.
	 */
	layoutbalance = function(options) {
		return new LayoutBalance(options);
	};

	// Current version.
	layoutbalance.VERSION = '0.0.1';

	/**
	 * The LayoutBalance object.
	 */
	var LayoutBalance = function(options){
		// Use self to reduce confusion about 'this'
		var self 	 = this;
		var _options = {
			width: 	100,
			height: 100,
			n: 		100,
			types:  { 1: "M"  /*Motor*/, 2: "LS" /*Light Sensor*/, 3: "MS" /*Motion Sensor*/,
					  4: "PS" /*Power Switch*/, 5: "BP" /*Battery Pack*/
			}
		};

		// Adding Any Additional options to the default options
		jQuery.extend(_options, options);

		/**
		 * todo(Huascar) to implement
		 * @param size
		 */
		self.solve = function(size) {

		};

		self.fit   = function(blocks) {

		};
	};

	LayoutBalance.MAX_WIDTH 	= 1000;
	LayoutBalance.MIN_WIDTH 	= 1;
})();