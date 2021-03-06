describe('A chassis', function() {
	var path1 = [
				 ['M',236,311],
				 ['C', 220,339,312,459,347,454],
				 ['C', 381,449,459,304,441,281],
				 ['C',422,257,251,282,236,311],
				 ['Z']
		];
	// self-intersecting path
	var path2 = [
			['M', 286, 220],
			['C', 289, 189, 517, 195, 515, 227],
			['C', 512, 258, 275, 377, 272, 408],
			['C', 268, 438, 490, 439, 493, 408],
			['C', 495, 376, 282, 250, 286, 220],
			['Z']
		];
	
	var chassis1;
	beforeEach(function(){
		chassis1 = Chassis({path: path1});
	});
	
	it('should detect self intersecting', function() {
		expect(chassis1.isSelfIntersecting()).toBe(false);
		chassis1.path = path2;
		expect(chassis1.isSelfIntersecting()).toBe(true);
	});
	
	it('should serialize path and name', function() {
		var cJSON = JSON.stringify(chassis1);
		var pJSON = JSON.stringify(path1);
		expect(cJSON.indexOf(pJSON)).not.toBeLessThan(0);
		expect(cJSON.indexOf('"name":"Chassis"')).not.toBeLessThan(0);
	});
	
	it('should not serialize super', function() {
		var cJSON = JSON.stringify(chassis1);
		expect(cJSON.indexOf('super')).toBeLessThan(0);
	});
	
	//it('should generate punch holes perpendicular to tangent lines', function() {
	//	var holes = chassis1.punchHoles;
	//	var i = 0;
	//	chassis1.path.forEach(function(action) {
	//		if(action[0]=='C'){
	//			var h = holes[i];
	//			var dotProduct = (action[5]-h.x)*(action[5]-action[3])+(action[6]-h.y)*(action[6]-action[4]);
	//			expect(dotProduct).toBeCloseTo(0);
	//			i++;
	//		}
	//	});
	//});
	
	it('should detect if a point is inside the chassis shape', function() {
        var point = Point.make(337, 356);
		expect(point.isInside(chassis1.path)).toBeTruthy();
	});
});