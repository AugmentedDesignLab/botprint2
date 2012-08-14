/**
 * Wheel domain object.
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
function Wheel (opts){
	var options = {isLeaf: true, name: 'Wheel'};
	$.extend(options, opts || {});

	var snappedAt = { x:0, y:0, z:0};

	var self = {
		serializable: ['id', 'name', 'x','y'],
		
		snap: function(position){
			snappedAt = position;
		},

		getSnappingLocation: function(){
			return snappedAt;
		},

		delete: function() {
			self.radio.trigger(ApplicationEvents.wheelDeleted, {id: self.id});
		},
		
		isOverlappingWith: function(other) {
			var size =  new Vector2D(PartsFolio.wheel.width, PartsFolio.wheel.radius*2);
			var topLeft1 = new Point2D(self.x-size.x/2, self.y-size.y/2);
			var bottomRight1 = new Point2D(self.x+size.x/2, self.y+size.y/2);
			var topLeft2 = new Point2D(other.x-size.x/2,  other.y-size.y/2);
			var bottomRight2 = new Point2D(other.x+size.x/2,  other.y+size.y/2);
			var result = Intersection.intersectRectangleRectangle(topLeft1, bottomRight1, topLeft2, bottomRight2);
			return result.status == 'Intersection';
		},
		
		accept: function(visitor) {
			return visitor.visitWheel(this);
		}
	};
	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	Mixable(self).mix(Part (options));
	return self;
}