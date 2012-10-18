describe('The layout algorithm', function() {
	var paperElem = document.createElement('div');
	var paper = Raphael(paperElem, 10000, 10000); // a really huge paper
	var path1 = 'M424,145C410.8333333333333,144.66666666666666,433.8333333333333,248.83333333333334,405,270C376.1666666666667,291.1666666666667,258.1666666666667,257.5,251,272C243.83333333333334,286.5,346.6666666666667,328.6666666666667,362,357C377.3333333333333,385.3333333333333,330.8333333333333,431.5,343,442C355.1666666666667,452.5,401.8333333333333,410,435,420C468.1666666666667,430,528.5,513.5,542,502C555.5,490.5,506.5,389.1666666666667,516,351C525.5,312.8333333333333,604.3333333333334,286.1666666666667,599,273C593.6666666666666,259.8333333333333,513.1666666666666,293.3333333333333,484,272C454.8333333333333,250.66666666666666,437.1666666666667,145.33333333333334,424,145Z';
	
	it('should find the optimal rotation of the chassis', function() {
		var path = 'm 614.52875,415.1083 c 1.11253,1.66879 2.78132,3.33757 6.1189,3.89384 5.00637,0 10.01274,0.55626 15.01912,0.55626 2.22505,0 2.78131,-4.4501 3.33757,-7.78769 42.27601,-7.23142 71.20171,-18.91295 75.09557,-36.15711 -11.68154,-53.40129 -256.43743,-53.40129 -408.8536,-30.59449 l 0,0 c -2.22505,-3.89385 -7.78769,-13.90659 -36.71339,-14.46285 -12.23779,0 -24.47559,-0.55626 -36.15712,-0.55626 -2.22505,0 -2.78131,1.66879 -3.33758,3.89384 -1.11252,10.01275 -2.22505,19.46922 -3.89384,28.9257 l 0.55626,0 C 214.57537,366.71337 205.1189,371.16349 199,375.6136 c 6.1189,3.89384 15.57537,8.34395 26.70064,12.23779 -0.55626,0 2.22506,22.8068 2.78132,24.47558 0,2.78133 1.11253,3.89386 2.78132,3.89386 9.45647,1.66878 21.69427,3.33757 37.26964,3.89383 14.46285,0.55626 29.48196,-0.55626 36.71339,-14.46285 93.45224,13.90659 221.39283,19.46923 309.28244,9.45649 z';
		var fakeChassis = {path: path};
		var optimal = FindTightGridArea(paper, fakeChassis, 1);
		expect(optimal.angle).toBe(90);
	});
	
	it('should have all parts inside the chassis', function() {
		var N           = 10;
		var fakeChassis = {path: path1};
		var optimal = FindTightGridArea(paper, fakeChassis);
		optimal.area = InR({rect: optimal.area});
		var grid 	 = Grid.of(2, optimal.area, path1, N, optimal.angle);
		var wheels 	 = TestUtil.wheels();
		var sensors  = TestUtil.sensors();
		var cpu 	 = TestUtil.cpu();
		var battery  = TestUtil.battery();
		var servos   = TestUtil.servos();
		var space    = Math.floor(optimal.area.topLeft().distanceTo(optimal.area.topRight())/N);
		var radio    = Bindable();
		// initialize other parts

		var payload = {
			max: N,
			angle: optimal.angle,
			area:  optimal.area,
			path:  optimal.path,
			wheels: wheels,
			sensors:sensors,
			servos: servos,
			cpu:    cpu,
			battery:battery,
			space: space,
			app:radio
		};
		
		// call layout algorithm to decide the coordinates for all parts

		var solution = HillClimbing(payload).solve();
		solution.findBy().forEach(function(each){
			var i = each.i;
			var j = each.j;
			expect(grid[i][j].valid == each.valid).toBe(true);
			expect(Cell.isValid(path1, each, N)).toBe(true);
		});

		// expect each part is at least partially inside the chassis
	});
});