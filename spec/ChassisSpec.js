describe('A chassis', function() {
	it('should detect self intersecting', function() {
		var path = [['M',236,311],['C', 220,339,312,459,347,454],['C', 381,449,459,304,441,281],['C',422,257,251,282,236,311], ['Z']];
		var chassis = Chassis({path: path});
		expect(chassis.selfIntersecting()).toBe(false);
		path = [
			['M', 286, 220],
			['C', 289, 189, 517, 195, 515, 227],
			['C', 512, 258, 275, 377, 272, 408],
			['C', 268, 438, 490, 439, 493, 408],
			['C', 495, 376, 282, 250, 286, 220],
			['Z']
		];
		chassis.path = path;
		expect(chassis.selfIntersecting()).toBe(true);
	});
});