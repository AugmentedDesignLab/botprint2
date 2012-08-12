describe('A wheel', function() {
	it('should detect overlap with another wheel', function() {
		var w1 = Wheel({coordinates: {x: 100, y: 100}});
		var w2 = Wheel({coordinates: {x: 101, y: 100}});
		expect(w1.isOverlappingWith(w2)).toBe(true);
		w2.x = 300;
		expect(w1.isOverlappingWith(w2)).toBe(false);
	});
});