/**
 * @author hsanchez@cs.ucsc.edu (Huascar A. Sanchez)
 */
describe("Robot", function(){
    var bus;
    var robot;
    var part;
	var parts;
	var dataMaker;

    beforeEach(function(){
		dataMaker = new DataMaker();
        bus 	= dataMaker.bus;
        robot   = dataMaker.robot;
		parts	= dataMaker.parts;
		part  = new Sensor({name:"LightSensor", bus: bus});
    });

    afterEach(function(){
        robot = null;
        bus   = null;
        part  = null;
    });

	describe("Once having ALL parts installed", function(){
		it("should have a size > 0", function(){
			expect(robot.count()).toBeGreaterThan(0);
		});

		it("should find ANY installed part on Bottom Deck", function(){
			var chassis    = parts[0];

			var bdeck 	   = chassis.select(DataMaker.BOTTOM_DECK_FILTER)[0];
			var found 	   = bdeck.select(DataMaker.LIGHT_SENSOR_FILTER)[0];

			expect(found != null).toBeTruthy();
			expect(found.name).toEqual("LightSensor");
		});

		it("should be persisted once assembled", function(){
			spyOn(robot, 'persist');
			robot.assemble();
			expect(robot.persist).toHaveBeenCalledWith(jasmine.any(Array));
		});
		
		it('should serialize parts', function() {
			var json = JSON.stringify(robot);
			expect(json.indexOf('super')).toBeLessThan(0);
			expect(json.indexOf('"path":[["M"')).toBeGreaterThan(0);
		});
		
		it('should deserialize chassis', function() {
			var json = JSON.stringify(robot);
			var attrs = JSON.parse(json);
			var dRobot = Robot();
			$.extend(dRobot, attrs);
			expect(dRobot.chassis.path.length).toBeGreaterThan(0);
		});
	});

});