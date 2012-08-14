describe('A wheel', function() {
	var w1, w2, c1;
	
	beforeEach(function() {
		w1 = Wheel({coordinates: {x: 100, y: 100}});
		w2 = Wheel({coordinates: {x: 101, y: 100}});
	});
	
	it('should detect overlap with another wheel', function() {
		expect(w1.isOverlappingWith(w2)).toBe(true);
		w2.x = 300;
		expect(w1.isOverlappingWith(w2)).toBe(false);
	});
	
	it('should serialize the coordinates and name', function() {
		var wJSON = JSON.stringify(w1);
		expect(wJSON.indexOf('"name":"Wheel","x":100,"y":100')).not.toBeLessThan(0);
	});
	
	it('should not serialize super', function() {
		var wJSON = JSON.stringify(w1);
		expect(wJSON.indexOf('super')).toBeLessThan(0);
	});
});