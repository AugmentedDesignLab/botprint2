describe("Robot", function(){
    var bus;
    var robot;
    var part;
	var parts;

    beforeEach(function(){
        bus 	= EventBus();
        var options = {
            name: "Wall-E",
            bus:  bus,
            algs: {
                wheel:   function() {console.log("Snapped!");  return []; },
                chassis: function() {console.log("Sketched!"); return []; }
            }

        };

        robot = new Robot(options);

		var chassis = new Chassis({name:"Chassis", bus: bus});
		var top  	= new Deck({name:"Top", bus: bus});
		var bottom  = new Deck({name:"Bottom", bus: bus});

		top.add(new Breadboard({name:"Breadboard", bus: bus}));
		top.add(new Microcontroller({name:"Arduino", bus: bus}));

		bottom.add(new Sensor({name:"LightSensor", bus: bus}));
		bottom.add(new Sensor({name:"MotionSensor", bus: bus}));
		bottom.add(new BatteryPack({name:"AA-BatteryPack", bus: bus}));
		bottom.add(new BatteryPack({name:"9Volt-BatteryPack", bus: bus}));
		bottom.add(new Motor({name:"Motor", bus: bus}));
		bottom.add(new Motor({name:"PowerSwitch", bus: bus}));

		chassis.add(top);
		chassis.add(bottom);

		parts	= [
			chassis,
			new Wheel({name:"W1", bus: bus}),
			new Wheel({name:"W2", bus: bus}),
			new Wheel({name:"W3", bus: bus}),
			new Wheel({name:"W4", bus: bus})
		];

		parts.forEach(function(elem){
			robot.install(elem);
		});

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

			var bfilter    = function(element){ return element.name() == "Bottom"; };
			var sfilter    = function(element){ return element.name() == "LightSensor"; };

			var bdeck 	   = chassis.select(bfilter)[0];
			var found 	   = bdeck.select(sfilter)[0];

			expect(found != null).toBeTruthy();
			expect(found.name()).toEqual("LightSensor");
		});

		it("should be persisted once assembled", function(){
			spyOn(robot, 'persist');
			robot.assemble();
			expect(robot.persist).toHaveBeenCalledWith(jasmine.any(Array));
		});
	});

	describe("Once having ALL parts uninstalled", function(){
		it("should have zero parts installed", function(){
			expect(robot).toBeNaked(parts);
		});
	});

});