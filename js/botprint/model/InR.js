/**
 * InR algorithm, which recursively inscribe an scaled down version of an
 * outer rectangle.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function InR(data){
	var self = {
		now: function(rectangle, k){
			k			= k || 1;
			var center  = rectangle.center();
			var payload = {rect: rectangle, center: center};
			if(k == 1) 	{ return InnerRectangle(payload); 				}
			else		{ return self.now(InnerRectangle(payload), k - 1);}
		},

		run: function(){
			var data		= this.data();
			var rectangle 	= data.rect;
			return self.now(rectangle);
		}
	};

	Mixable(self).mix(Algorithm (data));
	return self.run();
}