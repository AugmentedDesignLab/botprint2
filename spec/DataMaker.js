// todo(Huascar) delete it once PartsMaker is ready for primetime.
function DataMaker(){
	var bus			= EventBus();
	var radio		= Bindable(bus);
	var options = {
		name: "Wall-E",
		app: radio,
		algs: {
			wheel:   function() {console.log("Snapped!");  return []; },
			chassis: function() {console.log("Sketched!"); return []; }
		}

	};

	var robot	= new Robot(options);
	var chassis = new Chassis({name:"Chassis", app: radio,
							  path: [
								['M',236,311],
								['C', 220,339,312,459,347,454],
								['C', 381,449,459,304,441,281],
								['C',422,257,251,282,236,311],
								['Z']
							 ]});
	var top  	= new Deck({name:"Top", app: radio, dimensions: { w:500, h:500, d:0 }});
	var bottom  = new Deck({name:"Bottom", app: radio, dimensions: { w:500, h:500, d:0 }});

	top.add(PowerAmplifier({name:"PowerAmplifier", app: radio, dimensions: { w:200, h:200, d:0 }}));
	top.add(Microcontroller({name:"Arduino", app: radio, dimensions: { w:200, h:200, d:0 }}));

	bottom.add(new Sensor({name:"LightSensor", app: radio, dimensions: { w:25, h:25, d:0 }}));
	bottom.add(new Sensor({name:"MotionSensor", app: radio, dimensions: { w:25, h:25, d:0 }}));
	bottom.add(new BatteryPack({name:"AA-BatteryPack", app: radio, dimensions: { w:100, h:100, d:0 }}));
	bottom.add(new BatteryPack({name:"9Volt-BatteryPack", app: radio, dimensions: { w:100, h:100, d:0 }}));
	bottom.add(new Motor({name:"Motor", app: radio, dimensions: { w:80, h:80, d:0 }}));
	bottom.add(new Motor({name:"PowerSwitch", app: radio, dimensions: { w:80, h:80, d:0 }}));

	chassis.add(top);
	chassis.add(bottom);

	var parts	= [
		chassis,
		new Wheel({name:"Wheel", app: radio, dimensions: { w:50, h:70, d:0 }}),
		new Wheel({name:"Wheel", app: radio, dimensions: { w:50, h:70, d:0 }}),
		new Wheel({name:"Wheel", app: radio, dimensions: { w:50, h:70, d:0 }}),
		new Wheel({name:"Wheel", app: radio, dimensions: { w:50, h:70, d:0 }})
	];

	parts.forEach(function(elem){
		robot.install(elem);
	});

	return {
		bus: 	bus,
		robot: 	robot,
		parts: 	parts,
		blocks: function(){
			var blocks = [];
			bottom.select().forEach(function(elem){
				blocks.push(elem);
			});

			return blocks;
		}
	};
}

DataMaker.BOTTOM_DECK_FILTER  = function(element){ return element.name == "Bottom"; };
DataMaker.LIGHT_SENSOR_FILTER = function(element){ return element.name == "LightSensor"; };