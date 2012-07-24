function DataMaker(){
	var bus		= new EventBus();
	var options = {
		name: "Wall-E",
		bus:  bus,
		algs: {
			wheel:   function() {console.log("Snapped!");  return []; },
			chassis: function() {console.log("Sketched!"); return []; }
		}

	};

	var robot	= new Robot(options);
	var chassis = new Chassis({name:"Chassis", bus: bus});
	var top  	= new Deck({name:"Top", bus: bus, dimensions: { w:500, h:500, d:0 }});
	var bottom  = new Deck({name:"Bottom", bus: bus, dimensions: { w:500, h:500, d:0 }});

	top.add(new Breadboard({name:"Breadboard", bus: bus, dimensions: { w:200, h:200, d:0 }}));
	top.add(new Microcontroller({name:"Arduino", bus: bus, dimensions: { w:200, h:200, d:0 }}));

	bottom.add(new Sensor({name:"LightSensor", bus: bus, dimensions: { w:25, h:25, d:0 }}));
	bottom.add(new Sensor({name:"MotionSensor", bus: bus, dimensions: { w:25, h:25, d:0 }}));
	bottom.add(new BatteryPack({name:"AA-BatteryPack", bus: bus, dimensions: { w:100, h:100, d:0 }}));
	bottom.add(new BatteryPack({name:"9Volt-BatteryPack", bus: bus, dimensions: { w:100, h:100, d:0 }}));
	bottom.add(new Motor({name:"Motor", bus: bus, dimensions: { w:80, h:80, d:0 }}));
	bottom.add(new Motor({name:"PowerSwitch", bus: bus, dimensions: { w:80, h:80, d:0 }}));

	chassis.add(top);
	chassis.add(bottom);

	var parts	= [
		chassis,
		new Wheel({name:"W1", bus: bus, dimensions: { w:50, h:70, d:0 }}),
		new Wheel({name:"W2", bus: bus, dimensions: { w:50, h:70, d:0 }}),
		new Wheel({name:"W3", bus: bus, dimensions: { w:50, h:70, d:0 }}),
		new Wheel({name:"W4", bus: bus, dimensions: { w:50, h:70, d:0 }})
	];

	parts.forEach(function(elem){
		robot.install(elem);
	});

	return {
		bus: 	bus,
		robot: 	robot,
		parts: 	parts
	};
}

DataMaker.BOTTOM_DECK_FILTER  = function(element){ return element.name() == "Bottom"; };
DataMaker.LIGHT_SENSOR_FILTER = function(element){ return element.name() == "LightSensor"; };