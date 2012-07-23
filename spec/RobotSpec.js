describe("Robot", function(){
    var bus;
    var robot;
    var part;

    beforeEach(function(){
        bus = EventBus();
        var options = {
            name: "Wall-E",
            bus:  bus,
            algs: {
                wheel: function() {console.log("Snapped!");},
                chassis: function() {console.log("Sketched!");}
            }

        };

        robot = new Robot(options);
        part  = new Sensor({name:"LeftSensor", bus: bus});

    });

    afterEach(function(){
        robot = null;
        bus   = null;
        part  = null;
    });

    it("should install a Part", function(){
        robot.install(part);
        expect(robot.count()).toEqual(1);

    });

    it("should find the installed Part", function(){
        robot.install(part);
        var found = robot.contains(part);
        expect(found).toBeTruthy();
    });

    it("should uninstall Part", function(){
        robot.install(part);
        expect(robot.contains(part)).toBeTruthy();
        robot.uninstall(part);
        expect(robot.contains(part)).toBeFalsy();
    });

});