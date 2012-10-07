describe('KevLinDev', function() {
	it('should detect intersections of hand crafted shapes without rendering them', function() {
		// Creating a path
		var pathElem = document.createElement('path');
		pathElem.setAttribute('d', 'M40,70 Q50,150 90,90 T135,130 L160,70 C180,180 280,55 280,140 S400,110 290,100');
		var aPath = new Path(pathElem);
		// Creating a polygon
		var polygonElem = document.createElement('polygon');
		polygonElem.setAttribute('points', '100,50 160,40 185,120 120,165 70,120 80,70');
		var aPolygon = new Polygon(polygonElem);
		// Detecting intersections using Intersection.intersectShapes
		var inter = Intersection.intersectShapes(aPath, aPolygon);
		expect(inter.points.length).toBe(2);
		// Detecting intersections using Intersection.intersectPathShape
		inter = Intersection.intersectPathShape(aPath, aPolygon);
		expect(inter.points.length).toBe(2);
		// Detecting intersections using Path.intersectShape
		inter = aPath.intersectShape(aPolygon);
		expect(inter.points.length).toBe(2);
	});
});